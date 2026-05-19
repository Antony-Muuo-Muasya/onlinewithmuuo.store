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
    coverImage: "Emerald Cyber",
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
  }
];
