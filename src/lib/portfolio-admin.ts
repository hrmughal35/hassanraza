import { defaultPortfolioContent, type PortfolioContent } from "@/components/portfolio/data";

export const PORTFOLIO_CONTENT_STORAGE_KEY = "portfolio-admin-content";
export const PORTFOLIO_ADMIN_SESSION_KEY = "portfolio-admin-session";
export const PORTFOLIO_CONTENT_UPDATED_EVENT = "portfolio-content-updated";

export const FRONTEND_ADMIN_CREDENTIALS = {
  username: "hassan",
  password: "portfolio-admin",
};

function cloneDefaultContent(): PortfolioContent {
  return JSON.parse(JSON.stringify(defaultPortfolioContent)) as PortfolioContent;
}

export function getDefaultPortfolioContent(): PortfolioContent {
  return cloneDefaultContent();
}

export function readPortfolioContentFromStorage(): PortfolioContent {
  if (typeof window === "undefined") {
    return getDefaultPortfolioContent();
  }

  const raw = window.localStorage.getItem(PORTFOLIO_CONTENT_STORAGE_KEY);

  if (!raw) {
    return getDefaultPortfolioContent();
  }

  try {
    const parsed = JSON.parse(raw) as Partial<PortfolioContent>;
    const fallback = getDefaultPortfolioContent();

    return {
      ...fallback,
      ...parsed,
      hero: {
        ...fallback.hero,
        ...parsed.hero,
        keywords: Array.isArray(parsed.hero?.keywords) ? parsed.hero.keywords : fallback.hero.keywords,
      },
      about: {
        ...fallback.about,
        ...parsed.about,
        highlights: Array.isArray(parsed.about?.highlights) ? parsed.about.highlights : fallback.about.highlights,
      },
      experiences: Array.isArray(parsed.experiences) ? parsed.experiences : fallback.experiences,
      projects: Array.isArray(parsed.projects) ? parsed.projects : fallback.projects,
      skillGroups: Array.isArray(parsed.skillGroups) ? parsed.skillGroups : fallback.skillGroups,
      education: Array.isArray(parsed.education) ? parsed.education : fallback.education,
      contact: {
        ...fallback.contact,
        ...parsed.contact,
      },
      footer: {
        ...fallback.footer,
        ...parsed.footer,
      },
    };
  } catch {
    return getDefaultPortfolioContent();
  }
}

export function writePortfolioContentToStorage(content: PortfolioContent) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(PORTFOLIO_CONTENT_STORAGE_KEY, JSON.stringify(content));
  window.dispatchEvent(new Event(PORTFOLIO_CONTENT_UPDATED_EVENT));
}

export function resetPortfolioContentStorage() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(PORTFOLIO_CONTENT_STORAGE_KEY);
  window.dispatchEvent(new Event(PORTFOLIO_CONTENT_UPDATED_EVENT));
}

export function isFrontendAdminAuthenticated() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(PORTFOLIO_ADMIN_SESSION_KEY) === "true";
}

export function setFrontendAdminAuthenticated(isAuthenticated: boolean) {
  if (typeof window === "undefined") {
    return;
  }

  if (isAuthenticated) {
    window.localStorage.setItem(PORTFOLIO_ADMIN_SESSION_KEY, "true");
    return;
  }

  window.localStorage.removeItem(PORTFOLIO_ADMIN_SESSION_KEY);
}
