export const profile = {
  name: "Craig du Toit",
  role: "Front-End Engineer",
  tagline: "Motion design & interactive 3D web",
  location: "Johannesburg, South Africa",
  remote: "Remote",
  email: "craigtoit@gmail.com",
  linkedin: "https://www.linkedin.com/in/craigddutoit/",
  linkedinHandle: "in/craigddutoit",
  yearsExperience: 16,
  currently: "Osiris Trading — Betway",
  summary:
    "Front-end engineer with 16 years of experience specializing in motion design and interactive 3D web experiences. I ship React applications built on GSAP, Three.js and Motion — work that's moved engagement 25–40% along the way — with a focus on motion-first design systems and mentoring teams on animation craft.",
} as const;

export const stats = [
  { value: "16", suffix: "+", label: "Years shipping front-end" },
  { value: "25", suffix: "–40%", label: "Engagement lift on motion work" },
  { value: "12", suffix: "+", label: "Animated features, one system" },
] as const;

export type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  current?: boolean;
  description: string;
  tags: string[];
};

export const experience: ExperienceEntry[] = [
  {
    company: "Osiris Trading",
    role: "Software Developer — Team Lead",
    period: "Nov 2021 — Present",
    current: true,
    description:
      "Leading promotions development for Betway: front-end strategy, animation implementation across 12+ features, and interactive 3D visualizations. Own project planning, UI architecture, team mentorship and a motion-first design system.",
    tags: ["React", "GSAP", "Three.js", "Design Systems", "Leadership"],
  },
  {
    company: "Orderwise",
    role: "Front-End Developer",
    period: "Nov 2019 — Oct 2021",
    description:
      "Migrated legacy Silverlight applications to modern JavaScript, focused on secure APIs and interface improvements. Owned the end-to-end test suite for checkout.",
    tags: ["JavaScript", "Migration", "Testing", "APIs"],
  },
  {
    company: "Ninja Technologies",
    role: "Lead Front-End",
    period: "May 2014 — Oct 2019",
    description:
      "Directed initial client engagements, established brand identity strategy, and led as Scrum lead with direct client relationship ownership.",
    tags: ["Leadership", "Scrum", "Client Strategy", "Brand"],
  },
];

export type Skill = {
  name: string;
  category: "core" | "motion" | "craft" | "process";
};

export const skills: Skill[] = [
  { name: "React", category: "core" },
  { name: "Next.js", category: "core" },
  { name: "TypeScript", category: "core" },
  { name: "GSAP", category: "motion" },
  { name: "Three.js", category: "motion" },
  { name: "Motion", category: "motion" },
  { name: "Lottie", category: "motion" },
  { name: "Tailwind", category: "craft" },
  { name: "Figma", category: "craft" },
  { name: "Git", category: "process" },
  { name: "Jira", category: "process" },
  { name: "DevOps", category: "process" },
];

export type WorkEntry = {
  title: string;
  blurb: string;
  tags: string[];
  status: "Case study in progress" | "Live";
};

export const work: WorkEntry[] = [
  {
    title: "Betway Promotions — Motion System",
    blurb:
      "A motion-first design system powering 12+ promotional features at scale — one shared animation language across an entire product team.",
    tags: ["GSAP", "Design Systems", "React"],
    status: "Case study in progress",
  },
  {
    title: "Interactive 3D Product Visualizations",
    blurb:
      "Real-time, interactive 3D built with Three.js for high-engagement promotional experiences.",
    tags: ["Three.js", "WebGL", "3D"],
    status: "Case study in progress",
  },
  {
    title: "This Site",
    blurb:
      "You're looking at it — Next.js, GSAP ScrollTrigger, React Three Fiber and Motion, built to be its own proof of craft.",
    tags: ["Next.js", "GSAP", "R3F", "Motion"],
    status: "Live",
  },
];

export const nav = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
] as const;
