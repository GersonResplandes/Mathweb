// Google Analytics 4 (GA4) Configuration
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

// Initialize Google Analytics
export const initGA = (measurementId: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", measurementId, {
      page_title: "MathWeb - Calculadoras Matemáticas",
      page_location: window.location.href,
    });
  }
};

// Track page views
export const trackPageView = (page: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "page_view", {
      page_title: page,
      page_location: window.location.href,
    });
  }
};

// Track calculator usage
export const trackCalculatorUsage = (calculator: string, action: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "calculator_usage", {
      calculator_name: calculator,
      action: action,
      event_category: "Calculator",
      event_label: `${calculator} - ${action}`,
    });
  }
};

// Track errors
export const trackError = (error: string, calculator?: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "exception", {
      description: error,
      fatal: false,
      calculator: calculator || "unknown",
    });
  }
};

// Track PWA installation
export const trackPWAInstall = () => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "pwa_install", {
      event_category: "PWA",
      event_label: "Install",
    });
  }
};

// Track search queries (for future search feature)
export const trackSearch = (query: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "search", {
      search_term: query,
      event_category: "Search",
    });
  }
};

// Track user engagement
export const trackEngagement = (action: string, value?: number) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "user_engagement", {
      event_category: "Engagement",
      event_label: action,
      value: value || 1,
    });
  }
};
