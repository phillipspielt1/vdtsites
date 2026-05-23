// Per-site content shape and defaults for vdtsites.com.
// The inline-editor library (lib/inline-editor + components/inline-editor)
// imports `SiteContent` and `defaultContent` from this file. To duplicate the
// editor to another site, copy the inline-editor folders verbatim and write
// a new version of THIS file for the receiving project.

export type ServiceItem = {
  iconKey: "globe" | "user" | "shopping-bag" | "zap" | "layers";
  label: string;
  desc: string;
};

export type ShowcaseItem = {
  key: string;
  href: string;
  tag: string;
  label: string;
  description: string;
};

export type StatItem = { value: string; label: string };

export type LocalPoint = {
  iconKey: "map-pin" | "users" | "message-circle";
  label: string;
  sub: string;
};

export type ProcessStep = { step: string; title: string; desc: string };

export type CtaItem = { label: string; href: string; primary: boolean };

// Keys recognised by page.tsx's section renderer map. Order in
// home.sectionOrder controls page layout (admin can reorder via the editor).
export const SECTION_KEYS = [
  "hero",
  "marquee",
  "showcase",
  "valueProp",
  "services",
  "local",
  "about",
  "process",
  "cta",
] as const;
export type SectionKey = (typeof SECTION_KEYS)[number];

export type SiteContent = {
  brand: {
    name: string;
    tagline: string;
    location: string;
  };
  home: {
    hero: {
      badge: string;
      titlePart1: string;
      titlePart2: string;
      subtitle: string;
      ctas: CtaItem[];
      stats: StatItem[];
    };
    marquee: string[];
    showcase: {
      eyebrow: string;
      title: string;
      subtitle: string;
      viewLabel: string;
      items: ShowcaseItem[];
    };
    valueProp: {
      badge: string;
      titlePart1: string;
      titlePart2: string;
      body: string;
      ctaLabel: string;
      caption: string;
    };
    services: {
      eyebrow: string;
      title: string;
      items: ServiceItem[];
    };
    local: {
      eyebrow: string;
      titlePart1: string;
      titlePart2: string;
      body: string;
      points: LocalPoint[];
    };
    about: {
      eyebrow: string;
      titlePart1: string;
      titlePart2: string;
      paragraphs: string[];
      bullets: string[];
      ctaLabel: string;
      card: {
        name: string;
        sub: string;
        tags: string[];
      };
    };
    process: {
      eyebrow: string;
      titlePart1: string;
      titlePart2: string;
      steps: ProcessStep[];
    };
    cta: {
      title: string;
      subtitle: string;
      buttonLabel: string;
    };
    // Section render order. Admin reorders via the editor.
    sectionOrder: SectionKey[];
  };
  footer: {
    name: string;
    sub: string;
  };
};

export const defaultContent: SiteContent = {
  brand: {
    name: "Van Duist & Treitel",
    tagline: "Web Design",
    location: "Nanaimo, BC",
  },
  home: {
    hero: {
      badge: "Student rates · Professional results",
      titlePart1: "Websites built",
      titlePart2: "to impress.",
      subtitle:
        "Custom websites for small businesses, portfolios, and online stores - at a fraction of agency prices, without the compromise.",
      ctas: [
        { label: "Get a free quote", href: "/contact",   primary: true  },
        { label: "See the work",     href: "#showcase",  primary: false },
      ],
      stats: [
        { value: "5+", label: "Design styles" },
        { value: "~50%", label: "Less than agencies" },
        { value: "100%", label: "Custom code" },
      ],
    },
    marquee: [
      "Minimal",
      "Playful",
      "Professional",
      "Bold & Dark",
      "E-Commerce",
      "Trades & Services",
      "Responsive",
      "Fast",
      "Modern",
      "Custom",
      "Clean",
      "Strategic",
    ],
    showcase: {
      eyebrow: "Design Showcase",
      title: "Every business is different.",
      subtitle:
        "Five fully built demo sites - each a completely different style. Click any to explore the full layout.",
      viewLabel: "View full demo →",
      items: [
        { key: "minimal",      href: "/showcase/minimal",      tag: "Photography · Portfolio",            label: "Minimal",            description: "Editorial space and quiet confidence. Perfect for creatives whose work does the talking." },
        { key: "playful",      href: "/showcase/playful",      tag: "Café · Food & Drink",                 label: "Playful",            description: "Bold colour and personality. Brands that want to be remembered." },
        { key: "professional", href: "/showcase/professional", tag: "Finance · Consulting",                label: "Professional",       description: "Structured, trustworthy, polished. Authority in every pixel." },
        { key: "bold",         href: "/showcase/bold",         tag: "Events · Luxury",                     label: "Bold & Dark",        description: "Cinematic and dramatic. For brands that leave a lasting mark." },
        { key: "ecommerce",    href: "/showcase/ecommerce",    tag: "Retail · Artisan Goods",              label: "E-Commerce",         description: "Warm, story-driven, and built to convert. Products showcased beautifully." },
        { key: "trades",       href: "/showcase/trades",       tag: "Home Services · Local Business",      label: "Trades & Services",  description: "Conversion-first for local trades. Built to get calls, quotes, and bookings." },
      ],
    },
    valueProp: {
      badge: "VIU Student · Vancouver Island, BC",
      titlePart1: "Agency quality.",
      titlePart2: "Student pricing.",
      body:
        "Because we're students, our overhead is near zero - which means we pass those savings directly to you. You get a professional, custom-built website for a fraction of what a studio charges.",
      ctaLabel: "Get a quote",
      caption: "Every project gets a custom quote - no surprises.",
    },
    services: {
      eyebrow: "What We Build",
      title: "One builder, every need.",
      items: [
        { iconKey: "globe",        label: "Landing Pages",       desc: "Convert visitors into customers with a focused, high-impact single page." },
        { iconKey: "user",         label: "Portfolios",          desc: "Showcase your work with a site built to impress the right people." },
        { iconKey: "shopping-bag", label: "Online Stores",       desc: "Sell products with a smooth, beautiful shopping experience." },
        { iconKey: "zap",          label: "Small Business Sites", desc: "Everything your business needs online - found, trusted, and chosen." },
        { iconKey: "layers",       label: "Custom Builds",       desc: "Got something unique in mind? Let's figure it out together." },
      ],
    },
    local: {
      eyebrow: "Who We Are",
      titlePart1: "Two people.",
      titlePart2: "No nonsense.",
      body:
        "We're a two-person operation based right here in Nanaimo, BC - not an agency, not a faceless online shop. Just two people who genuinely care about the work and the businesses behind it. We keep things straight with you, communicate clearly, and we're always happy to have a conversation before you commit to anything. No pressure, no pitch - just a chat.",
      points: [
        { iconKey: "map-pin",         label: "Nanaimo, BC",          sub: "Locally based, locally invested" },
        { iconKey: "users",           label: "Two-person team",      sub: "You work with us, not past us" },
        { iconKey: "message-circle",  label: "Always happy to chat", sub: "Reach out any time - no obligation" },
      ],
    },
    about: {
      eyebrow: "About Us",
      titlePart1: "Young, driven,",
      titlePart2: "built for this.",
      paragraphs: [
        "We're Van Duist & Treitel - two VIU students based in Nanaimo, BC, combining a genuine passion for design with a business-minded approach to every project.",
        "Being students means low overhead and big motivation. Every site we build is crafted to not just look good, but to actually work for your goals.",
      ],
      bullets: [
        "No agency markup - you pay for work, not overhead",
        "Fast turnaround - most projects done in 1–3 weeks",
        "Direct communication - you work with us, not a middleman",
      ],
      ctaLabel: "Let's work together",
      card: {
        name: "Van Duist & Treitel",
        sub: "VIU · Nanaimo, BC",
        tags: [
          "International Business + Marketing",
          "Two-person team · Web Design",
        ],
      },
    },
    process: {
      eyebrow: "How It Works",
      titlePart1: "Simple process.",
      titlePart2: "Great results.",
      steps: [
        { step: "01", title: "Discovery",       desc: "We chat about your business, goals, and vision. No jargon - just a real conversation about what you need." },
        { step: "02", title: "Design & Build",  desc: "We design and build from scratch, checking in regularly. You see progress and can give feedback throughout." },
        { step: "03", title: "Launch",          desc: "Your site goes live. We make sure everything runs perfectly and walk you through managing it yourself." },
      ],
    },
    cta: {
      title: "Ready to get started?",
      subtitle: "Tell us about your project. We'll reply within 24 hours with a free quote.",
      buttonLabel: "Get in touch",
    },
    sectionOrder: ["hero", "marquee", "showcase", "valueProp", "services", "local", "about", "process", "cta"],
  },
  footer: {
    name: "Van Duist & Treitel",
    sub: "Web Design · Nanaimo, BC",
  },
};
