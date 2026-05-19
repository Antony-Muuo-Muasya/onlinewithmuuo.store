import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/store-context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CheckoutOverlay } from "@/components/checkout-overlay";
import { InteractiveCanvas } from "@/components/interactive-canvas";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OnlineWithMuuo Storefront | How I Made My First $100 Online (Step-by-Step)",
  description: "Get the exact step-by-step blueprint to land micro-gigs and make your first $100 online. Secure freelancing guides, profile checklists, and proposal templates by OnlineWithMuuo.",
  keywords: ["Make Money Online", "Freelancing PDF", "First $100 Online", "Fiverr Blueprint", "Upwork Proposal Templates", "OnlineWithMuuo", "Remote Work Guide"],
  authors: [{ name: "OnlineWithMuuo" }],
  openGraph: {
    title: "OnlineWithMuuo Storefront - How I Made My First $100 Online",
    description: "Battle-tested proposal templates and step-by-step checklists to make your first $100 online working from anywhere.",
    url: "https://onlinewithmuuo.store",
    siteName: "OnlineWithMuuo Storefront",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OnlineWithMuuo Storefront | How I Made My First $100 Online",
    description: "Actionable checklists and pitch scripts to land freelance micro-tasks and earn your first remote income.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200">
        <StoreProvider>
          <Navbar />
          <InteractiveCanvas />
          <main className="flex-1 flex flex-col pt-16">{children}</main>
          <Footer />
          <CheckoutOverlay />
        </StoreProvider>
      </body>
    </html>
  );
}
