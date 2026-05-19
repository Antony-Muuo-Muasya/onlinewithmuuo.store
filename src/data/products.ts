export interface ProductSamplePage {
  title: string;
  subtitle: string;
  content: string;
}

export interface Product {
  id: string;
  title: string;
  snippet: string;
  description: string;
  price: number;
  rating: number;
  reviewsCount: number;
  coverImage: string;
  pages: number;
  fileSize: string;
  format: string;
  publishedYear: string;
  features: string[];
  samplePages: ProductSamplePage[];
}

export const products: Product[] = [
  {
    id: "first-100-online",
    title: "How I Made My First $100 Online: A Step-by-Step Blueprint",
    snippet: "Stop grinding without results. Follow the exact, battle-tested framework I used to secure my first $100 online working from anywhere, with zero starting capital.",
    description: "How I Made My First $100 Online is a practical, beginner-friendly digital workbook that cuts through the noise of 'get rich quick' schemes. This ebook strips away the theoretical filler and provides raw, step-by-step methods to monetize basic skills like typing, proofreading, and data management. It walks you from profile creation to securing your first paying client within 7 days.",
    price: 19,
    rating: 4.9,
    reviewsCount: 142,
    coverImage: "/images/first-100-cover.webp",
    pages: 85,
    fileSize: "8.4 MB",
    format: "Interactive PDF",
    publishedYear: "2026",
    features: [
      "The exact 3-step sequence to land your first remote micro-task.",
      "High-converting pitch templates to message clients on top platforms.",
      "Profile optimization checklists for Upwork and Fiverr to bypass the filter.",
      "5 legitimate, zero-capital digital skills you can monetize in 2 hours.",
      "Real-world case studies detailing payment processing and client handling."
    ],
    samplePages: [
      {
        title: "Chapter 1: The First Dollar Mindset Shift",
        subtitle: "Monetizing Micro-Skills on Day One",
        content: "Earning your first dollar online is not about mastering advanced coding or running complex advertising campaigns. It is about identifying the micro-skills you already possess—such as formatting documents, transcribing audio, or organizing spreadsheets—and matching them to busy professionals who value their time. Legitimate platforms like Upwork, Fiverr, and local micro-gig boards are filled with business owners willing to pay $15 to $25 for small tasks that take you less than an hour. The key is in the execution, presentation, and responsiveness of your outreach."
      },
      {
        title: "Section 3: The 72-Hour Client Acquisition Funnel",
        subtitle: "How to Secure Your First Paying Project",
        content: "To secure your first project, you must stand out from automated spam proposals. Avoid writing generic 'Dear Hiring Manager' templates. Instead, open with a direct solution to their problem: 'Hi [Name], I reviewed your document requirements and noticed a quick way to clean up the table formatting so it prints cleanly. I can complete this for you within 3 hours...' This immediate value-first positioning guarantees a 60% higher response rate. Set your starting rates slightly lower to build initial positive feedback, then scale your prices once you reach the $100 milestone."
      }
    ]
  },
  {
    id: "freelance-action-plan",
    title: "The Fast-Track Freelancing Action Plan & Templates",
    snippet: "Accelerate your path to micro-earnings. Get ready-to-use proposal templates, cold outreach scripts, and daily worksheets to systematically win gigs.",
    description: "A plug-and-play toolkit designed to accompany our main guide. If you want to skip the trial-and-error of proposal writing and client outreach, this template bundle provides the exact copy-paste scripts that land high-paying gigs across freelancing and remote work platforms.",
    price: 9,
    rating: 4.8,
    reviewsCount: 76,
    coverImage: "/images/actionplan-cover.webp",
    pages: 40,
    fileSize: "4.8 MB",
    format: "PDF & Copy Scripts",
    publishedYear: "2026",
    features: [
      "10 Copy-and-paste proposal scripts for Upwork, Fiverr, and LinkedIn.",
      "Direct outreach templates to contact small business owners on Instagram.",
      "Daily freelancing tracker to monitor application ratios and conversion metrics.",
      "Pricing strategy calculator to maximize earnings per contract.",
      "Bonus: List of 50 remote platforms recruiting active international freelancers."
    ],
    samplePages: [
      {
        title: "Template 2: The Cold Email Project Pitch",
        subtitle: "Securing Direct Contracts via Email",
        content: "Subject: Quick improvement for [Company Name]'s blog layout\n\nHi [First Name],\n\nI was reading through your latest articles on [Topic] and noticed that three of the image links appear to have formatting issues on mobile screens, making the text overlap. I took the liberty of resizing one of your banners as a quick preview of how it could look. I am an experienced remote assistant and would love to clean up the rest of your formatting this week for a flat rate of $40. You can review my sample draft attached. Let me know if you would like me to get started!\n\nBest regards,\n[Your Name]"
      },
      {
        title: "Worksheet 4: The Daily Outreach Blueprint",
        subtitle: "Compounding Gigs for Consistent Growth",
        content: "Consistency beats luck. To guarantee an online income stream, commit to sending exactly 5 high-quality, customized proposals every single day before 10:00 AM. Do not copy-paste standard paragraphs. Modify the first sentence to address the unique job posting description. Track your metrics: Out of 35 weekly proposals, you should aim for 5 responses, leading to at least 1 closed client. Compounding just one $30 micro-gig per week lands you over $120 monthly with ease."
      }
    ]
  },
  {
    id: "complete-first-100-bundle",
    title: "The Complete First $100 Online Bundle (Ebook + Toolkit)",
    snippet: "Save 30% on the ultimate online income toolkit. Get the main step-by-step guidebook, the Fast-Track Freelancing Action Plan, and priority email support.",
    description: "Get everything you need to start earning online in one complete, discount-packed suite. This bundle brings together the core step-by-step workbook 'How I Made My First $100 Online' and the highly practical 'Freelancing Action Plan & Pitch Templates' to give you the ultimate unfair advantage.",
    price: 24,
    rating: 5.0,
    reviewsCount: 198,
    coverImage: "/images/bundle-cover.webp",
    pages: 125,
    fileSize: "12.8 MB",
    format: "Interactive PDF Bundle",
    publishedYear: "2026",
    features: [
      "Full copy of 'How I Made My First $100 Online' (85 Pages).",
      "Full copy of 'The Fast-Track Freelancing Action Plan' (40 Pages).",
      "Interactive Google Sheets tracking dashboard for freelance applications.",
      "VIP priority email support: Direct feedback on your first 3 proposals.",
      "Lifetime free revisions as platforms adjust onboarding rules."
    ],
    samplePages: [
      {
        title: "Bundle Guide: Launching Your Online Career",
        subtitle: "Maximizing the Value of this Toolkit",
        content: "Welcome to the Complete First $100 Online Bundle. By combining the theoretical frameworks from our main guidebook with the real-world scripts in the action plan, you are cutting your learning curve by over 90%. Do not read these materials passively. Choose one micro-skill today, optimize one profile tonight, and send your first three personalized proposals tomorrow morning. The direct support included in this bundle allows you to email us your drafts for review before submitting them to clients."
      },
      {
        title: "Bonus Chapter: Transitioning past $100",
        subtitle: "Scaling from Freelancer to Agency Owner",
        content: "Once you achieve your first $100 online, the game changes. You are no longer trying to prove that online work is possible; you have concrete proof of concept. The next phase is scaling. Instead of trading hours for dollars, start batching your services or offering weekly retainer support. A client who pays you $20 for a one-off cleanup will gladly pay $80 monthly to have you manage their weekly formatting. By securing just 3 retainers, you secure consistent, predictable digital income."
      }
    ]
  }
];
