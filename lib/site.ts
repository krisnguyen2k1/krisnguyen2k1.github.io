export const site = {
  name: "Kris Nguyen",
  legalName: "Nguyen Trung Kien",
  title: "Kris Nguyen | Learning systems and L&D portfolio",
  description:
    "Kris Nguyen is an L&D professional who turns operating needs into learning systems. Explore case studies, digital work and professional experience.",
  url: "https://krisnguyen2k1.github.io",
  email: "Gnurtneik2k1@gmail.com",
  phoneDisplay: "(+84) 39 5581 575",
  phoneHref: "tel:+84395581575",
  linkedin: "https://www.linkedin.com/in/krisnguyen2k1/",
  bookstore:
    "https://www.oreka.vn/store/9ojs3iuupttxjo?sort=createdAt&order=desc&page=2",
  cvHref: "/documents/nguyen-trung-kien-ld-cv.pdf",
};

export type NavItem = {
  href: string;
  label: string;
  newTab?: boolean;
};

export const navItems: NavItem[] = [
  { href: "/work/", label: "Work" },
  { href: "/digital-work/", label: "Digital work" },
  { href: "/education/", label: "Education" },
  { href: "/about/", label: "About" },
  { href: "/notes/reading/", label: "Reading" },
  { href: site.cvHref, label: "CV", newTab: true },
];
