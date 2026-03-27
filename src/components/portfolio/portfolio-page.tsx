"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SiDjango,
  SiDocker,
  SiFigma,
  SiGit,
  SiGithub,
  SiJira,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiN8N,
  SiOdoo,
  SiOpenai,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiSlack,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import {
  ArrowUpRight,
  Bot,
  BriefcaseBusiness,
  Check,
  Globe,
  GraduationCap,
  Mail,
  Phone,
  Wrench,
} from "lucide-react";
import { FaEnvelope, FaLinkedinIn, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { defaultPortfolioContent, type PortfolioContent } from "@/components/portfolio/data";
import { SectionWrapper } from "@/components/portfolio/section-wrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PORTFOLIO_CONTENT_UPDATED_EVENT, readPortfolioContentFromStorage } from "@/lib/portfolio-admin";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const whatsAppPrompts = [
  "Need Odoo magic? Ping me.",
  "Fast replies. Zero corporate drama.",
  "Let's talk ERP, AI, or chai.",
];

const marqueeItems = [
  { name: "Odoo", icon: SiOdoo, color: "text-[#c8ecff]" },
  { name: "Python", icon: SiPython, color: "text-yellow-300" },
  { name: "Django", icon: SiDjango, color: "text-[#7dd3fc]" },
  { name: "Next.js", icon: SiNextdotjs, color: "text-[#f5fbff]" },
  { name: "React", icon: SiReact, color: "text-[#7dd3fc]" },
  { name: "Node.js", icon: SiNodedotjs, color: "text-[#67e8f9]" },
  { name: "TypeScript", icon: SiTypescript, color: "text-[#38bdf8]" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "text-[#bae6fd]" },
  { name: "MySQL", icon: SiMysql, color: "text-orange-300" },
  { name: "MongoDB", icon: SiMongodb, color: "text-green-300" },
  { name: "Docker", icon: SiDocker, color: "text-[#38bdf8]" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-[#67e8f9]" },
  { name: "Git", icon: SiGit, color: "text-orange-400" },
  { name: "GitHub", icon: SiGithub, color: "text-[#f7f1e8]" },
  { name: "Postman", icon: SiPostman, color: "text-orange-300" },
  { name: "Jira", icon: SiJira, color: "text-[#7dd3fc]" },
  { name: "Slack", icon: SiSlack, color: "text-fuchsia-300" },
  { name: "Figma", icon: SiFigma, color: "text-pink-300" },
  { name: "Vercel", icon: SiVercel, color: "text-[#f7f1e8]" },
  { name: "n8n", icon: SiN8N, color: "text-red-300" },
  { name: "OpenAI", icon: SiOpenai, color: "text-[#dff5ff]" },
  { name: "AI Bots", icon: Bot, color: "text-[#7dd3fc]" },
];

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Please enter at least 10 characters"),
});

type ContactValues = z.infer<typeof contactSchema>;

export function PortfolioPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const [isScrolled, setIsScrolled] = useState(false);
  const [isWhatsappOpen, setIsWhatsappOpen] = useState(false);
  const [whatsAppPromptIndex, setWhatsAppPromptIndex] = useState(0);
  const [portfolioContent, setPortfolioContent] = useState<PortfolioContent>(defaultPortfolioContent);
  const whatsappNumber = portfolioContent.contact.whatsappNumber.replace(/\D/g, "") || "923230701210";
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=Assalamualaikum%20Hassan%2C%20I%20visited%20your%20portfolio%20and%20want%20to%20discuss%20a%20project.`;
  const socialLinks = [
    {
      name: "Email",
      href: `mailto:${portfolioContent.contact.email}`,
      icon: FaEnvelope,
    },
    {
      name: "LinkedIn",
      href: portfolioContent.contact.linkedin,
      icon: FaLinkedinIn,
    },
    {
      name: "Phone",
      href: `tel:${portfolioContent.contact.phone.replace(/\s+/g, "")}`,
      icon: FaPhoneAlt,
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<ContactValues>({ resolver: zodResolver(contactSchema) });

  const year = useMemo(() => new Date().getFullYear(), []);

  const onSubmit = (values: ContactValues) => {
    const whatsappMessage = [
      "Assalamualaikum Hassan,",
      "I visited your portfolio and want to contact you.",
      "",
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Message: ${values.message}`,
    ].join("\n");

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    reset();
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 28);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setWhatsAppPromptIndex((current) => (current + 1) % whatsAppPrompts.length);
    }, 2600);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const syncPortfolioContent = () => {
      setPortfolioContent(readPortfolioContentFromStorage());
    };

    syncPortfolioContent();
    window.addEventListener("storage", syncPortfolioContent);
    window.addEventListener(PORTFOLIO_CONTENT_UPDATED_EVENT, syncPortfolioContent);

    return () => {
      window.removeEventListener("storage", syncPortfolioContent);
      window.removeEventListener(PORTFOLIO_CONTENT_UPDATED_EVENT, syncPortfolioContent);
    };
  }, []);

  return (
    <div className="relative overflow-x-clip">
      <motion.div className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-gradient-to-r from-[#7dd3fc] to-[#38bdf8]" style={{ scaleX }} />

      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,#18263c_0%,#0b111a_42%,#06080d_100%)]" />
      <motion.div
        className="pointer-events-none fixed left-1/2 top-24 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[#7dd3fc]/18 blur-3xl"
        animate={{ x: [0, 35, -20, 0], y: [0, -18, 22, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none fixed right-10 top-1/3 -z-10 h-52 w-52 rounded-full bg-[#38bdf8]/14 blur-3xl"
        animate={{ x: [0, -24, 12, 0], y: [0, 16, -10, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled ? "bg-[#0a0f16]/78 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="mx-auto w-full max-w-7xl px-4 pt-4 sm:px-6 lg:px-10">
          <div className="hidden items-center justify-between md:flex">
            <a href="#contact">
              <Button
                variant="outline"
                size="sm"
                className={`rounded-full px-5 tracking-[0.18em] uppercase backdrop-blur-sm transition-all duration-300 ${
                  isScrolled ? "border-white/12 bg-white/6" : "border-white/8 bg-white/3"
                }`}
              >
                Let&apos;s Talk
              </Button>
            </a>

            <a href="#home" className="font-script text-5xl leading-none text-white">
              Hassan Raza
            </a>

            <div className="flex items-center gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <a
                    key={`nav-${link.name}`}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-[#dff5ff]/90 transition hover:text-[#7dd3fc]"
                    aria-label={link.name}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="md:hidden">
            <div className="flex items-center justify-between py-2">
              <a href="#home" className="font-script text-4xl leading-none text-white">
                Hassan Raza
              </a>
              <a href="#contact">
                <Button variant="outline" size="sm" className="rounded-full">
                  Contact
                </Button>
              </a>
            </div>
          </div>

          <nav
            className={`mt-4 py-4 transition-colors duration-300 ${
              isScrolled ? "border-t border-b border-white/10" : "border-t border-b border-white/8"
            }`}
          >
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {portfolioContent.navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs font-semibold tracking-[0.22em] text-[#dff5ff]/90 uppercase transition hover:text-[#7dd3fc]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </header>

      <main>
        <section id="home" className="relative min-h-[calc(100vh-4rem)] w-full py-12 sm:py-14 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="relative overflow-hidden bg-[#06080d]"
          >
            <div className="pointer-events-none absolute inset-y-0 right-0 w-[70%]">
              <Image
                src="/images/about-me.jpeg"
                alt="Hassan Raza monochrome portrait background"
                fill
                sizes="(max-width: 768px) 100vw, 900px"
                className="object-cover object-[60%_24%] grayscale contrast-125 brightness-90"
                priority
              />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(6,8,13,0.98)_0%,rgba(6,8,13,0.9)_34%,rgba(6,8,13,0.48)_62%,rgba(6,8,13,0.72)_100%)]" />
            <div className="pointer-events-none absolute inset-y-0 left-[46%] hidden w-px bg-white/10 lg:block" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_18%_22%,rgba(125,211,252,0.13),transparent_30%),radial-gradient(circle_at_86%_24%,rgba(255,255,255,0.05),transparent_24%)]" />

            <div className="relative z-10 mx-auto grid min-h-[76vh] w-full max-w-7xl items-end pb-10 lg:min-h-[78vh]">
              <motion.div variants={container} initial="hidden" animate="show" className="space-y-8 px-4 pt-14 sm:px-6 lg:max-w-[64%] lg:px-10">
                <motion.div variants={item} className="flex flex-wrap gap-3">
                  {socialLinks.map((link) => {
                    const Icon = link.icon;

                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/14 bg-black/30 text-[#dff5ff] transition hover:-translate-y-1 hover:border-[#7dd3fc]/55 hover:text-[#7dd3fc]"
                        aria-label={link.name}
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    );
                  })}
                </motion.div>

                <motion.div variants={item} className="space-y-5">
                  <p className="text-xs font-semibold tracking-[0.34em] text-[#7dd3fc] uppercase">{portfolioContent.hero.eyebrow}</p>
                  <h1 className="section-title max-w-3xl text-5xl font-bold leading-[0.86] text-white sm:text-6xl lg:text-[6.6rem]">
                    <span className="block">I AM</span>
                    <span className="block">{portfolioContent.hero.title.replace(/^I am\s*/i, "")}</span>
                  </h1>
                  <p className="max-w-2xl text-base leading-8 text-[#c5d8e8] lg:text-[1.08rem]">{portfolioContent.hero.description}</p>
                </motion.div>

                <motion.div variants={item} className="flex flex-wrap gap-3">
                  <a href="#projects">
                    <Button size="lg" className="min-w-44 rounded-full">
                      View Portfolio
                    </Button>
                  </a>
                  <a href="#contact">
                    <Button variant="outline" size="lg" className="min-w-44 rounded-full border-white/30 bg-black/30">
                      Contact Me
                    </Button>
                  </a>
                </motion.div>

                <motion.div variants={item} className="flex flex-wrap gap-2">
                  {portfolioContent.hero.keywords.map((keyword, index) => (
                    <motion.div
                      key={keyword}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.08, duration: 0.3 }}
                    >
                      <Badge variant={index % 2 === 0 ? "default" : "secondary"} className="border-white/20 bg-black/36">
                        {keyword}
                      </Badge>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <section className="pb-10">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="glass marquee-mask overflow-hidden rounded-[28px] px-0 py-5">
              <div className="marquee-track flex w-max items-center gap-4">
                {[...marqueeItems, ...marqueeItems].map((itemValue, index) => {
                  const Icon = itemValue.icon;

                  return (
                    <div
                      key={`${itemValue.name}-${index}`}
                      className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/8 bg-white/4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                      aria-label={itemValue.name}
                      title={itemValue.name}
                    >
                      <Icon className={`h-7 w-7 ${itemValue.color}`} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <SectionWrapper
          id="about"
          title="About Me"
          subtitle={portfolioContent.about.subtitle}
        >
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid items-center gap-12 lg:grid-cols-[1.04fr_0.96fr]"
          >
            <motion.div variants={item} className="relative space-y-7">
              <div className="pointer-events-none absolute -left-10 top-1/2 h-44 w-44 -translate-y-1/2 rounded-full bg-[#7dd3fc]/8 blur-3xl" />

              <p className="text-xs font-semibold tracking-[0.28em] text-[#7dd3fc] uppercase">About Me</p>
              <h3 className="section-title max-w-2xl text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-[2.7rem]">
                Are you looking for premium ERP execution with technical depth? Let&apos;s build it right.
              </h3>
              <p className="max-w-2xl text-base leading-8 text-[#a9c3d9]">{portfolioContent.about.subtitle}</p>

              <div className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
                {portfolioContent.about.highlights.map((point) => (
                  <div key={point} className="group flex items-start gap-3 text-sm text-[#dff5ff]">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-[#7dd3fc]/35 bg-[#38bdf8]/12 text-[#7dd3fc] transition group-hover:border-[#7dd3fc]/60 group-hover:bg-[#38bdf8]/18">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <a href="#contact" className="inline-flex">
                  <Button className="rounded-full px-7">
                    More About
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </a>
                <span className="rounded-full border border-[#7dd3fc]/25 bg-[#0c1623]/85 px-4 py-2 text-xs tracking-[0.16em] text-[#a9c3d9] uppercase">
                  Functional + Technical
                </span>
              </div>
            </motion.div>

            <motion.div variants={item} className="relative mx-auto w-full max-w-[540px]">
              <div className="pointer-events-none absolute -top-9 right-8 z-30 rounded-full border border-[#7dd3fc]/35 bg-[#0a111a]/96 px-6 py-3 shadow-[0_20px_55px_rgba(0,0,0,0.42)] backdrop-blur-xl">
                <span className="mr-2 text-2xl font-extrabold text-[#dff5ff]">02+</span>
                <span className="text-[10px] font-semibold tracking-[0.16em] text-[#a9c3d9] uppercase">Years Building Solutions</span>
              </div>

              <div className="relative overflow-hidden rounded-[38px] border border-[#7dd3fc]/22 bg-[radial-gradient(circle_at_72%_20%,rgba(125,211,252,0.30),transparent_32%),linear-gradient(165deg,#0a111a_0%,#06080d_70%)] p-4 shadow-[0_26px_65px_rgba(0,0,0,0.34)] sm:p-6">
                <div className="absolute top-1/2 -left-5 h-12 w-12 -translate-y-1/2 rounded-full border border-[#7dd3fc]/45 bg-[#0b1725]/95 shadow-[0_0_38px_rgba(125,211,252,0.3)]" />
                <div className="absolute -right-12 -bottom-12 h-40 w-40 rounded-full bg-[#38bdf8]/22 blur-3xl" />
                <div className="absolute -left-16 top-14 h-24 w-24 rounded-full bg-[#7dd3fc]/14 blur-2xl" />

                <div className="relative overflow-hidden rounded-[30px] border border-[#7dd3fc]/20 shadow-[0_12px_36px_rgba(0,0,0,0.22)]">
                  <Image
                    src="/images/about-me.jpeg"
                    alt="About Hassan Raza"
                    width={820}
                    height={980}
                    className="h-[520px] w-full object-cover object-center"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(6,8,13,0.02),rgba(6,8,13,0.16)_54%,rgba(6,8,13,0.44)_100%)]" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </SectionWrapper>

        <SectionWrapper id="experience" title="Experience">
          <div className="relative space-y-6 before:absolute before:left-3 before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-[#233246]">
            {portfolioContent.experiences.map((exp) => (
              <motion.div
                key={exp.role}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative pl-10"
              >
                <span className="absolute left-0 top-2 rounded-full border border-[#7dd3fc]/30 bg-[#38bdf8]/12 p-1.5">
                  <BriefcaseBusiness className="h-4 w-4 text-[#dff5ff]" />
                </span>
                <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(56,189,248,0.12)]">
                  <CardHeader>
                    <CardTitle>{exp.role}</CardTitle>
                    <p className="text-sm text-[#a9c3d9]">
                      {exp.company} • {exp.period}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc space-y-2 pl-5 text-sm text-[#dff5ff]">
                      {exp.achievements.map((achievement) => (
                        <li key={achievement}>{achievement}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper id="projects" title="Projects">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {portfolioContent.projects.map((project) => (
              <motion.div key={project.title} variants={item}>
                <motion.div whileHover={{ y: -6 }}>
                  <Card className="h-full transition-transform duration-300 hover:shadow-[0_16px_40px_rgba(56,189,248,0.15)]">
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-[#a9c3d9]">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <motion.div key={tech} whileHover={{ scale: 1.08 }}>
                          <Badge variant="secondary">
                          {tech}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                    <p className="text-sm font-medium text-[#c8ecff]">Impact: {project.impact}</p>
                  </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </SectionWrapper>

        <SectionWrapper id="skills" title="Skills">
          <div className="grid gap-6 md:grid-cols-2">
            {portfolioContent.skillGroups.map((group) => (
              <motion.div key={group.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(56,189,248,0.14)]">
                  <CardHeader className="flex flex-row items-center gap-2">
                    <Wrench className="h-4 w-4 text-[#7dd3fc]" />
                    <CardTitle className="text-lg">{group.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <motion.div key={skill} whileHover={{ scale: 1.08 }} transition={{ duration: 0.2 }}>
                        <Badge>{skill}</Badge>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper id="education" title="Education & Certifications">
          <div className="grid gap-6 md:grid-cols-2">
            {portfolioContent.education.map((itemValue) => (
              <motion.div key={itemValue.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Card className="h-full">
                  <CardHeader className="flex flex-row items-start gap-3">
                    <GraduationCap className="mt-1 h-5 w-5 text-[#7dd3fc]" />
                    <div>
                      <CardTitle>{itemValue.title}</CardTitle>
                      <p className="mt-1 text-sm text-[#a9c3d9]">{itemValue.period}</p>
                    </div>
                  </CardHeader>
                  <CardContent className="text-[#dff5ff]">{itemValue.subtitle}</CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper id="contact" title="Contact">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Let&apos;s connect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-[#dff5ff]">
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#7dd3fc]" />
                  <a href={`mailto:${portfolioContent.contact.email}`} className="hover:text-white">
                    {portfolioContent.contact.email}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[#7dd3fc]" />
                  <a href={`tel:${portfolioContent.contact.phone.replace(/\s+/g, "")}`} className="hover:text-white">
                    {portfolioContent.contact.phone}
                  </a>
                </p>
                <p>
                  <Link
                    href={portfolioContent.contact.linkedin}
                    target="_blank"
                    className="inline-flex items-center gap-2 text-[#c8ecff] hover:text-[#e0f2fe]"
                  >
                    <Globe className="h-4 w-4" />
                    LinkedIn Profile
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Send a message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <Input placeholder="Your name" {...register("name")} />
                    {errors.name ? <p className="mt-1 text-xs text-rose-300">{errors.name.message}</p> : null}
                  </div>
                  <div>
                    <Input placeholder="Your email" {...register("email")} />
                    {errors.email ? <p className="mt-1 text-xs text-rose-300">{errors.email.message}</p> : null}
                  </div>
                  <div>
                    <Textarea placeholder="Tell me about your project" {...register("message")} />
                    {errors.message ? (
                      <p className="mt-1 text-xs text-rose-300">{errors.message.message}</p>
                    ) : null}
                  </div>
                  <Button type="submit" className="w-full">
                    Send via WhatsApp
                  </Button>
                  <p className="text-xs text-[#7dd3fc]">This opens WhatsApp with your message pre-filled.</p>
                  {isSubmitSuccessful ? <p className="text-xs text-[#a9c3d9]">WhatsApp opened in a new tab.</p> : null}
                </form>
              </CardContent>
            </Card>
          </div>
        </SectionWrapper>
      </main>

      <motion.div
        className="fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6"
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, delay: 0.4 }}
      >
        <motion.div
          className="relative"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="pointer-events-none absolute right-0 bottom-0 h-24 w-24 rounded-full bg-[#25d366]/28 blur-2xl"
            animate={{ scale: [1, 1.25, 1], opacity: [0.38, 0.74, 0.38] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="pointer-events-none absolute -top-2 left-0 h-2 w-2 rounded-full bg-[#86d5ff]"
            animate={{ x: [0, 10, -1, 0], y: [0, -8, -2, 0], scale: [1, 1.2, 0.95, 1] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="pointer-events-none absolute top-8 -left-3 h-1.5 w-1.5 rounded-full bg-[#dcfce7]"
            animate={{ x: [0, -6, 3, 0], y: [0, 8, -5, 0], opacity: [0.45, 1, 0.45] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="pointer-events-none absolute right-0 bottom-[calc(100%+0.95rem)] hidden w-[260px] lg:block"
            animate={{
              opacity: isWhatsappOpen ? 1 : 0,
              y: isWhatsappOpen ? 0 : 10,
              scale: isWhatsappOpen ? 1 : 0.98,
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="relative overflow-hidden rounded-[22px] border border-white/12 bg-[#0a121d]/92 p-4 shadow-[0_24px_62px_rgba(0,0,0,0.45)] backdrop-blur-xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(125,211,252,0.16),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(37,211,102,0.16),transparent_30%)]" />
              <div className="relative space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-semibold tracking-[0.28em] text-[#86d5ff] uppercase">Whatsapp</p>
                  <span className="inline-flex items-center gap-1 rounded-full border border-[#25d366]/35 bg-[#25d366]/12 px-2 py-0.5 text-[10px] font-medium text-[#dcfce7]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#25d366]" />
                    Online
                  </span>
                </div>
                <motion.p
                  key={whatsAppPromptIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22 }}
                  className="mt-1.5 text-sm font-semibold text-[#f5fbff]"
                >
                  {whatsAppPrompts[whatsAppPromptIndex]}
                </motion.p>
                <p className="text-xs text-[#a9c3d9]">Premium support for ERP, automation, and product delivery.</p>
              </div>
            </div>
          </motion.div>

          <motion.a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            aria-label="Chat on WhatsApp"
            onHoverStart={() => setIsWhatsappOpen(true)}
            onHoverEnd={() => setIsWhatsappOpen(false)}
            onFocus={() => setIsWhatsappOpen(true)}
            onBlur={() => setIsWhatsappOpen(false)}
            whileHover={{ scale: 1.08, rotate: -4 }}
            whileTap={{ scale: 0.96, rotate: 0 }}
            className="group relative flex h-[72px] w-[72px] items-center justify-center overflow-hidden rounded-[24px] border border-white/15 bg-[linear-gradient(160deg,rgba(37,211,102,0.98)_0%,rgba(15,89,82,0.94)_100%)] shadow-[0_22px_58px_rgba(10,16,28,0.58)]"
          >
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_24%,rgba(255,255,255,0.28),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.1),transparent_62%)]" />
            <motion.span
              className="absolute inset-[6px] rounded-[18px] border border-white/24"
              animate={{ opacity: [0.4, 0.9, 0.4], scale: [0.98, 1.03, 0.98] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.span
              className="absolute -top-1 -right-1 flex h-6 min-w-6 items-center justify-center rounded-full border border-white/15 bg-[#0a0f16] px-1 text-[9px] font-semibold text-[#86d5ff]"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              PRO
            </motion.span>
            <motion.span
              className="absolute inset-0 rounded-[24px] bg-[#25d366]/20"
              animate={{ scale: [1, 1.16, 1], opacity: [0.16, 0, 0.16] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
            />
            <FaWhatsapp className="relative z-10 h-8.5 w-8.5 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.28)] transition-transform duration-300 group-hover:scale-110" />
          </motion.a>
        </motion.div>
      </motion.div>

      <footer className="border-t border-[#233246]/70 py-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-4 text-sm text-[#89a4bf] sm:flex-row sm:px-6 lg:px-8">
          <div className="text-center sm:text-left">
            <p>© {year} Hassan Raza. All rights reserved.</p>
            <p className="mt-1 text-xs text-[#6f8aa5]">{portfolioContent.footer.tagline}</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href={`mailto:${portfolioContent.contact.email}`} className="hover:text-[#e0f2fe]">
              Email
            </Link>
            <Link href={portfolioContent.contact.linkedin} target="_blank" className="hover:text-[#e0f2fe]">
              LinkedIn
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
