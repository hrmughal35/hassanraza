"use client";

import Link from "next/link";
import { type FormEvent, useEffect, useState } from "react";
import type { EducationItem, ExperienceItem, NavLink, PortfolioContent, ProjectItem, SkillGroup } from "@/components/portfolio/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FRONTEND_ADMIN_CREDENTIALS,
  getDefaultPortfolioContent,
  isFrontendAdminAuthenticated,
  readPortfolioContentFromStorage,
  resetPortfolioContentStorage,
  setFrontendAdminAuthenticated,
  writePortfolioContentToStorage,
} from "@/lib/portfolio-admin";

type LoginForm = {
  username: string;
  password: string;
};

const emptyExperience: ExperienceItem = {
  role: "",
  company: "",
  period: "",
  achievements: [""],
};

const emptyProject: ProjectItem = {
  title: "",
  description: "",
  tech: [""],
  impact: "",
};

const emptySkillGroup: SkillGroup = {
  title: "",
  skills: [""],
};

const emptyEducation: EducationItem = {
  title: "",
  subtitle: "",
  period: "",
};

const emptyNavLink: NavLink = {
  label: "",
  href: "#",
};

function toLines(value: string[]) {
  return value.join("\n");
}

function fromLines(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function toCommaList(value: string[]) {
  return value.join(", ");
}

function fromCommaList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function AdminPage() {
  const [isReady, setIsReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState<LoginForm>({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [content, setContent] = useState<PortfolioContent>(getDefaultPortfolioContent());

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setIsAuthenticated(isFrontendAdminAuthenticated());
      setContent(readPortfolioContentFromStorage());
      setIsReady(true);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      loginForm.username === FRONTEND_ADMIN_CREDENTIALS.username &&
      loginForm.password === FRONTEND_ADMIN_CREDENTIALS.password
    ) {
      setFrontendAdminAuthenticated(true);
      setIsAuthenticated(true);
      setLoginError("");
      return;
    }

    setLoginError("Incorrect frontend-only admin credentials.");
  };

  const handleSave = () => {
    writePortfolioContentToStorage(content);
    setSaveMessage("Saved locally. The portfolio homepage will reflect these changes on this browser.");
    window.setTimeout(() => setSaveMessage(""), 3000);
  };

  const handleReset = () => {
    const shouldReset = window.confirm("Reset admin changes and restore the default portfolio content?");

    if (!shouldReset) {
      return;
    }

    resetPortfolioContentStorage();
    setContent(getDefaultPortfolioContent());
    setSaveMessage("Reset to default content.");
    window.setTimeout(() => setSaveMessage(""), 3000);
  };

  const handleLogout = () => {
    setFrontendAdminAuthenticated(false);
    setIsAuthenticated(false);
    setLoginForm({ username: "", password: "" });
  };

  const updateExperience = (index: number, nextValue: ExperienceItem) => {
    setContent((current) => ({
      ...current,
      experiences: current.experiences.map((item, itemIndex) => (itemIndex === index ? nextValue : item)),
    }));
  };

  const updateProject = (index: number, nextValue: ProjectItem) => {
    setContent((current) => ({
      ...current,
      projects: current.projects.map((item, itemIndex) => (itemIndex === index ? nextValue : item)),
    }));
  };

  const updateSkillGroup = (index: number, nextValue: SkillGroup) => {
    setContent((current) => ({
      ...current,
      skillGroups: current.skillGroups.map((item, itemIndex) => (itemIndex === index ? nextValue : item)),
    }));
  };

  const updateEducation = (index: number, nextValue: EducationItem) => {
    setContent((current) => ({
      ...current,
      education: current.education.map((item, itemIndex) => (itemIndex === index ? nextValue : item)),
    }));
  };

  const updateNavLink = (index: number, nextValue: NavLink) => {
    setContent((current) => ({
      ...current,
      navLinks: current.navLinks.map((item, itemIndex) => (itemIndex === index ? nextValue : item)),
    }));
  };

  if (!isReady) {
    return <div className="min-h-screen bg-[#06080d]" />;
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#06080d] px-4 py-16 text-[#f5fbff] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Frontend Admin Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Input
                    placeholder="Username"
                    value={loginForm.username}
                    onChange={(event) => setLoginForm((current) => ({ ...current, username: event.target.value }))}
                  />
                </div>
                <div>
                  <Input
                    type="password"
                    placeholder="Password"
                    value={loginForm.password}
                    onChange={(event) => setLoginForm((current) => ({ ...current, password: event.target.value }))}
                  />
                </div>
                {loginError ? <p className="text-sm text-rose-300">{loginError}</p> : null}
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <p className="text-xs text-[#89a4bf]">
                  This is a frontend-only admin gate. It is good for personal control, not for real backend-grade
                  security.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#06080d] px-4 py-8 text-[#f5fbff] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <Card>
          <CardHeader className="gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle className="text-2xl">Portfolio Admin</CardTitle>
              <p className="mt-2 text-sm text-[#89a4bf]">
                Edit your portfolio content from the UI and save it locally in this browser.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/" target="_blank">
                <Button variant="outline">Open Portfolio</Button>
              </Link>
              <Button variant="outline" onClick={handleReset}>
                Reset Defaults
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </CardHeader>
          <CardContent>
            {saveMessage ? <p className="text-sm text-[#7dd3fc]">{saveMessage}</p> : null}
          </CardContent>
        </Card>

        <div className="grid gap-6 xl:grid-cols-2">
          <Card>
            <CardHeader className="gap-4 lg:flex-row lg:items-center lg:justify-between">
              <CardTitle>Navigation Links</CardTitle>
              <Button
                variant="outline"
                onClick={() =>
                  setContent((current) => ({
                    ...current,
                    navLinks: [...current.navLinks, emptyNavLink],
                  }))
                }
              >
                Add Link
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {content.navLinks.map((itemValue, index) => (
                <div key={`${itemValue.label}-${index}`} className="rounded-2xl border border-white/10 p-4">
                  <div className="mb-3 flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setContent((current) => ({
                          ...current,
                          navLinks: current.navLinks.filter((_, itemIndex) => itemIndex !== index),
                        }))
                      }
                    >
                      Remove
                    </Button>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <Input
                      placeholder="Label"
                      value={itemValue.label}
                      onChange={(event) => updateNavLink(index, { ...itemValue, label: event.target.value })}
                    />
                    <Input
                      placeholder="Href (example: #projects)"
                      value={itemValue.href}
                      onChange={(event) => updateNavLink(index, { ...itemValue, href: event.target.value })}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Eyebrow"
                value={content.hero.eyebrow}
                onChange={(event) =>
                  setContent((current) => ({
                    ...current,
                    hero: { ...current.hero, eyebrow: event.target.value },
                  }))
                }
              />
              <Input
                placeholder="Hero title"
                value={content.hero.title}
                onChange={(event) =>
                  setContent((current) => ({
                    ...current,
                    hero: { ...current.hero, title: event.target.value },
                  }))
                }
              />
              <Textarea
                placeholder="Hero description"
                value={content.hero.description}
                onChange={(event) =>
                  setContent((current) => ({
                    ...current,
                    hero: { ...current.hero, description: event.target.value },
                  }))
                }
              />
              <Input
                placeholder="Keywords separated by commas"
                value={toCommaList(content.hero.keywords)}
                onChange={(event) =>
                  setContent((current) => ({
                    ...current,
                    hero: { ...current.hero, keywords: fromCommaList(event.target.value) },
                  }))
                }
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>About, Contact, Footer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="About subtitle"
                value={content.about.subtitle}
                onChange={(event) =>
                  setContent((current) => ({
                    ...current,
                    about: { ...current.about, subtitle: event.target.value },
                  }))
                }
              />
              <Textarea
                placeholder="About highlights, one per line"
                value={toLines(content.about.highlights)}
                onChange={(event) =>
                  setContent((current) => ({
                    ...current,
                    about: { ...current.about, highlights: fromLines(event.target.value) },
                  }))
                }
              />
              <Input
                placeholder="Email"
                value={content.contact.email}
                onChange={(event) =>
                  setContent((current) => ({
                    ...current,
                    contact: { ...current.contact, email: event.target.value },
                  }))
                }
              />
              <Input
                placeholder="Phone"
                value={content.contact.phone}
                onChange={(event) =>
                  setContent((current) => ({
                    ...current,
                    contact: { ...current.contact, phone: event.target.value },
                  }))
                }
              />
              <Input
                placeholder="WhatsApp number without spaces"
                value={content.contact.whatsappNumber}
                onChange={(event) =>
                  setContent((current) => ({
                    ...current,
                    contact: { ...current.contact, whatsappNumber: event.target.value },
                  }))
                }
              />
              <Input
                placeholder="LinkedIn URL"
                value={content.contact.linkedin}
                onChange={(event) =>
                  setContent((current) => ({
                    ...current,
                    contact: { ...current.contact, linkedin: event.target.value },
                  }))
                }
              />
              <Textarea
                placeholder="Footer tagline"
                value={content.footer.tagline}
                onChange={(event) =>
                  setContent((current) => ({
                    ...current,
                    footer: { tagline: event.target.value },
                  }))
                }
              />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="gap-4 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle>Experience</CardTitle>
            <Button
              variant="outline"
              onClick={() =>
                setContent((current) => ({
                  ...current,
                  experiences: [...current.experiences, emptyExperience],
                }))
              }
            >
              Add Experience
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {content.experiences.map((experience, index) => (
              <div key={`${experience.role}-${index}`} className="rounded-2xl border border-white/10 p-4">
                <div className="mb-3 flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setContent((current) => ({
                        ...current,
                        experiences: current.experiences.filter((_, itemIndex) => itemIndex !== index),
                      }))
                    }
                  >
                    Remove
                  </Button>
                </div>
                <div className="grid gap-3 md:grid-cols-3">
                  <Input
                    placeholder="Role"
                    value={experience.role}
                    onChange={(event) => updateExperience(index, { ...experience, role: event.target.value })}
                  />
                  <Input
                    placeholder="Company"
                    value={experience.company}
                    onChange={(event) => updateExperience(index, { ...experience, company: event.target.value })}
                  />
                  <Input
                    placeholder="Period"
                    value={experience.period}
                    onChange={(event) => updateExperience(index, { ...experience, period: event.target.value })}
                  />
                </div>
                <Textarea
                  className="mt-3"
                  placeholder="Achievements, one per line"
                  value={toLines(experience.achievements)}
                  onChange={(event) =>
                    updateExperience(index, { ...experience, achievements: fromLines(event.target.value) })
                  }
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="gap-4 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle>Projects</CardTitle>
            <Button
              variant="outline"
              onClick={() =>
                setContent((current) => ({
                  ...current,
                  projects: [...current.projects, emptyProject],
                }))
              }
            >
              Add Project
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {content.projects.map((project, index) => (
              <div key={`${project.title}-${index}`} className="rounded-2xl border border-white/10 p-4">
                <div className="mb-3 flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setContent((current) => ({
                        ...current,
                        projects: current.projects.filter((_, itemIndex) => itemIndex !== index),
                      }))
                    }
                  >
                    Remove
                  </Button>
                </div>
                <div className="space-y-3">
                  <Input
                    placeholder="Project title"
                    value={project.title}
                    onChange={(event) => updateProject(index, { ...project, title: event.target.value })}
                  />
                  <Textarea
                    placeholder="Project description"
                    value={project.description}
                    onChange={(event) => updateProject(index, { ...project, description: event.target.value })}
                  />
                  <Input
                    placeholder="Tech stack separated by commas"
                    value={toCommaList(project.tech)}
                    onChange={(event) => updateProject(index, { ...project, tech: fromCommaList(event.target.value) })}
                  />
                  <Textarea
                    placeholder="Project impact"
                    value={project.impact}
                    onChange={(event) => updateProject(index, { ...project, impact: event.target.value })}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid gap-6 xl:grid-cols-2">
          <Card>
            <CardHeader className="gap-4 lg:flex-row lg:items-center lg:justify-between">
              <CardTitle>Skills</CardTitle>
              <Button
                variant="outline"
                onClick={() =>
                  setContent((current) => ({
                    ...current,
                    skillGroups: [...current.skillGroups, emptySkillGroup],
                  }))
                }
              >
                Add Skill Group
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {content.skillGroups.map((group, index) => (
                <div key={`${group.title}-${index}`} className="rounded-2xl border border-white/10 p-4">
                  <div className="mb-3 flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setContent((current) => ({
                          ...current,
                          skillGroups: current.skillGroups.filter((_, itemIndex) => itemIndex !== index),
                        }))
                      }
                    >
                      Remove
                    </Button>
                  </div>
                  <Input
                    placeholder="Skill group title"
                    value={group.title}
                    onChange={(event) => updateSkillGroup(index, { ...group, title: event.target.value })}
                  />
                  <Textarea
                    className="mt-3"
                    placeholder="Skills separated by commas"
                    value={toCommaList(group.skills)}
                    onChange={(event) => updateSkillGroup(index, { ...group, skills: fromCommaList(event.target.value) })}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="gap-4 lg:flex-row lg:items-center lg:justify-between">
              <CardTitle>Education</CardTitle>
              <Button
                variant="outline"
                onClick={() =>
                  setContent((current) => ({
                    ...current,
                    education: [...current.education, emptyEducation],
                  }))
                }
              >
                Add Education
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {content.education.map((itemValue, index) => (
                <div key={`${itemValue.title}-${index}`} className="rounded-2xl border border-white/10 p-4">
                  <div className="mb-3 flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setContent((current) => ({
                          ...current,
                          education: current.education.filter((_, itemIndex) => itemIndex !== index),
                        }))
                      }
                    >
                      Remove
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <Input
                      placeholder="Title"
                      value={itemValue.title}
                      onChange={(event) => updateEducation(index, { ...itemValue, title: event.target.value })}
                    />
                    <Input
                      placeholder="Subtitle"
                      value={itemValue.subtitle}
                      onChange={(event) => updateEducation(index, { ...itemValue, subtitle: event.target.value })}
                    />
                    <Input
                      placeholder="Period"
                      value={itemValue.period}
                      onChange={(event) => updateEducation(index, { ...itemValue, period: event.target.value })}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
