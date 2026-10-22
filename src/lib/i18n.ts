import { useApp } from "@/lib/store";

/**
 * English → Kinyarwanda dictionary. English text is the key, so mock data and
 * UI strings can be translated with t("English text"). Missing keys fall back to English.
 */
const RW: Record<string, string> = {
  "Close": "Funga",
  "Learn": "Iga",
  "Wellness": "Ubuzima bwiza",
  "Learn and advice": "Kwiga n’inama",
  "Prepare your next step": "Tegura intambwe yawe ikurikira",
  "Health and wellbeing": "Ubuzima n’imibereho myiza",
  "Source": "Inkomoko",
  "Provider": "Utanga amahirwe",
  "Last checked": "Biheruka kugenzurwa",
  "Not yet checked": "Ntibiragenzurwa",
  "Needs check": "Bikeneye kugenzurwa",
  "Closed": "Byarangiye",
  "No deadline stated": "Nta tariki ntarengwa yatanzwe",
  "Available in English and Kinyarwanda": "Biboneka mu Cyongereza no mu Kinyarwanda",
  "Go to provider": "Jya ku utanga amahirwe",
  "You are leaving KURA": "Ugiye kuva kuri KURA",
  "KURA does not receive your application. Confirm the deadline and eligibility on the provider’s website.": "KURA ntiyakira ubusabe bwawe. Emeza itariki ntarengwa n’abemerewe ku rubuga rw’utanga amahirwe.",
  "What to prepare": "Ibyo gutegura",
  "Check the provider’s requirements before preparing your documents. Never pay an unverified application fee.": "Banza urebe ibisabwa n’utanga amahirwe mbere yo gutegura inyandiko. Ntukishyure amafaranga yo gusaba utabanje kugenzura.",
  "The application link has not been supplied. This sample listing cannot accept applications.": "Ihuza ryo gusaba ntiriratangwa. Iri tangazo ry’urugero ntirishobora kwakira ubusabe.",
  "Continue to provider": "Komeza ku utanga amahirwe",
  "Stay on KURA": "Guma kuri KURA",
  "Opens in a new tab": "Bifunguka mu yindi tab",
  "What KURA adds": "Icyo KURA yongeraho",
  "Use this summary to assess your fit. Confirm all requirements with the provider before applying.": "Koresha iyi ncamake urebe niba wujuje ibisabwa. Emeza ibisabwa byose ku utanga amahirwe mbere yo gusaba.",
  "Similar opportunities": "Amahirwe asa n’aya",
  "What can I do next?": "Nakora iki gikurikira?",
  "Find a workshop or event": "Shaka amahugurwa cyangwa igikorwa",
  "Find your next step. Confirm details with the provider before applying.": "Shaka intambwe yawe ikurikira. Emeza amakuru ku utanga amahirwe mbere yo gusaba.",
  "Closing within 7 days": "Birangira mu minsi 7",
  "Search opportunities": "Shakisha amahirwe",
  "Sort": "Tondeka",
  "Newest": "Bishya kurusha ibindi",
  "Email alerts are not active yet. No email or reminder will be sent.": "Imenyesha kuri imeri ntirirakora. Nta imeri cyangwa kwibutsa bizoherezwa.",
  "Source and review standards": "Amabwiriza y’inkomoko no kugenzura",
  "These are sample stories and listings. Sources, review dates and application links must be confirmed before publication.": "Izi ni inkuru n’amatangazo by’urugero. Inkomoko, amatariki yo kugenzura n’amahuza yo gusaba bigomba kwemezwa mbere yo gutangazwa.",
  "A verified label appears only when source and review evidence are available. KURA is not the opportunity provider.": "Ikimenyetso cy’igenzura kigaragara gusa iyo inkomoko n’ibimenyetso by’igenzura bihari. KURA si yo itanga amahirwe.",
  "Local support contacts are awaiting confirmation. For urgent help, contact a nearby health facility or your local emergency service.": "Aho wabona ubufasha mu gace kawe haracyategereje kwemezwa. Mu gihe cyihutirwa, wegera ivuriro rikwegereye cyangwa serivisi y’ubutabazi y’aho uri.",
  "These stories are for information, not professional medical advice. Review information is shown when available.": "Izi nkuru ni amakuru gusa, si inama z’umuganga. Amakuru y’igenzura agaragazwa iyo ahari.",
  "Clinical review: not yet supplied": "Igenzura ry’abaganga: ntiriratangwa",
  "Author, reviewer, sources and last-reviewed date are awaiting editorial confirmation.": "Umwanditsi, ugenzura, inkomoko n’itariki y’igenzura rya nyuma birategereje kwemezwa n’ubwanditsi.",
  "Prepare an application": "Tegura ubusabe",
  "Read the provider’s eligibility and deadline carefully.": "Soma witonze abemerewe n’itariki ntarengwa by’utanga amahirwe.",
  "Tailor your CV to the opportunity and check your contact details.": "Huza CV yawe n’amahirwe usaba kandi ugenzure amakuru yawe yo kuvugana.",
  "Gather only the documents requested by the provider.": "Kusanya gusa inyandiko zisabwa n’utanga amahirwe.",
  "Keep a copy of your application and submission confirmation.": "Bika kopi y’ubusabe bwawe n’icyemezo cy’uko bwoherejwe.",
  "Check an opportunity safely": "Genzura amahirwe mu mutekano",
  "Confirm the listing on the provider’s official website.": "Emeza itangazo ku rubuga rwemewe rw’utanga amahirwe.",
  "Never share passwords or banking details in an application.": "Ntukigere utanga ijambo ry’ibanga cyangwa amakuru ya banki mu busabe.",
  "Check any requested fee directly with the provider before paying.": "Emeza amafaranga asabwa ku utanga amahirwe mbere yo kwishyura.",
  "This opportunity is closed. Explore similar open opportunities below.": "Aya mahirwe yarangiye. Reba amahirwe asa na yo agifunguye hasi.",
  "Stories, scholarships, jobs and events for young people in Rwanda — all in one place.": "Inkuru, buruse, akazi n’ibikorwa ku rubyiruko rw’u Rwanda — byose ahantu hamwe.",
  "Stock photo — illustrative, not the person featured.": "Ifoto y’urugero — si iy’umuntu uvugwa mu nkuru.",
  "Photo": "Ifoto",
  "Training": "Amahugurwa",

  // Navigation & header
  "Get inspired": "Inkuru zitera imbaraga",
  "Find opportunities": "Shaka amahirwe",
  Events: "Ibikorwa",
  Help: "Ubufasha",
  "Search KURA…": "Shakisha kuri KURA…",
  "Search KURA": "Shakisha kuri KURA",
  "Clear search": "Siba ibyo washakishije",
  "No results for": "Nta bisubizo bibonetse kuri",
  "Open menu": "Fungura menu",
  Language: "Ururimi",
  Main: "Iby'ingenzi",
  Mobile: "Telefoni",
  Saved: "Byabitswe",
  Save: "Bika",
  Share: "Sangiza",
  Unsave: "Kuraho mu byabitswe",
  "Link copied": "Ihuza ryakopowe",
  "Removed from saved": "Byakuwe mu byabitswe",
  "Saved. Remind me before it closes?": "Byabitswe. Tukwibutse mbere y'uko birangira?",
  "3 days before": "Iminsi 3 mbere",
  "1 day before": "Umunsi 1 mbere",
  "No reminder": "Nta kwibutsa",

  // Kinds / types
  Story: "Inkuru",
  story: "inkuru",
  stories: "inkuru",
  opportunity: "amahirwe",
  event: "igikorwa",
  Job: "Akazi",
  Internship: "Imenyerezamwuga",
  Scholarship: "Buruse",
  Grant: "Inkunga",
  Event: "Igikorwa",
  "Career fair": "Imurikagurisha ry'akazi",
  Competition: "Irushanwa",
  Workshop: "Amahugurwa",

  // Hero
  "The bridge between youth, the future and": "Ikiraro gihuza urubyiruko, ejo hazaza n'",
  "ambition.": "intego.",
  "Verified stories, scholarships, jobs and events for young people in Rwanda — all in one place.":
    "Inkuru, buruse, akazi n'ibikorwa byagenzuwe ku rubyiruko rw'u Rwanda — byose ahantu hamwe.",
  "Explore KURA": "Menya KURA",
  Trending: "Bigezweho",
  "Read story": "Soma inkuru",
  Watch: "Reba",
  "Closing soon": "Birangira vuba",
  "Just added": "Byongeweho vuba",
  Days: "Iminsi",
  Hrs: "Amasaha",
  Deadline: "Itariki ntarengwa",
  Apply: "Saba",
  Verified: "Byagenzuwe",
  Brief: "Incamake",
  "Hero slides": "Amashusho y'ibanze",

  // Home sections
  "Why KURA": "Kuki KURA",
  "“Your definition of success will differ from other people’s personal goals, but you must remember that you are on different paths.”":
    "“Uko usobanura intsinzi bizatandukana n'intego z'abandi, ariko ugomba kwibuka ko muri mu nzira zitandukanye.”",
  "In partnership with": "Ku bufatanye na",
  "How we verify →": "Uko tugenzura →",
  "How we verify": "Uko tugenzura",
  Act: "Fata icyemezo",
  "Your next opportunity": "Amahirwe yawe akurikira",
  "Find all opportunities": "Reba amahirwe yose",
  "days left": "iminsi isigaye",
  Closes: "Birangira",
  Inspire: "Tera imbaraga",
  Inspired: "Inkuru zitera imbaraga",
  "All stories": "Inkuru zose",
  "Watch story": "Reba inkuru",
  "What's happening": "Ibiri kuba",
  "All events": "Ibikorwa byose",
  "View event": "Reba igikorwa",
  "Need answers first?": "Ukeneye ibisubizo mbere?",
  "Find trusted resources and organisations that can help.": "Shaka amakuru n'imiryango yizewe yagufasha.",
  "Get help →": "Shaka ubufasha →",
  "Get help": "Shaka ubufasha",

  // Footer
  Explore: "Shakisha",
  Participate: "Gira uruhare",
  "Tell us your story": "Tubwire inkuru yawe",
  "Submit an opportunity": "Ohereza amahirwe",
  About: "Abo turi bo",
  Contact: "Twandikire",
  "Privacy · Terms": "Ibanga · Amabwiriza",
  "Stay in the loop.": "Ntucikwe n'amakuru.",
  "Get new opportunities, events and stories that match your interests.":
    "Bona amahirwe mashya, ibikorwa n'inkuru bihuye n'ibyo ukunda.",
  "Get alerts →": "Akira imenyesha →",
  "© 2026 KURA · Youth with ambition. Supported by Mastercard Foundation.":
    "© 2026 KURA · Urubyiruko rufite intego. Ku nkunga ya Mastercard Foundation.",

  // Saved panel
  "Saved & Reminders": "Ibyabitswe n'Ukwibutswa",
  Alerts: "Imenyesha",
  "Nothing saved yet. Tap the bookmark on any story, opportunity or event.":
    "Nta kintu urabika. Kanda ku kimenyetso cyo kubika ku nkuru, amahirwe cyangwa igikorwa.",
  "Reminder:": "Kwibutsa:",
  Open: "Fungura",
  Remove: "Kuraho",
  "A reminder is about one item you saved. An alert tells you when something like it appears.":
    "Kwibutsa bireba ikintu kimwe wabitse. Imenyesha rikubwira igihe hagaragaye ikintu gisa na cyo.",
  "New scholarships": "Buruse nshya",
  Jobs: "Akazi",
  Internships: "Imenyerezamwuga",
  Off: "Bihagaze",
  Daily: "Buri munsi",
  Weekly: "Buri cyumweru",
  frequency: "inshuro",

  // Inspired page
  "Stories of young people taking their next step.": "Inkuru z'urubyiruko rutera intambwe ikurikira.",
  All: "Byose",
  "Story categories": "Ibyiciro by'inkuru",
  Health: "Ubuzima",
  Education: "Uburezi",
  Career: "Umwuga",
  Fashion: "Imideri",
  Entertainment: "Imyidagaduro",
  Culture: "Umuco",
  Money: "Amafaranga",
  "Youth & Society": "Urubyiruko na Sosiyete",
  Technology: "Ikoranabuhanga",
  "Career · Technology": "Umwuga · Ikoranabuhanga",
  "No stories in this category yet — check back soon.": "Nta nkuru ziri muri iki cyiciro ubu — uzagaruke vuba.",

  // Opportunities page
  Opportunities: "Amahirwe",
  opportunities: "amahirwe",
  "A dedicated board for young professionals. Every listing is verified by the KURA team.":
    "Urubuga rwihariye rw'urubyiruko rw'abanyamwuga. Buri tangazo ryagenzuwe n'itsinda rya KURA.",
  "Opportunity categories": "Ibyiciro by'amahirwe",
  Scholarships: "Buruse",
  Others: "Ibindi",
  Filter: "Shungura",
  "Opportunity type": "Ubwoko bw'akazi",
  "Work arrangement": "Uburyo bwo gukora",
  Location: "Aho biherereye",
  "Experience level": "Urwego rw'uburambe",
  Sector: "Urwego rw'umurimo",
  "Full-time": "Igihe cyose",
  "Part-time": "Igice cy'igihe",
  Contract: "Amasezerano",
  Freelance: "Wigenga",
  "On-site": "Ku kazi",
  Remote: "Kure",
  Hybrid: "Bivanze",
  Kigali: "Kigali",
  Rwanda: "U Rwanda",
  Africa: "Afurika",
  International: "Mpuzamahanga",
  "Entry Level": "Utangira",
  "Mid-Level": "Urwego rwo hagati",
  "Senior Level": "Inararibonye",
  Business: "Ubucuruzi",
  "Creative Industries": "Ubuhanzi n'ubugeni",
  Media: "Itangazamakuru",
  Finance: "Imari",
  Agriculture: "Ubuhinzi",
  "Development Sector": "Iterambere",
  "Show results": "Erekana ibisubizo",
  "Clear all": "Siba byose",
  "No opportunities match these filters.": "Nta mahirwe ahuye n'ibyo wahisemo.",

  // Help & about
  "You don't need to explain anything. Choose what feels closest — everything here is private.":
    "Ntugomba gusobanura ikintu na kimwe. Hitamo ikiri hafi y'ikibazo cyawe — byose ni ibanga.",
  "Mental health support": "Ubufasha ku buzima bwo mu mutwe",
  "Free, confidential counselling lines and youth-friendly clinics.":
    "Imirongo y'ubujyanama y'ubuntu kandi y'ibanga, n'amavuriro yakira neza urubyiruko.",
  "Sexual & reproductive health": "Ubuzima bw'imyororokere",
  "Trusted information and services, without judgement.": "Amakuru na serivisi byizewe, nta guca urubanza.",
  "Money & debt": "Amafaranga n'imyenda",
  "Guidance on budgeting, loans and financial stress.": "Inama ku gutegura ingengo y'imari, inguzanyo n'ihungabana ry'imari.",
  "Safety & abuse": "Umutekano n'ihohoterwa",
  "Organisations that can help you stay safe, any time.": "Imiryango ishobora kugufasha kugira umutekano, igihe cyose.",
  "In an emergency in Rwanda, call": "Mu gihe cy'ibyihutirwa mu Rwanda, hamagara",
  "Free youth helpline:": "Umurongo w'ubufasha ku rubyiruko w'ubuntu:",
  "KURA helps young people move from information to inspiration to action.":
    "KURA ifasha urubyiruko kuva ku makuru, ikagera ku mbaraga, ikagera ku gikorwa.",
  "Every opportunity is checked directly with the organisation offering it.":
    "Buri mahirwe agenzurwa mu buryo butaziguye n'umuryango uyatanga.",
  "Deadlines and eligibility are confirmed before publishing.":
    "Amatariki ntarengwa n'abemerewe byemezwa mbere yo gutangazwa.",
  "Stories are fact-checked with the people featured.": "Inkuru zigenzurwa ukuri hamwe n'abavugwamo.",
  "Supported by Mastercard Foundation.": "Ku nkunga ya Mastercard Foundation.",

  // Detail pages
  Back: "Subira inyuma",
  "All opportunities": "Amahirwe yose",
  "This item is no longer available.": "Iki kintu ntikikiboneka.",
  "More stories": "Izindi nkuru",
  "Time left": "Igihe gisigaye",
  Eligibility: "Abemerewe",
  "Apply now": "Saba nonaha",
  "About this opportunity": "Ibyerekeye aya mahirwe",
  Requirements: "Ibisabwa",
  "How to apply": "Uko wasaba",
  Register: "Iyandikishe",
  days: "iminsi",
  "Rwandan citizen or resident": "Umunyarwanda cyangwa uba mu Rwanda",
  "Strong motivation and clear goals": "Ubushake bukomeye n'intego zisobanutse",
  "Updated CV and short motivation letter": "CV ivuguruye n'ibaruwa ngufi isobanura impamvu",
  "Prepare your documents, complete the online form on the organisation's website, and submit before the deadline. Late applications are not accepted.":
    "Tegura inyandiko zawe, wuzuze ifishi iri ku rubuga rw'umuryango, kandi wohereze mbere y'itariki ntarengwa. Ubusabe butinze ntibwakirwa.",

  // Data — stories
  "She taught herself to code on a borrowed phone. Now she employs 14.":
    "Yiyigishije gukora porogaramu kuri telefoni yatiye. Ubu akoresha abantu 14.",
  "Aline Uwase, 24, built a payments tool for Kigali market vendors. Here is how she started with nothing but data bundles and stubbornness.":
    "Aline Uwase, w'imyaka 24, yakoze uburyo bwo kwishyura ku bacuruzi bo mu masoko ya Kigali. Dore uko yatangiye afite gusa interineti n'umuhate.",
  "The 23-year-old nurse rebuilding trust in her village clinic": "Umuforomokazi w'imyaka 23 wongera kubaka icyizere mu ivuriro ry'iwabo",
  "How Diane turned a two-room clinic into the place young mothers actually want to visit.":
    "Uko Diane yahinduye ivuriro ry'ibyumba bibiri ahantu ababyeyi bakiri bato bifuza kujya.",
  "From market stall to Kigali Fashion Week in three seasons": "Kuva ku gacuruzwa ko mu isoko kugera kuri Kigali Fashion Week mu bihembwe bitatu",
  "Grace's kitenge label now ships to six countries. Her advice: price your work properly.":
    "Imyenda ya kitenge ya Grace ubu igera mu bihugu bitandatu. Inama ye: ha akazi kawe agaciro gakwiye.",
  "Using data to help tea farmers earn 30% more": "Gukoresha amakuru gufasha abahinzi b'icyayi kunguka 30% kurushaho",
  "An agronomy graduate shares what nobody told her about starting an agritech business.":
    "Uwarangije ubuhinzi asangiza ibyo ntawe wamubwiye ku gutangiza ubucuruzi bw'ikoranabuhanga mu buhinzi.",
  "When we first met, the conversation kept returning to one idea: start before you feel ready. The early months were full of small setbacks — missed deadlines, unanswered emails, and long evenings figuring things out alone.":
    "Ubwo twahuraga bwa mbere, ikiganiro cyakomezaga kugaruka ku gitekerezo kimwe: tangira mbere y'uko wumva witeguye. Amezi ya mbere yari yuzuyemo inzitizi nto — amatariki yarenze, imeri zitasubijwe, n'amajoro maremare yo kwishakamo ibisubizo wenyine.",
  "What changed everything was community. A mentor, a few friends who believed in the idea, and a willingness to ask for help turned an uncertain plan into something real and sustainable.":
    "Icyahinduye byose ni abantu bamukikije. Umujyanama, inshuti nke zizeraga igitekerezo, n'ubushake bwo gusaba ubufasha byahinduye umugambi utizewe ikintu gifatika kandi kirambye.",
  "Today the focus is on opening doors for others. “If you are young and ambitious, don't wait for permission. Learn in public, share what you build, and keep showing up.”":
    "Uyu munsi intego ni ugufungurira abandi imiryango. “Niba uri muto kandi ufite intego, ntutegereze uruhushya. Iga ku mugaragaro, sangiza ibyo wubaka, kandi ukomeze kwitabira.”",

  // Data — opportunities
  "Mastercard Foundation Scholars Program 2027": "Gahunda ya Buruse ya Mastercard Foundation 2027",
  "Digital Banking Internship": "Imenyerezamwuga mu Ikoranabuhanga rya Banki",
  "Junior Software Engineer": "Umuhanga muto mu gukora porogaramu",
  "Youth Agribusiness Seed Grant": "Inkunga y'Igishoro ku Rubyiruko mu Buhinzi n'Ubworozi",
  "Global Challenges Scholarship": "Buruse ya Global Challenges",
  "Marketing & Brand Internship": "Imenyerezamwuga mu Kwamamaza",
  "Community Health Officer": "Ushinzwe Ubuzima mu Baturage",
  "Young Innovators Challenge": "Irushanwa ry'Abahanzi b'Udushya Bakiri Bato",
  "Chevening Scholarship": "Buruse ya Chevening",
  "Junior Data Analyst": "Umusesenguzi muto w'amakuru",
  "Ages 18–25": "Imyaka 18–25",
  "Ages 18–35": "Imyaka 18–35",
  "Ages 16–24": "Imyaka 16–24",
  "Final-year students": "Abanyeshuri bo mu mwaka wa nyuma",
  "0–2 years experience": "Uburambe bw'imyaka 0–2",
  "Secondary graduates": "Abarangije amashuri yisumbuye",
  "Recent graduates": "Abarangije vuba",
  "Diploma in nursing": "Dipolome mu buforomo",
  "2+ years work": "Imyaka 2+ y'akazi",
  "Degree in STEM": "Impamyabumenyi muri STEM",
  "Kigali, Rwanda": "Kigali, U Rwanda",
  "Kigali · Hybrid": "Kigali · Bivanze",
  "All provinces": "Intara zose",
  "United Kingdom": "Ubwongereza",
  Online: "Kuri interineti",

  // Data — events
  "Kigali Youth Career Fair": "Imurikagurisha ry'Akazi ku Rubyiruko rya Kigali",
  "Pitch Night: Student Founders": "Ijoro ryo Kumurika Imishinga: Abanyeshuri ba Rwiyemezamirimo",
  "CV & LinkedIn Clinic": "Amahugurwa kuri CV na LinkedIn",
  "Kigali Convention Centre": "Kigali Convention Centre",
};

export function translate(lang: "EN" | "RW", s: string) {
  return lang === "RW" ? (RW[s] ?? s) : s;
}

export function useT() {
  const { lang } = useApp();
  return (s: string) => translate(lang, s);
}

const MONTHS_RW = ["Mut", "Gas", "Wer", "Mat", "Gic", "Kam", "Nya", "Kan", "Nze", "Ukw", "Ugu", "Uku"];
const MONTHS_RW_LONG = ["Mutarama", "Gashyantare", "Werurwe", "Mata", "Gicurasi", "Kamena", "Nyakanga", "Kanama", "Nzeri", "Ukwakira", "Ugushyingo", "Ukuboza"];

export function fmtDateL(iso: string, lang: "EN" | "RW") {
  const d = new Date(iso);
  if (lang === "EN") return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
  return `${String(d.getDate()).padStart(2, "0")} ${MONTHS_RW[d.getMonth()]}`;
}
export function monthShort(iso: string, lang: "EN" | "RW") {
  const d = new Date(iso);
  return lang === "EN" ? d.toLocaleDateString("en-GB", { month: "short" }) : MONTHS_RW[d.getMonth()];
}
export function fmtLong(iso: string, lang: "EN" | "RW") {
  const d = new Date(iso);
  if (lang === "EN") return d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  return `${d.getDate()} ${MONTHS_RW_LONG[d.getMonth()]} ${d.getFullYear()}`;
}
/** Story dates are stored like "Oct 4, 2026". */
export function storyDate(s: string, lang: "EN" | "RW") {
  if (lang === "EN") return s;
  const d = new Date(s);
  return isNaN(d.getTime()) ? s : `${d.getDate()} ${MONTHS_RW_LONG[d.getMonth()]} ${d.getFullYear()}`;
}
