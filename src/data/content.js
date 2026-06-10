// ============================================================
// PORTFOLIO CONTENT — Terminal System Data
// ============================================================

export const identity = {
  name: "Shaik Mohammad Ajhaj", // Inferred from path/username, but keeping it professional based on "18-year-old builder and student engineer based in Bengaluru"
  role: "Student Engineer / Builder / Community Operator",
  intro:
    "18-year-old builder and student engineer based in Bengaluru. I work across AI/ML, hardware prototyping, robotics, aerospace, automation, and full-stack web development. I like building things that combine software, systems thinking, and real-world usefulness.",
  terminalPrompt: "visitor@portfolio:~$",
};

export const about = {
  paragraphs: [
    "I am an 18-year-old builder and student engineer based in Bengaluru. My work spans across AI/ML, hardware prototyping, robotics, aerospace, automation, and full-stack web development.",
    "I am deeply involved in hackathons, youth tech communities, and event operations. I like building things that combine software, systems thinking, and real-world usefulness.",
    "I am especially interested in mechatronics, aerospace, robotics, and intelligent systems. I organize and operate events, build technical projects, and continually explore startup ideas.",
  ],
};

export const projects = [
  {
    id: "PROJ-01",
    name: "UpvoteVC",
    stack: ["FastAPI", "Python", "Multi-Agent Systems", "Slack Integration"],
    description:
      "An AI-powered venture capital research platform that discovers startup ideas and market opportunities from Reddit discussions and other community signals. It uses multiple specialized AI agents to identify pain points, analyze markets, validate ideas, and automatically produce investment pitches, designed for founders, product teams, and investors.",
    github: "https://github.com/Ares006-007/Upvoteyc.git",
    live: null,
  },
  {
    id: "PROJ-02",
    name: "Neon Clock",
    stack: ["Vanilla JS", "HTML", "CSS 3D", "Canvas"],
    description:
      "A 3D neon digital clock built in vanilla JavaScript with a 7-segment display, real-time HH:MM:SS updates, cinematic dual shadows, 3D perspective transforms, and continuous immersive camera animation without external dependencies.",
    github: "https://github.com/Ares006-007/neon-clock.git",
    live: "https://ares006-007.github.io/neon-clock/",
  },
  {
    id: "PROJ-03",
    name: "AYU",
    stack: ["Healthcare Operations", "AI Triage", "WhatsApp Integration", "Systems Design"],
    description:
      "[WIP] A WhatsApp-first healthcare platform designed to help hospitals reduce OPD crowding and manage patient flow. Features include virtual queue alerts, lab report delivery, smart doctor/nurse assignment, and ABHA-linked medical history access.",
    github: "https://github.com/Ares006-007/AYU.git",
    live: null,
  },
  {
    id: "PROJ-04",
    name: "Solar System Explorer",
    stack: ["3D Visualization", "CSS Interactives", "Frontend"],
    description:
      "An interactive 3D Solar System experience that lets users glide between texture-mapped planets while exploring scientific facts, planetary data, and moon systems.",
    github: "https://github.com/Ares006-007/solar-explorer.git",
    live: "https://ares006-007.github.io/solar-explorer/",
  },
  {
    id: "PROJ-05",
    name: "Particle Text Animation",
    stack: ["Three.js", "GSAP", "Canvas API", "Creative Coding"],
    description:
      "An interactive 3D particle morphing experience where 12,000 particles dynamically form user-input text and smoothly transition back into a rotating sphere.",
    github: "https://github.com/Ares006-007/Particle-text-Animation",
    live: "https://particle-text-animation-plum.vercel.app",
  },
];

export const hackathons = [
  {
    id: "HACK-01",
    name: "Meta OpenEnv PyTorch x Hugging Face x Scaler School of Technology Hackathon",
    result: "Participated",
    date: "Recent", // Adjust if specific date needed
    location: "Bengaluru (In-person)",
    description:
      "Worked on AI and agent-oriented ideas in a highly competitive, strong technical environment.",
  },
  {
    id: "HACK-02",
    name: "The Anvil Hackathon",
    result: "Participated",
    date: "Recent", // Adjust if specific date needed
    location: "Scaler School of Technology",
    description:
      "Engaged in a competitive hackathon experience, building under pressure.",
  },
];

export const events = [
  {
    id: "EVT-01",
    name: "Daydream Bengaluru",
    role: "Co-Organizer (Hack Club)",
    attendees: "386 teens",
    date: "September 2025",
    description:
      "Organized a 12-hour game jam for teens from across India at Scaler School of Technology.",
  },
  {
    id: "EVT-02",
    name: "Code Day Bengaluru 2026 v1",
    role: "Organizer (CodeDay)",
    attendees: "50 teens",
    date: "February 2026",
    description:
      "Operated a 10-hour game jam for teenagers at Newton School of Technology.",
  },
  {
    id: "EVT-03",
    name: "Campfire Bengaluru",
    role: "POC / Event Lead (Hack Club)",
    attendees: "180 teens",
    date: "March 2026",
    description:
      "Led a 24-hour game jam operation at Newton School of Technology.",
  },
  {
    id: "EVT-04",
    name: "Code Day Bengaluru 2026 v2",
    role: "Organizer (CodeDay)",
    attendees: "TBD",
    date: "Planning Phase",
    description:
      "Currently in active operations and planning phase for the upcoming iteration.",
  },
];

export const volunteeredEvents = [
  {
    id: "VOL-01",
    name: "Formula Bharat",
    role: "Ground Logistics",
    date: "Past",
    description:
      "Gained hands-on, large-scale event operations and logistics experience on the ground.",
  },
  {
    id: "VOL-02",
    name: "Bengaluru Comic Con 2025",
    role: "Stage Team",
    date: "2025",
    description:
      "Assisted with stage management and coordination during the convention.",
  },
  {
    id: "VOL-03",
    name: "Def Leppard Concert 2026",
    role: "Box Office",
    date: "2026",
    description:
      "Managed ticketing operations and attendee flow at the box office.",
  },
];

export const activeProcesses = [
  {
    id: "ACT-01",
    title: "Director of Finance",
    organization: "Bridge of Culture Foundation (BOC)",
    date: "Jan 2026 - Present",
    description: "Finance leadership role in a nonprofit/cultural organization.",
  },
  {
    id: "ACT-02",
    title: "Campfire Organiser / Intern",
    organization: "Hack Club",
    date: "Dec 2025 - Present",
    description: "Organizing Campfire Bengaluru hackathon and events for teens.",
  },
  {
    id: "ACT-03",
    title: "IoT and Electrical Systems",
    organization: "TALISHA SPACE RESEARCH ORGANIZATION",
    date: "Nov 2025 - Present",
    description: "Hands-on work in IoT and electrical systems within a space research context.",
  },
  {
    id: "ACT-04",
    title: "Playtest QA",
    organization: "Electronic Arts (EA)",
    date: "Jul 2025 - Present",
    description: "Game testing and quality assurance for EA titles.",
  },
  {
    id: "ACT-05",
    title: "Community Member",
    organization: "Hack Club",
    date: "Jan 2023 - Present",
    description: "Long-standing active member of the global Hack Club community.",
  }
];

export const completedRuns = [
  {
    id: "RUN-01",
    title: "Sponsorship Outreach",
    organization: "Blends.App",
    date: "Jan 2026 - Jun 2026",
    description: "Outreach and partnership work for a Bengaluru-based startup.",
  },
  {
    id: "RUN-02",
    title: "Daydream Bengaluru Organizer",
    organization: "Hack Club",
    date: "Aug 2025 - Sep 2025",
    description: "Led end-to-end execution of a major community hackathon. Managed venue, technical setup, and volunteer workflows. Served as Head of Ground Support.",
  },
  {
    id: "RUN-03",
    title: "Astronomy Mentor",
    organization: "Youth STEAM Advisors",
    date: "Sep 2025 - Oct 2025",
    description: "Mentored students in astronomy as part of a STEAM education initiative.",
  },
  {
    id: "RUN-04",
    title: "Software Engineer Intern",
    organization: "FusionBots",
    date: "Aug 2025 - Oct 2025",
    description: "Software engineering internship.",
  },
  {
    id: "RUN-05",
    title: "Intern",
    organization: "Zidio Development",
    date: "Mar 2025 - Jun 2025",
    description: "Development internship.",
  },
  {
    id: "RUN-06",
    title: "Industrial Trainee",
    organization: "My Equation",
    date: "Jan 2025 - Apr 2025",
    description: "Industrial training, likely in robotics or technical education.",
  },
  {
    id: "RUN-07",
    title: "Freelance Developer / Builder",
    organization: "Freelance",
    date: "Until Feb 2025",
    description: "Independent technical and development work.",
  }
];

export const educationLog = [
  {
    id: "EDU-01",
    title: "Student",
    organization: "Army Public School (APS)",
    date: "Completed",
    description: "Primary & Secondary Education.",
  },
  {
    id: "EDU-02",
    title: "Student",
    organization: "Ekam Edify School",
    date: "Completed",
    description: "Secondary Education.",
  }
];

export const skills = {
  Languages: ["Python", "JavaScript", "Java", "HTML/CSS"],
  "Frameworks / Libraries": ["FastAPI", "React", "Three.js", "GSAP"],
  "Tools / Platforms": ["Git/GitHub", "VS Code", "Cursor", "AI-assisted workflow"],
  Hardware: ["Arduino", "ESP boards"],
  Domains: ["Web Development", "AI/ML", "Automation", "Robotics / Mechatronics", "Aerospace / Systems Thinking", "Event Operations"],
};

export const contact = {
  email: "shaikajhaj@gmail.com",
  github: "https://github.com/Ares006-007",
  linkedin: "https://www.linkedin.com/in/shaik-ajhaj",
  twitter: "[TWITTER NOT PROVIDED]",
  instagram: "https://www.instagram.com/_ajaz_x_o1o/",
};

