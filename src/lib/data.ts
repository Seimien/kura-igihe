import heroStory from "@/assets/hero-story.jpg";
import health from "@/assets/story-health.jpg";
import fashion from "@/assets/story-fashion.jpg";
import career from "@/assets/story-career.jpg";

export type Story = {
  id: string;
  title: string;
  category: string;
  summary: string;
  image: string;
  date: string;
  featured?: boolean;
  youtubeUrl?: string;
};
export type Opportunity = {
  id: string;
  title: string;
  type: "Job" | "Internship" | "Scholarship" | "Grant";
  organisation: string;
  deadline: string; // ISO
  location: string;
  eligibility: string;
  applicationUrl: string;
  verified: boolean;
};
export type EventItem = {
  id: string;
  title: string;
  type: string;
  date: string;
  location: string;
  registrationUrl: string;
};

const inDays = (d: number) => new Date(Date.now() + d * 86400000 + 12 * 3600000).toISOString();

export const trendingStory: Story = {
  id: "aline-code",
  title: "She taught herself to code on a borrowed phone. Now she employs 14.",
  category: "Career · Technology",
  summary:
    "Aline Uwase, 24, built a payments tool for Kigali market vendors. Here is how she started with nothing but data bundles and stubbornness.",
  image: heroStory,
  date: "Oct 4, 2026",
  featured: true,
  youtubeUrl: "https://www.youtube.com/@kura",
};

export const stories: Story[] = [
  {
    id: "nurse-musanze",
    title: "The 23-year-old nurse rebuilding trust in her village clinic",
    category: "Health",
    summary: "How Diane turned a two-room clinic into the place young mothers actually want to visit.",
    image: health,
    date: "Oct 2, 2026",
  },
  {
    id: "kitenge-studio",
    title: "From market stall to Kigali Fashion Week in three seasons",
    category: "Fashion",
    summary: "Grace's kitenge label now ships to six countries. Her advice: price your work properly.",
    image: fashion,
    date: "Sep 29, 2026",
    youtubeUrl: "https://www.youtube.com/@kura",
  },
  {
    id: "tea-data",
    title: "Using data to help tea farmers earn 30% more",
    category: "Career",
    summary: "An agronomy graduate shares what nobody told her about starting an agritech business.",
    image: career,
    date: "Sep 26, 2026",
  },
];

export const closingSoon: Opportunity = {
  id: "mcf-scholars",
  title: "Mastercard Foundation Scholars Program 2027",
  type: "Scholarship",
  organisation: "University of Rwanda",
  deadline: inDays(4),
  location: "Kigali, Rwanda",
  eligibility: "Ages 18–25",
  applicationUrl: "#",
  verified: true,
};

export const opportunities: Opportunity[] = [
  { id: "bk-intern", title: "Digital Banking Internship", type: "Internship", organisation: "Bank of Kigali", deadline: inDays(6), location: "Kigali", eligibility: "Final-year students", applicationUrl: "#", verified: true },
  { id: "irembo-dev", title: "Junior Software Engineer", type: "Job", organisation: "Irembo", deadline: inDays(9), location: "Kigali · Hybrid", eligibility: "0–2 years experience", applicationUrl: "#", verified: true },
  { id: "bdf-grant", title: "Youth Agribusiness Seed Grant", type: "Grant", organisation: "BDF Rwanda", deadline: inDays(12), location: "All provinces", eligibility: "Ages 18–35", applicationUrl: "#", verified: true },
  { id: "alu-schol", title: "Global Challenges Scholarship", type: "Scholarship", organisation: "African Leadership University", deadline: inDays(15), location: "Kigali", eligibility: "Secondary graduates", applicationUrl: "#", verified: true },
  { id: "mtn-intern", title: "Marketing & Brand Internship", type: "Internship", organisation: "MTN Rwanda", deadline: inDays(18), location: "Kigali", eligibility: "Recent graduates", applicationUrl: "#", verified: true },
  { id: "kla-job", title: "Community Health Officer", type: "Job", organisation: "Partners In Health", deadline: inDays(20), location: "Burera", eligibility: "Diploma in nursing", applicationUrl: "#", verified: true },
  { id: "unicef-grant", title: "Young Innovators Challenge", type: "Grant", organisation: "UNICEF Rwanda", deadline: inDays(24), location: "Online", eligibility: "Ages 16–24", applicationUrl: "#", verified: true },
  { id: "chev-schol", title: "Chevening Scholarship", type: "Scholarship", organisation: "UK Government", deadline: inDays(30), location: "United Kingdom", eligibility: "2+ years work", applicationUrl: "#", verified: true },
  { id: "kigali-job", title: "Junior Data Analyst", type: "Job", organisation: "Zipline", deadline: inDays(33), location: "Muhanga", eligibility: "Degree in STEM", applicationUrl: "#", verified: true },
];

export const events: EventItem[] = [
  { id: "career-fair", title: "Kigali Youth Career Fair", type: "Career fair", date: inDays(8), location: "Kigali Convention Centre", registrationUrl: "#" },
  { id: "pitch", title: "Pitch Night: Student Founders", type: "Competition", date: inDays(14), location: "Norrsken House, Kigali", registrationUrl: "#" },
  { id: "cv-clinic", title: "CV & LinkedIn Clinic", type: "Workshop", date: inDays(19), location: "Online", registrationUrl: "#" },
];

export const topics = ["Career", "Health", "Education", "Culture", "Money", "Style", "Tech"];

export const helpResources = [
  { id: "mental", name: "Mental health support", desc: "Free, confidential counselling lines and youth-friendly clinics." },
  { id: "sexual-health", name: "Sexual & reproductive health", desc: "Trusted information and services, without judgement." },
  { id: "money", name: "Money & debt", desc: "Guidance on budgeting, loans and financial stress." },
  { id: "safety", name: "Safety & abuse", desc: "Organisations that can help you stay safe, any time." },
];

export function daysLeft(iso: string) {
  const ms = new Date(iso).getTime() - Date.now();
  return { days: Math.max(0, Math.floor(ms / 86400000)), hrs: Math.max(0, Math.floor((ms % 86400000) / 3600000)) };
}
export function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
}

export const allStories: Story[] = [trendingStory, ...stories];
export const allOpportunities: Opportunity[] = [closingSoon, ...opportunities];

export function storyBody(s: Story): string[] {
  return [
    s.summary,
    "When we first met, the conversation kept returning to one idea: start before you feel ready. The early months were full of small setbacks — missed deadlines, unanswered emails, and long evenings figuring things out alone.",
    "What changed everything was community. A mentor, a few friends who believed in the idea, and a willingness to ask for help turned an uncertain plan into something real and sustainable.",
    "Today the focus is on opening doors for others. “If you are young and ambitious, don't wait for permission. Learn in public, share what you build, and keep showing up.”",
  ];
}
export function opportunityDetails(o: Opportunity) {
  return {
    about: `${o.organisation} is offering the ${o.title} for motivated young people. This ${o.type.toLowerCase()} is verified by the KURA team.`,
    requirements: [o.eligibility, "Rwandan citizen or resident", "Strong motivation and clear goals", "Updated CV and short motivation letter"],
    howToApply: "Prepare your documents, complete the online form on the organisation's website, and submit before the deadline. Late applications are not accepted.",
  };
}
export function eventDetails(e: EventItem) {
  return `${e.title} brings together young people, employers and mentors for a day of learning, networking and practical sessions. Entry is free, but places are limited — register early to secure your spot.`;
}
