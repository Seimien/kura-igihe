import heroStock from "@/assets/hero-stock.jpg.asset.json";
const heroStory = heroStock.url;
import healthStock from "@/assets/health-stock.jpg.asset.json";
const health = healthStock.url;
import fashionStock from "@/assets/fashion-stock.jpg.asset.json";
const fashion = fashionStock.url;
import careerStock from "@/assets/career-stock.jpg.asset.json";
const career = careerStock.url;

export type Story = {
  id: string;
  title: string;
  category: string;
  summary: string;
  image: string;
  date: string;
  featured?: boolean;
  youtubeUrl?: string;
  photoCredit?: string;
  photoSource?: string;
};
export type Opportunity = {
  id: string;
  title: string;
  type: "Job" | "Internship" | "Scholarship" | "Grant" | "Training" | "Workshop";
  organisation: string;
  deadline: string; // ISO
  location: string;
  eligibility: string;
  applicationUrl: string;
  verified: boolean;
  lastChecked?: string;
  publishedAt?: string;
  sourceUrl?: string;
  languages?: ("EN" | "RW")[];
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
  photoCredit: "Christina Morillo / Pexels",
  photoSource: "https://www.pexels.com/photo/1181249/",
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
    photoCredit: "Laura James / Pexels",
    photoSource: "https://www.pexels.com/photo/6098046/",
    date: "Oct 2, 2026",
  },
  {
    id: "kitenge-studio",
    title: "From market stall to Kigali Fashion Week in three seasons",
    category: "Fashion",
    summary: "Grace's kitenge label now ships to six countries. Her advice: price your work properly.",
    image: fashion,
    photoCredit: "illustrate Digital Ug / Pexels",
    photoSource: "https://www.pexels.com/photo/25406007/",
    date: "Sep 29, 2026",
    youtubeUrl: "https://www.youtube.com/@kura",
  },
  {
    id: "tea-data",
    title: "Using data to help tea farmers earn 30% more",
    category: "Career",
    summary: "An agronomy graduate shares what nobody told her about starting an agritech business.",
    image: career,
    photoCredit: "Fatima Yusuf / Pexels",
    photoSource: "https://www.pexels.com/photo/30541316/",
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
    about: `${o.organisation} is offering the ${o.title} for motivated young people.`,
    requirements: [o.eligibility, "Check the provider’s requirements before preparing your documents. Never pay an unverified application fee."],
    howToApply: "Confirm the listing on the provider’s official website.",
  };
}
export function eventDetails(e: EventItem) {
  return `${e.title} brings together young people, employers and mentors for a day of learning, networking and practical sessions. Entry is free, but places are limited — register early to secure your spot.`;
}

export const storyCategories = ["Health", "Education", "Career", "Fashion", "Entertainment", "Culture", "Money", "Youth & Society", "Technology"];

export type JobAttrs = {
  employment: "Full-time" | "Part-time" | "Contract" | "Freelance";
  arrangement: "On-site" | "Remote" | "Hybrid";
  region: "Kigali" | "Rwanda" | "Africa" | "International";
  level: "Entry Level" | "Mid-Level" | "Senior Level";
  sector: string;
};
export const jobAttrs: Record<string, JobAttrs> = {
  "bk-intern": { employment: "Full-time", arrangement: "On-site", region: "Kigali", level: "Entry Level", sector: "Finance" },
  "irembo-dev": { employment: "Full-time", arrangement: "Hybrid", region: "Kigali", level: "Entry Level", sector: "Technology" },
  "mtn-intern": { employment: "Part-time", arrangement: "Hybrid", region: "Kigali", level: "Entry Level", sector: "Media" },
  "kla-job": { employment: "Contract", arrangement: "On-site", region: "Rwanda", level: "Mid-Level", sector: "Health" },
  "kigali-job": { employment: "Full-time", arrangement: "On-site", region: "Rwanda", level: "Mid-Level", sector: "Technology" },
};
export const jobFacets = {
  employment: ["Full-time", "Part-time", "Contract", "Freelance"],
  arrangement: ["On-site", "Remote", "Hybrid"],
  region: ["Kigali", "Rwanda", "Africa", "International"],
  level: ["Entry Level", "Mid-Level", "Senior Level"],
  sector: ["Technology", "Business", "Creative Industries", "Media", "Finance", "Agriculture", "Education", "Health", "Development Sector"],
} as const;
export const facetLabels: Record<keyof typeof jobFacets, string> = {
  employment: "Opportunity type",
  arrangement: "Work arrangement",
  region: "Location",
  level: "Experience level",
  sector: "Sector",
};

export type OpportunityStatus = "Open" | "Closing soon" | "Closed" | "No deadline stated";
export function opportunityStatus(deadline: string, now = Date.now()): OpportunityStatus {
  const end = Date.parse(deadline);
  if (!Number.isFinite(end)) return "No deadline stated";
  if (end <= now) return "Closed";
  return end - now <= 7 * 86400000 ? "Closing soon" : "Open";
}
export function needsCheck(lastChecked?: string, now = Date.now()) {
  const checked = lastChecked ? Date.parse(lastChecked) : NaN;
  return !Number.isFinite(checked) || now - checked > 30 * 86400000;
}
export function providerUrl(value?: string) {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : undefined;
  } catch { return undefined; }
}
export function hasVerification(o: Opportunity) {
  return o.verified && !!providerUrl(o.sourceUrl) && !!o.lastChecked && !needsCheck(o.lastChecked);
}
export function openOpportunities(items = allOpportunities, now = Date.now()) {
  return items.filter((o) => opportunityStatus(o.deadline, now) !== "Closed")
    .sort((a, b) => (Date.parse(a.deadline) || Infinity) - (Date.parse(b.deadline) || Infinity));
}
export const storyNextSteps: Record<string, string> = {
  "aline-code": "irembo-dev", "nurse-musanze": "kla-job", "kitenge-studio": "mtn-intern", "tea-data": "bdf-grant",
};

export const learningGuides = [
  { title: "Prepare an application", steps: ["Read the provider’s eligibility and deadline carefully.", "Tailor your CV to the opportunity and check your contact details.", "Gather only the documents requested by the provider.", "Keep a copy of your application and submission confirmation."] },
  { title: "Check an opportunity safely", steps: ["Confirm the listing on the provider’s official website.", "Never share passwords or banking details in an application.", "Check any requested fee directly with the provider before paying."] },
];
