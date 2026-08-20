export type CaseStudy = {
  slug: string;
  eyebrow: string;
  title: string;
  summary: string;
  intendedEffect: string;
  tags: string[];
  evidence: string;
  publicReady: boolean;
  metrics: { eyebrow: string; value: string; label: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "ld-operating-manual",
    eyebrow: "2026 - Learning operations",
    title: "A working manual for the L&D function",
    summary:
      "Six knowledge sources organised into one 150-page reference for standards, templates and recurring work.",
    intendedEffect:
      "Built to reduce reliance on memory and make recurring work easier to run, hand over and improve.",
    tags: ["Documentation", "Governance", "Handover"],
    evidence: "Candidate-reported output. A redacted sample is being prepared.",
    publicReady: false,
    metrics: [
      { eyebrow: "Length", value: "150 pages", label: "Candidate-reported output." },
      { eyebrow: "Source set", value: "6 sources", label: "Candidate-reported consolidation scope." },
      { eyebrow: "Effect", value: "Not measured", label: "No business effect claim is made." },
    ],
  },
  {
    slug: "role-based-learning-paths",
    eyebrow: "2026 - Learning data",
    title: "Role logic for cleaner learning assignments",
    summary:
      "Reviewed changed-role information against function-based learning paths and escalated cases that did not support a reliable match.",
    intendedEffect:
      "Built to improve the quality of learning assignments and the decisions behind them.",
    tags: ["Role mapping", "Learning data", "Decision logic"],
    evidence: "Candidate-reported work. A redacted mapping artifact is being prepared.",
    publicReady: false,
    metrics: [
      { eyebrow: "Review scope", value: "To confirm", label: "Associate count remains under evidence review." },
      { eyebrow: "Decision rule", value: "Escalate", label: "Ambiguous role information was not treated as a reliable match." },
      { eyebrow: "Effect", value: "Not measured", label: "No capability or completion claim is made." },
    ],
  },
  {
    slug: "marriott-culture-week",
    eyebrow: "2026 - Experience design",
    title: "An interactive culture programme built for participation",
    summary:
      "Created scripts, activities and a working team challenge for Marriott Culture Week 2026.",
    intendedEffect:
      "Built to make company values visible through participation rather than another internal announcement.",
    tags: ["Experience design", "Facilitation", "Interactive learning"],
    evidence: "Working HTML artifact supplied. Live-use evidence is being confirmed.",
    publicReady: false,
    metrics: [
      { eyebrow: "Game board", value: "10 clues", label: "Verified in the supplied HTML artifact." },
      { eyebrow: "Team model", value: "4 teams", label: "Verified in the supplied HTML artifact." },
      { eyebrow: "Question time", value: "20 seconds", label: "Verified in the supplied HTML artifact." },
    ],
  },
];

export type Project = {
  title: string;
  category: string;
  summary: string;
  capability: string;
  href: string;
  selected?: boolean;
};

export const projects: Project[] = [
  {
    title: "Kris's English Studio 2.0",
    category: "Learning interaction",
    summary:
      "An interactive English practice environment built to make repeated practice easier to start and continue.",
    capability: "Learning interaction, practice structure and learner usability.",
    href: "https://krisnguyen2k1.github.io/gnurtneik2k1.github.io/",
    selected: true,
  },
  {
    title: "Krishnamurti: A Human Life",
    category: "Research and information architecture",
    summary:
      "A 37-chapter research project with a timeline, people index and published source method.",
    capability: "Long-form research, source discipline and information architecture.",
    href: "https://krishnamurti-a-human-life.netlify.app/",
    selected: true,
  },
  {
    title: "Ho Chi Minh City Labour Market 2026",
    category: "Data storytelling",
    summary:
      "A web-based analysis of labour supply, skills mismatch, administrative change and AI in the city's labour market.",
    capability: "Data storytelling, labour-market reasoning and business context.",
    href: "https://krisnguyen2k1.github.io/thi-truong-lao-dong-tphcm-2026/",
    selected: true,
  },
  {
    title: "Steve Jobs: An Interactive Biography",
    category: "Interactive biography",
    summary:
      "An independent reading companion that maps Steve Jobs's life, relationships, product shifts and all 42 chapters of Walter Isaacson's biography.",
    capability: "Long-form research, interactive editorial design and information architecture.",
    href: "https://krisnguyen2k1.github.io/steve-jobs-interactive-biography/",
  },
  {
    title: "The Laws of Human Nature — Interactive Guide",
    category: "Interactive book companion",
    summary:
      "A complete learning companion for Robert Greene’s 18 laws, with historical cases, pattern comparisons, quizzes, reflection and private browser-based progress.",
    capability: "Long-form synthesis, learning design, interaction design and information architecture.",
    href: "https://krisnguyen2k1.github.io/laws-of-human-nature-interactive-companion/",
  },
  {
    title: "Psychology in Vietnam",
    category: "Career information design",
    summary:
      "A candid guide to study costs, competition, career paths and personal fit.",
    capability: "Career research and information design.",
    href: "https://krisnguyen2k1.github.io/psychology-in-vietnam/",
  },
  {
    title: "Before Marriott",
    category: "Research and narrative",
    summary:
      "A sourced digital biography of J. Willard Marriott and the operating ideas behind the company he built.",
    capability: "Hospitality research and narrative structure.",
    href: "https://krisnguyen2k1.github.io/gnurtneik2k1.github.io-marriott/",
  },
  {
    title: "Bill Marriott: A Life of Service",
    category: "Leadership writing",
    summary:
      "A leadership biography about service, decisions, loss and long-term stewardship.",
    capability: "Leadership research and editorial writing.",
    href: "https://krisnguyen2k1.github.io/bill-marriott-cuoc-doi/",
  },
  {
    title: "The Man and His Country",
    category: "Historical synthesis",
    summary:
      "A Vietnamese historical edition on Mustafa Kemal Atatürk and the creation of modern Türkiye.",
    capability: "Historical research and synthesis.",
    href: "https://krisnguyen2k1.github.io/ataturk-viet-history/",
  },
  {
    title: "Thân Ai Nấy Lo",
    category: "Long-form Vietnamese writing",
    summary:
      "A Vietnamese long-form review of Eric Barker's book on love, family and relationships.",
    capability: "Long-form review and Vietnamese editorial writing.",
    href: "https://krisnguyen2k1.github.io/than-ai-nay-lo/",
  },
];

export const selectedProjects = projects.filter((project) => project.selected);
export const secondaryProjects = projects.filter((project) => !project.selected);

export const articles = [
  {
    category: "Research biography",
    title: "Krishnamurti: A Human Life",
    summary: "A 37-chapter research project supported by a timeline, people index and published source method.",
    href: "https://krishnamurti-a-human-life.netlify.app/",
  },
  {
    category: "Leadership biography",
    title: "Bill Marriott: A Life of Service",
    summary: "A long-form account of service, decisions, loss and long-term stewardship.",
    href: "https://krisnguyen2k1.github.io/bill-marriott-cuoc-doi/",
  },
  {
    category: "Vietnamese editorial writing",
    title: "Thân Ai Nấy Lo",
    summary: "A long-form Vietnamese review of Eric Barker's work on love, family and relationships.",
    href: "https://krisnguyen2k1.github.io/than-ai-nay-lo/",
  },
];

export const timeline = [
  {
    dates: "Apr 2026 - present",
    role: "Learning and Development Coordinator",
    organisation: "The Westin Resort & Spa Cam Ranh",
    detail:
      "Learning operations, programme coordination, documentation, role mapping, orientation, compliance support and internal communication.",
  },
  {
    dates: "Mar 2026",
    role: "Training and Recruitment Trainee",
    organisation: "The Westin Resort & Spa Cam Ranh",
    detail:
      "Entered the property through a trainee role before moving into the coordinator position.",
  },
  {
    dates: "Apr 2025 - Mar 2026",
    role: "Educational Consultant and Assistant Lecturer",
    organisation: "Dong A University",
    detail:
      "Advised students and families, supported classroom delivery and developed practical experience in explanation and audience management.",
  },
  {
    dates: "Dec 2023 - Apr 2025",
    role: "Sales Coordinator",
    organisation: "Hoiana Resort & Golf",
    detail:
      "Coordinated proposals, records and communication between commercial and operating teams in a large hospitality environment.",
  },
  {
    dates: "2019 - present",
    role: "Founder",
    organisation: "Tri Thuc Books",
    detail:
      "Maintains an independent bookstore practice with direct exposure to customers, inventory, pricing and day-to-day operating decisions.",
  },
];

export const supportingWork = [
  {
    title: "Food Hygiene and Safety Training 2026",
    detail:
      "Planned group allocation, bilingual communication, attendance records and self-directed materials for operating teams unable to attend classroom sessions.",
  },
  {
    title: "Occupational safety and health classification",
    detail:
      "Classified associates into statutory training groups and escalated unresolved cases for department and executive decision.",
  },
  {
    title: "New-hire orientation facilitator script",
    detail:
      "Wrote a facilitator script so the core orientation could be delivered more consistently across intakes.",
  },
  {
    title: "Marriotternship 2026 trainee tracker",
    detail:
      "Built a master file to follow trainees from application through programme completion.",
  },
  {
    title: "Task Delegation Matrix",
    detail:
      "Clarified ownership, deadlines and handover points across recurring L&D work.",
  },
  {
    title: "Certified Departmental Trainer",
    detail: "Completed Certified Departmental Trainer certification on 26 June 2026.",
  },
];
