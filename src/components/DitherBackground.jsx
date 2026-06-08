import { useEffect, useRef, useCallback } from "react";

// ============================================================
// Vertex Shader — Full-screen quad
// ============================================================
const VERT_SRC = `
precision highp float;
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

// ============================================================
// Fragment Shader — Dither wave with mouse interaction
// Uses WebGL1-compatible GLSL (maximum driver compatibility)
// ============================================================
const FRAG_SRC = `
precision highp float;

varying vec2 v_uv;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_pixelSize;
uniform vec3 u_waveColor;
uniform float u_waveAmplitude;
uniform float u_waveFrequency;
uniform float u_waveSpeed;
uniform float u_colorNum;
uniform float u_mouseRadius;

// 4x4 Bayer dithering — computed without arrays for max compatibility
float bayer4x4(vec2 pos) {
  vec2 p = mod(floor(pos), 4.0);
  float x = p.x;
  float y = p.y;

  // Row 0: 0, 8, 2, 10
  // Row 1: 12, 4, 14, 6
  // Row 2: 3, 11, 1, 9
  // Row 3: 15, 7, 13, 5
  float val = 0.0;

  if (y < 1.0) {
    if (x < 1.0) val = 0.0;
    else if (x < 2.0) val = 8.0;
    else if (x < 3.0) val = 2.0;
    else val = 10.0;
  } else if (y < 2.0) {
    if (x < 1.0) val = 12.0;
    else if (x < 2.0) val = 4.0;
    else if (x < 3.0) val = 14.0;
    else val = 6.0;
  } else if (y < 3.0) {
    if (x < 1.0) val = 3.0;
    else if (x < 2.0) val = 11.0;
    else if (x < 3.0) val = 1.0;
    else val = 9.0;
  } else {
    if (x < 1.0) val = 15.0;
    else if (x < 2.0) val = 7.0;
    else if (x < 3.0) val = 13.0;
    else val = 5.0;
  }

  return val / 16.0;
}

// Hash-based noise
float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float val = 0.0;
  float amp = 0.5;
  float freq = 1.0;
  for (int i = 0; i < 4; i++) {
    val += amp * noise(p * freq);
    freq *= 2.0;
    amp *= 0.5;
  }
  return val;
}

void main() {
  // Pixelate UV coordinates
  vec2 pixelUv = floor(gl_FragCoord.xy / u_pixelSize) * u_pixelSize / u_resolution;

  // Mouse influence
  vec2 mouseNorm = u_mouse / u_resolution;
  float mouseDist = length(pixelUv - mouseNorm);
  float mouseInfluence = smoothstep(u_mouseRadius, 0.0, mouseDist) * 0.3;

  // Wave distortion
  float t = u_time * u_waveSpeed;
  float wave1 = sin(pixelUv.x * u_waveFrequency * 6.2831 + t * 2.0) * u_waveAmplitude;
  float wave2 = sin(pixelUv.y * u_waveFrequency * 4.0 + t * 1.5 + 1.0) * u_waveAmplitude * 0.7;
  float wave3 = cos((pixelUv.x + pixelUv.y) * u_waveFrequency * 3.0 + t * 3.0) * u_waveAmplitude * 0.4;

  // FBM noise layer
  float n = fbm(pixelUv * 4.0 + vec2(t * 0.3, t * 0.2));

  // Combine all layers
  float value = n * 0.5 + wave1 + wave2 + wave3 + mouseInfluence;

  // Normalize to 0-1
  value = clamp(value * 0.5 + 0.5, 0.0, 1.0);

  // 4-color palette: dark base -> mid tones -> purple accent
  vec3 c0 = vec3(0.02, 0.02, 0.04);
  vec3 c1 = vec3(0.06, 0.04, 0.12);
  vec3 c2 = u_waveColor * 0.4;
  vec3 c3 = u_waveColor * 0.7;

  float colorStep = 1.0 / u_colorNum;

  // Apply Bayer dithering
  float bayerVal = bayer4x4(gl_FragCoord.xy / u_pixelSize);
  float dithered = value + (bayerVal - 0.5) * (1.0 / u_colorNum);

  // Quantize to palette
  vec3 color;
  if (dithered < colorStep) {
    color = c0;
  } else if (dithered < colorStep * 2.0) {
    color = c1;
  } else if (dithered < colorStep * 3.0) {
    color = c2;
  } else {
    color = c3;
  }

  // Subtle vignette
  float vignette = 1.0 - smoothstep(0.3, 1.2, length(pixelUv - 0.5) * 1.4);
  color *= mix(0.6, 1.0, vignette);

  gl_FragColor = vec4(color, 1.0);
}`;

// ============================================================
// React Component
// ============================================================
export default function DitherBackground() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const reducedMotion = useRef(false);

  const initGL = useCallback((canvas) => {
    // Try WebGL2 first, fall back to WebGL1
    let gl = canvas.getContext("webgl2", {
      antialias: false,
      alpha: false,
      powerPreference: "high-performance",
    });

    let isWebGL2 = !!gl;

    if (!gl) {
      gl = canvas.getContext("webgl", {
        antialias: false,
        alpha: false,
        powerPreference: "high-performance",
      });
    }

    if (!gl) {
      gl = canvas.getContext("experimental-webgl", {
        antialias: false,
        alpha: false,
      });
    }

    if (!gl) {
      console.error("[DitherBackground] No WebGL support found.");
      return null;
    }

    console.log("[DitherBackground] Using", isWebGL2 ? "WebGL2" : "WebGL1");

    // Compile shader
    function compileShader(type, src) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error(
          "[DitherBackground] Shader compile error:",
          gl.getShaderInfoLog(s)
        );
        gl.deleteShader(s);
        return null;
      }
      return s;
    }

    const vs = compileShader(gl.VERTEX_SHADER, VERT_SRC);
    const fs = compileShader(gl.FRAGMENT_SHADER, FRAG_SRC);
    if (!vs || !fs) {
      console.error("[DitherBackground] Shader compilation failed.");
      return null;
    }

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(
        "[DitherBackground] Program link error:",
        gl.getProgramInfoLog(program)
      );
      return null;
    }

    // Full-screen quad
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    // prettier-ignore
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,  1, -1,  -1, 1,
      -1,  1,  1, -1,   1, 1,
    ]), gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    gl.useProgram(program);

    // Cache uniform locations
    const uniforms = {
      u_time: gl.getUniformLocation(program, "u_time"),
      u_resolution: gl.getUniformLocation(program, "u_resolution"),
      u_mouse: gl.getUniformLocation(program, "u_mouse"),
      u_pixelSize: gl.getUniformLocation(program, "u_pixelSize"),
      u_waveColor: gl.getUniformLocation(program, "u_waveColor"),
      u_waveAmplitude: gl.getUniformLocation(program, "u_waveAmplitude"),
      u_waveFrequency: gl.getUniformLocation(program, "u_waveFrequency"),
      u_waveSpeed: gl.getUniformLocation(program, "u_waveSpeed"),
      u_colorNum: gl.getUniformLocation(program, "u_colorNum"),
      u_mouseRadius: gl.getUniformLocation(program, "u_mouseRadius"),
    };

    // Set static uniforms
    gl.uniform1f(uniforms.u_pixelSize, 2.0);
    gl.uniform3f(uniforms.u_waveColor, 0.32, 0.15, 1.0);
    gl.uniform1f(uniforms.u_waveAmplitude, 0.3);
    gl.uniform1f(uniforms.u_waveFrequency, 3.0);
    gl.uniform1f(uniforms.u_waveSpeed, 0.05);
    gl.uniform1f(uniforms.u_colorNum, 4.0);
    gl.uniform1f(uniforms.u_mouseRadius, 1.0);

    console.log("[DitherBackground] WebGL initialized successfully.");
    return { gl, program, uniforms };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check reduced motion preference
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.current = mq.matches;
    const handleMotionChange = (e) => {
      reducedMotion.current = e.matches;
    };
    mq.addEventListener("change", handleMotionChange);

    // Init WebGL
    const ctx = initGL(canvas);
    if (!ctx) {
      // Fallback: paint the canvas dark so it's not white
      const ctx2d = canvas.getContext("2d");
      if (ctx2d) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        ctx2d.fillStyle = "#050508";
        ctx2d.fillRect(0, 0, canvas.width, canvas.height);
      }
      return;
    }

    const { gl, uniforms } = ctx;

    // Resize handler
    function resize() {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w === 0 || h === 0) return; // Guard against zero dimensions
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uniforms.u_resolution, canvas.width, canvas.height);
    }
    resize();

    // Retry resize after a short delay to handle layout shifts
    const resizeRetry = setTimeout(resize, 100);

    window.addEventListener("resize", resize);

    // Mouse handler — listen on window, not just canvas
    function handleMouse(e) {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio, 2);
      mouseRef.current.x = (e.clientX - rect.left) * dpr;
      mouseRef.current.y = (rect.height - (e.clientY - rect.top)) * dpr;
    }
    window.addEventListener("mousemove", handleMouse);

    // Touch handler
    function handleTouch(e) {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio, 2);
        mouseRef.current.x = (touch.clientX - rect.left) * dpr;
        mouseRef.current.y =
          (rect.height - (touch.clientY - rect.top)) * dpr;
      }
    }
    window.addEventListener("touchmove", handleTouch, { passive: true });

    // Render loop
    const startTime = performance.now();
    let frozenTime = 0;

    function render() {
      let elapsed;
      if (reducedMotion.current) {
        if (frozenTime === 0) frozenTime = 5.0;
        elapsed = frozenTime;
      } else {
        elapsed = (performance.now() - startTime) / 1000;
      }

      gl.uniform1f(uniforms.u_time, elapsed);
      gl.uniform2f(
        uniforms.u_mouse,
        mouseRef.current.x,
        mouseRef.current.y
      );

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animRef.current = requestAnimationFrame(render);
    }

    animRef.current = requestAnimationFrame(render);

    // Cleanup
    return () => {
      cancelAnimationFrame(animRef.current);
      clearTimeout(resizeRetry);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("touchmove", handleTouch);
      mq.removeEventListener("change", handleMotionChange);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [initGL]);

  return (
    <div className="hero-canvas-container" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
