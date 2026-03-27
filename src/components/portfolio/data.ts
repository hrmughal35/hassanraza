export type NavLink = {
  label: string;
  href: string;
};

export type HeroContent = {
  eyebrow: string;
  title: string;
  description: string;
  keywords: string[];
};

export type AboutContent = {
  subtitle: string;
  highlights: string[];
};

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  achievements: string[];
};

export type ProjectItem = {
  title: string;
  description: string;
  tech: string[];
  impact: string;
};

export type SkillGroup = {
  title: string;
  skills: string[];
};

export type EducationItem = {
  title: string;
  subtitle: string;
  period: string;
};

export type ContactContent = {
  email: string;
  phone: string;
  whatsappNumber: string;
  linkedin: string;
};

export type FooterContent = {
  tagline: string;
};

export type PortfolioContent = {
  navLinks: NavLink[];
  hero: HeroContent;
  about: AboutContent;
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  skillGroups: SkillGroup[];
  education: EducationItem[];
  contact: ContactContent;
  footer: FooterContent;
};

export const defaultPortfolioContent: PortfolioContent = {
  navLinks: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    eyebrow: "ODOO IMPLEMENTER / CONSULTANT",
    title: "I am Hassan Raza",
    description:
      "Odoo implementer with expertise in both functional and technical consulting, helping businesses streamline workflows, automate operations, and build scalable digital systems.",
    keywords: ["ERP", "Automation", "AI Systems", "Business Impact", "Odoo"],
  },
  about: {
    subtitle:
      "ERP-focused consultant and developer with hands-on experience in Odoo implementation, automation, and modern web engineering.",
    highlights: [
      "1.5+ years of Odoo ERP consulting and implementation experience.",
      "Strong understanding of manufacturing and business workflow optimization.",
      "Built AI chatbot assistants and business automation solutions.",
    ],
  },
  experiences: [
    {
      role: "Technical Consultant",
      company: "Prissol",
      period: "Apr 2026 - Present",
      achievements: [
        "Leading technical consultation for ERP improvements and implementation strategy.",
        "Aligning business goals with scalable system design and practical execution.",
        "Supporting cross-functional teams on optimization, reporting, and automation planning.",
      ],
    },
    {
      role: "Odoo Functional-Technical Consultant",
      company: "Prissol",
      period: "2024 - Mar 2026",
      achievements: [
        "Gathered business requirements and mapped workflows into Odoo ERP modules.",
        "Configured procurement, inventory, manufacturing, and sales processes.",
        "Improved operational visibility with tailored reports and dashboards.",
      ],
    },
    {
      role: "AI Solutions Developer",
      company: "Prissol",
      period: "2023 - Mar 2026",
      achievements: [
        "Built AI chatbot assistants for business operations and internal support.",
        "Automated repetitive tasks through intelligent workflow integrations.",
        "Connected AI assistants with ERP context to improve response quality.",
      ],
    },
    {
      role: "Freelance Full Stack Developer",
      company: "Freelance",
      period: "2022 - Present",
      achievements: [
        "Delivered modern, responsive web apps using React, Next.js, and Node.",
        "Built secure APIs and admin panels with clean architecture.",
        "Focused on performance optimization and maintainable component systems.",
      ],
    },
  ],
  projects: [
    {
      title: "AI Chatbot Assistant - PPM",
      description:
        "Designed an AI-powered assistant for business Q&A, process help, and rapid support response.",
      tech: ["Next.js", "Node.js", "OpenAI API", "Tailwind"],
      impact: "Reduced response delays and improved internal support efficiency.",
    },
    {
      title: "Odoo ERP Implementation - PPM",
      description:
        "Implemented end-to-end Odoo workflows for operations, inventory, and process consistency.",
      tech: ["Odoo", "PostgreSQL", "Python", "Business Analysis"],
      impact: "Streamlined cross-department workflows and improved data accuracy.",
    },
    {
      title: "Odoo ERP Implementation - SFP",
      description:
        "Configured business modules and optimized approvals, procurement, and manufacturing flows.",
      tech: ["Odoo", "ERP Functional Design", "Reporting", "Automation"],
      impact: "Improved decision speed through cleaner reporting and automation.",
    },
    {
      title: "Barakat Al Qamar Shipping LLC Website",
      description:
        "Built and structured a professional logistics company website focused on service clarity, trust signals, and global shipping positioning.",
      tech: ["Next.js", "Tailwind CSS", "Responsive UI", "SEO Optimization"],
      impact:
        "Improved digital presence for freight services and made key business information easier to access for potential clients.",
    },
    {
      title: "ChequeMet Platform Website",
      description:
        "Developed a clean, modern web presence for ChequeMet with business-focused structure and conversion-friendly user flow.",
      tech: ["Next.js", "Tailwind CSS", "UI/UX Design", "Performance Optimization"],
      impact:
        "Strengthened online brand credibility and improved clarity of the platform's value proposition.",
    },
  ],
  skillGroups: [
    {
      title: "ERP Systems",
      skills: [
        "Odoo ERP",
        "HR",
        "Supply Chains",
        "POS",
        "Accounting",
        "Custom Modules Development",
        "Third Party Integration",
        "Project Lead",
        "Manufacturing Workflows",
        "Process Mapping",
        "ERP Reporting",
      ],
    },
    {
      title: "Development",
      skills: ["Python", "Django", "Next.js", "React JS", "PostgreSQL", "SQLite", "MySQL", "REST APIs", "MongoDB"],
    },
    {
      title: "AI & Automation",
      skills: [
        "AI Chatbots",
        "Workflow Automation",
        "Prompt Engineering",
        "LLM Integration",
        "n8n",
        "Voiceflow",
        "Flowise",
        "Chatbot Design",
        "Conversational AI",
      ],
    },
    {
      title: "Tools",
      skills: [
        "Git/GitHub",
        "PostgreSQL",
        "Figma",
        "Vercel",
        "VS Code",
        "Postman",
        "Docker",
        "Notion",
        "ClickUp",
        "Slack",
        "Jira",
        "n8n",
        "Voiceflow",
        "Flowise",
      ],
    },
  ],
  education: [
    {
      title: "BS - Information Technology",
      subtitle: "Government College University, Faisalabad",
      period: "2019 - 2023",
    },
    {
      title: "Intermediate (FSc - Pre-Engineering)",
      subtitle: "Be Superior Group of Colleges, Gujranwala",
      period: "2017 - 2019",
    },
    {
      title: "Matriculation",
      subtitle: "The Educators School, Gujranwala",
      period: "2015 - 2017",
    },
    {
      title: "Full-Stack Development (Python + Django)",
      subtitle: "NexSkill & Co.",
      period: "Oct 2023 - Feb 2024",
    },
  ],
  contact: {
    email: "hrmughal75@gmail.com",
    phone: "+92 323 0701210",
    whatsappNumber: "923230701210",
    linkedin: "https://www.linkedin.com/in/welcometohassanraza/",
  },
  footer: {
    tagline: "Built by Hassan Raza, powered by chai, curiosity, and controlled chaos.",
  },
};

export const navLinks = defaultPortfolioContent.navLinks;
export const experiences = defaultPortfolioContent.experiences;
export const projects = defaultPortfolioContent.projects;
export const skillGroups = defaultPortfolioContent.skillGroups;
export const education = defaultPortfolioContent.education;
