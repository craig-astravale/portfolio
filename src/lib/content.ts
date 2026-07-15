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
  { value: "50", suffix: "+", label: "Promo & gamification projects shipped" },
] as const;

export type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  current?: boolean;
  description: string;
  highlights?: string[];
  tags: string[];
};

export const experience: ExperienceEntry[] = [
  {
    company: "Osiris Trading",
    role: "Software Developer — Team Lead",
    period: "Nov 2021 — Present",
    current: true,
    description:
      "Leading promotions and gamification for Betway, where animation is the product: spinning wheels, card games, prediction games and interactive 3D experiences that make promotions feel alive.",
    highlights: [
      "Shipped 50+ projects over 5 years, taking full ownership of the quality of every delivery",
      "Work tightly with management, back-end developers, stakeholders and UI/UX designers",
      "Own front-end strategy end to end: project planning, UI architecture and a motion-first design system",
      "Mentor the team on animation craft",
    ],
    tags: ["React", "GSAP", "Three.js", "Gamification", "Leadership"],
  },
  {
    company: "Orderwise",
    role: "Front-End Developer",
    period: "Nov 2019 — Oct 2021",
    description:
      "Modernized enterprise commerce software on a refinement-cycle team, moving a legacy front-end onto today's stack without dropping the ball on stability.",
    highlights: [
      "Migrated legacy Silverlight applications to modern JavaScript",
      "Ran Implement → Refine → Test loops until every project was bug-free, polished, performant and secure",
      "Focused on secure APIs and interface improvements",
      "Owned the end-to-end test suite for checkout",
    ],
    tags: ["JavaScript", "Migration", "Testing", "Performance"],
  },
  {
    company: "Ninja Technologies",
    role: "Lead Front-End",
    period: "May 2014 — Oct 2019",
    description:
      "Agency lead across strategy, brand and delivery — building design systems before they had a name, and learning to own the client relationship, not just the code.",
    highlights: [
      "In charge of technological advancement: adoption, tooling and mentorship across the studio",
      "Built and maintained a bespoke UI kit serving every client — maintainable systems before the days of shadcn and Tailwind",
      "Directed initial client engagements with direct relationship ownership",
      "Established brand identity strategy and led delivery as Scrum lead",
    ],
    tags: ["Leadership", "Design Systems", "Scrum", "Client Strategy", "Brand"],
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
  href?: string;
  /** Path under /public — rendered as a masked, tintable mark on the card.
      `aspect` is the SVG's width/height, used to size the mask. */
  logo?: { src: string; aspect: number };
};

export const work: WorkEntry[] = [
  {
    title: "cvitae — AI-Powered CV Builder",
    blurb:
      "Founded and built end-to-end: South Africa's best AI-powered CV builder with live ATS scoring. Next.js, Supabase and Paystack subscriptions — every pixel, query and deployment shipped solo.",
    tags: ["Founder", "Next.js", "Supabase", "AI"],
    status: "Live",
    href: "https://www.cvitae.co.za",
    logo: { src: "/brand/cvitae.svg", aspect: 585.93 / 183.23 },
  },
  {
    title: "Incommon Productions",
    blurb:
      "Full brand and site build for a creative production company: designed and built the site, hand-crafted every animation in GSAP, reinvented the color palette and redesigned the logo.",
    tags: ["GSAP", "Design", "Branding", "Logo"],
    status: "Live",
    href: "https://incommonproductions.com",
    logo: { src: "/brand/incommon.svg", aspect: 302.31 / 125.27 },
  },
  {
    title: "This Site",
    blurb:
      "You're looking at it — Next.js, GSAP ScrollTrigger, React Three Fiber and Motion, built to be its own proof of craft.",
    tags: ["Next.js", "GSAP", "R3F", "Motion"],
    status: "Live",
    logo: { src: "/brand/logo.svg", aspect: 583 / 668 },
  },
];

export const nav = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
] as const;
