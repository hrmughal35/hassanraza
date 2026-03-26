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
  Globe,
  GraduationCap,
  Mail,
  Phone,
  Wrench,
} from "lucide-react";
import { FaEnvelope, FaLinkedinIn, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { navLinks, experiences, projects, skillGroups, education } from "@/components/portfolio/data";
import { SectionWrapper } from "@/components/portfolio/section-wrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const floatTransition = {
  duration: 8,
  repeat: Infinity,
  repeatType: "mirror" as const,
  ease: "easeInOut" as const,
};

const welcomeKeywords = ["ERP", "Automation", "AI Systems", "Business Impact", "Odoo"];
const whatsAppPrompts = [
  "Need Odoo magic? Ping me.",
  "Fast replies. Zero corporate drama.",
  "Let's talk ERP, AI, or chai.",
];

const socialLinks = [
  {
    name: "Email",
    href: "mailto:hrmughal75@gmail.com",
    icon: FaEnvelope,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/welcometohassanraza/",
    icon: FaLinkedinIn,
  },
  {
    name: "Phone",
    href: "tel:+923230701210",
    icon: FaPhoneAlt,
  },
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
  const whatsappHref = "https://wa.me/923230701210?text=Assalamualaikum%20Hassan%2C%20I%20visited%20your%20portfolio%20and%20want%20to%20discuss%20a%20project.";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<ContactValues>({ resolver: zodResolver(contactSchema) });

  const year = useMemo(() => new Date().getFullYear(), []);

  const onSubmit = (values: ContactValues) => {
    // Frontend-only form handler; replace with API route when backend is needed.
    console.log("Contact form submitted", values);
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
              {navLinks.map((link) => (
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
        <section id="home" className="relative mx-auto min-h-[calc(100vh-4rem)] w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="relative"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-full rounded-[40px] bg-[radial-gradient(circle_at_22%_24%,rgba(125,211,252,0.08),transparent_22%),radial-gradient(circle_at_78%_34%,rgba(56,189,248,0.08),transparent_20%)]" />
            <div className="relative grid items-center gap-12 lg:min-h-[78vh] lg:grid-cols-[1.08fr_0.92fr]">
              <motion.div variants={container} initial="hidden" animate="show" className="space-y-7">
                <motion.div variants={item} className="flex flex-wrap gap-3">
                  {socialLinks.map((link) => {
                    const Icon = link.icon;

                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-[#7dd3fc]/18 bg-white/5 text-[#dff5ff] transition hover:-translate-y-1 hover:border-[#7dd3fc]/40 hover:text-[#7dd3fc]"
                        aria-label={link.name}
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    );
                  })}
                </motion.div>

                <motion.div variants={item} className="space-y-5">
                  <p className="text-sm font-medium tracking-[0.28em] text-[#7dd3fc]/85">
                    ODOO IMPLEMENTER / CONSULTANT
                  </p>
                  <h1 className="section-title max-w-2xl text-5xl font-bold leading-[0.92] text-white sm:text-6xl lg:text-[5.4rem]">
                    I am Hassan Raza
                  </h1>
                  <p className="max-w-2xl text-lg leading-8 text-[#a9c3d9] lg:text-[1.15rem]">
                    Odoo implementer with expertise in both functional and technical consulting, helping businesses
                    streamline workflows, automate operations, and build scalable digital systems.
                  </p>
                </motion.div>

                <motion.div variants={item} className="flex flex-wrap gap-3">
                  <a href="#projects">
                    <Button size="lg" className="min-w-40 rounded-full">
                      View Portfolio
                    </Button>
                  </a>
                  <a href="#contact">
                    <Button variant="outline" size="lg" className="min-w-40 rounded-full">
                      Contact Me
                    </Button>
                  </a>
                </motion.div>

                <motion.div variants={item} className="flex flex-wrap gap-2">
                  {welcomeKeywords.map((keyword, index) => (
                    <motion.div
                      key={keyword}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.08, duration: 0.3 }}
                    >
                      <Badge variant={index % 2 === 0 ? "default" : "secondary"}>{keyword}</Badge>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative mx-auto flex w-full max-w-[560px] items-end justify-center lg:justify-end"
              >
                <span className="pointer-events-none absolute bottom-8 left-1/2 z-0 -translate-x-1/2 text-[5.5rem] font-semibold italic tracking-tight text-white/6 sm:text-[7.5rem]">
                  Hassan
                </span>
                <motion.div animate={{ y: [0, -8, 0] }} transition={floatTransition} className="relative z-10 w-full">
                  <div className="absolute inset-x-10 bottom-3 h-24 rounded-full bg-[#7dd3fc]/12 blur-3xl" />
                  <motion.div
                    className="relative h-[600px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_72%,transparent_100%),linear-gradient(to_right,transparent_0%,black_12%,black_88%,transparent_100%)] [mask-composite:intersect] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_72%,transparent_100%),linear-gradient(to_right,transparent_0%,black_12%,black_88%,transparent_100%)] [-webkit-mask-composite:source-in]"
                    whileHover={{ scale: 1.015 }}
                    transition={{ duration: 0.35 }}
                  >
                    <Image
                      src="/images/hassanraza.jpeg"
                      alt="Hassan Raza portrait"
                      fill
                      sizes="(max-width: 768px) 90vw, 560px"
                      className="object-cover object-center"
                      priority
                    />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(6,8,13,0.03),rgba(6,8,13,0.08)_50%,rgba(6,8,13,0.2)_78%,rgba(6,8,13,0.48)_100%)]" />
                  </motion.div>
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
          subtitle="ERP-focused consultant and developer with hands-on experience in Odoo implementation, automation, and modern web engineering."
        >
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-6 md:grid-cols-3"
          >
            {[
              "1.5+ years of Odoo ERP consulting and implementation experience.",
              "Strong understanding of manufacturing and business workflow optimization.",
              "Built AI chatbot assistants and business automation solutions.",
            ].map((point) => (
              <motion.div key={point} variants={item}>
                <Card className="h-full transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(56,189,248,0.16)]">
                  <CardContent className="pt-6 text-[#dff5ff]">{point}</CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </SectionWrapper>

        <SectionWrapper id="experience" title="Experience">
          <div className="relative space-y-6 before:absolute before:left-3 before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-[#233246]">
            {experiences.map((exp) => (
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
            {projects.map((project) => (
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
            {skillGroups.map((group) => (
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
            {education.map((itemValue) => (
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
                  <a href="mailto:hrmughal75@gmail.com" className="hover:text-white">
                    hrmughal75@gmail.com
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[#7dd3fc]" />
                  <a href="tel:+923230701210" className="hover:text-white">
                    +92 323 0701210
                  </a>
                </p>
                <p>
                  <Link
                    href="https://www.linkedin.com/in/welcometohassanraza/"
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
                    Send Message
                  </Button>
                  {isSubmitSuccessful ? (
                    <p className="text-xs text-[#7dd3fc]">Message validated successfully. Ready for backend integration.</p>
                  ) : null}
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
          animate={{ y: [0, -8, 0], rotate: [0, -2, 2, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="pointer-events-none absolute right-0 bottom-0 h-20 w-20 rounded-full bg-[#25d366]/25 blur-2xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.45, 0.8, 0.45] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="pointer-events-none absolute -top-2 left-2 h-2.5 w-2.5 rounded-full bg-[#7dd3fc]"
            animate={{ x: [0, 8, -2, 0], y: [0, -10, -2, 0], scale: [1, 1.25, 0.95, 1] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="pointer-events-none absolute top-6 -left-3 h-1.5 w-1.5 rounded-full bg-[#dcfce7]"
            animate={{ x: [0, -5, 3, 0], y: [0, 10, -6, 0], opacity: [0.45, 1, 0.45] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="pointer-events-none absolute right-0 bottom-[calc(100%+0.9rem)] w-[220px] sm:w-[250px]"
            animate={{
              opacity: isWhatsappOpen ? 1 : 0.94,
              y: isWhatsappOpen ? 0 : 6,
              scale: isWhatsappOpen ? 1 : 0.98,
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#091018]/90 p-3.5 shadow-[0_20px_60px_rgba(0,0,0,0.42)] backdrop-blur-xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(125,211,252,0.16),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(37,211,102,0.14),transparent_30%)]" />
              <div className="relative">
                <p className="text-[10px] font-semibold tracking-[0.28em] text-[#86d5ff] uppercase">Whatsapp</p>
                <motion.p
                  key={whatsAppPromptIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22 }}
                  className="mt-1.5 text-sm font-semibold text-[#f5fbff]"
                >
                  {whatsAppPrompts[whatsAppPromptIndex]}
                </motion.p>
                <p className="mt-1 text-xs text-[#a9c3d9]">Tap the bubble and say hi. I actually reply.</p>
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
            whileHover={{ scale: 1.08, rotate: -6 }}
            whileTap={{ scale: 0.96, rotate: 0 }}
            className="group relative flex h-[72px] w-[72px] items-center justify-center overflow-hidden rounded-[26px] border border-white/12 bg-[linear-gradient(160deg,rgba(37,211,102,0.95)_0%,rgba(17,94,89,0.92)_100%)] shadow-[0_18px_45px_rgba(10,16,28,0.5)]"
          >
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.24),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.08),transparent_62%)]" />
            <motion.span
              className="absolute inset-[6px] rounded-[20px] border border-white/20"
              animate={{ opacity: [0.45, 0.95, 0.45], scale: [0.98, 1.02, 0.98] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.span
              className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border border-white/15 bg-[#0a0f16] text-[10px] font-bold text-[#86d5ff]"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              Hi
            </motion.span>
            <motion.span
              className="absolute inset-0 rounded-[26px] bg-[#25d366]/20"
              animate={{ scale: [1, 1.18, 1], opacity: [0.18, 0, 0.18] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
            />
            <FaWhatsapp className="relative z-10 h-9 w-9 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover:scale-110" />
          </motion.a>
        </motion.div>
      </motion.div>

      <footer className="border-t border-[#233246]/70 py-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-4 text-sm text-[#89a4bf] sm:flex-row sm:px-6 lg:px-8">
          <div className="text-center sm:text-left">
            <p>© {year} Hassan Raza. All rights reserved.</p>
            <p className="mt-1 text-xs text-[#6f8aa5]">Built by Hassan Raza, powered by chai, curiosity, and controlled chaos.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="mailto:hrmughal75@gmail.com" className="hover:text-[#e0f2fe]">
              Email
            </Link>
            <Link href="https://www.linkedin.com/in/welcometohassanraza/" target="_blank" className="hover:text-[#e0f2fe]">
              LinkedIn
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
