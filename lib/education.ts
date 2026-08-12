export type EducationItem = {
  degree: string;
  institution: string;
  dates: string;
  status: string;
  gpa: string;
  gpaLabel: string;
};

export const formalEducation: EducationItem[] = [
  {
    degree: "Bachelor of Hotel Management",
    institution: "University of Economics - The University of Danang (DUE)",
    dates: "Aug 2019 - Aug 2023",
    status: "Completed",
    gpa: "2.76 / 4.00",
    gpaLabel: "Final GPA",
  },
  {
    degree: "Bachelor of Psychology",
    institution: "Ho Chi Minh City University of Technology (HUTECH)",
    dates: "Aug 2024 - Sep 2026",
    status: "In progress",
    gpa: "3.27 / 4.00",
    gpaLabel: "Current GPA",
  },
  {
    degree: "Bachelor of English Language",
    institution: "Hoa Sen University (HSU)",
    dates: "Jan 2026 - Jan 2029",
    status: "In progress",
    gpa: "3.60 / 4.00",
    gpaLabel: "Current GPA",
  },
];

export const certifications = [
  "International Tour Guide (English)",
  "Pedagogical Skills (College/University Level)",
  "School Psychological Counseling Skills - USSH HCMC",
];

export const languageProficiency = {
  language: "English",
  assessment: "IELTS",
  score: "6.5",
};
