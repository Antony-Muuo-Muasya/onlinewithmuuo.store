"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useStore } from "@/context/store-context";
import { Product, ProductSamplePage } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { 
  Upload, Sparkles, Plus, Trash2, BookOpen, 
  ArrowRight, CheckCircle2, DollarSign, FileText, 
  AlertCircle, Star, Settings, LayoutGrid, PlusCircle,
  FolderLock, Eye
} from "lucide-react";

const COVER_GRADIENTS = [
  { name: "Emerald Cyber", class: "from-slate-950 via-emerald-950 to-slate-950 border-emerald-500/30", color: "#10b981", accent: "text-emerald-400" },
  { name: "Midnight Nebula", class: "from-slate-950 via-indigo-950 to-slate-950 border-indigo-500/30", color: "#6366f1", accent: "text-indigo-400" },
  { name: "Crimson Gold", class: "from-slate-950 via-rose-950 to-slate-950 border-rose-500/30", color: "#f43f5e", accent: "text-rose-400" },
  { name: "Sunset Cyber", class: "from-slate-950 via-amber-950 to-slate-950 border-amber-500/30", color: "#f59e0b", accent: "text-amber-400" },
];

export default function AdminPage() {
  const router = useRouter();
  const { products, uploadProduct, deleteProduct } = useStore();
  const [activeTab, setActiveTab] = useState<"inventory" | "upload">("inventory");

  // --- FORM STATE ---
  const [title, setTitle] = useState("Unlocking Micro-Task Income: A Complete Guide");
  const [snippet, setSnippet] = useState("A comprehensive blueprint showing absolute beginners how to secure remote micro-gigs and establish recurring online income.");
  const [description, setDescription] = useState("Unlocking Micro-Task Income strips away the fluff. This interactive PDF manual is written for absolute beginners who want to trade basic skills like copyediting, data sorting, or document cleanup for remote income. It contains copy-paste outreach pitches, profile setup hacks, and dynamic worksheets to get you fully set up and ready to earn within 48 hours.");
  const [price, setPrice] = useState(14);
  const [pages, setPages] = useState(55);
  const [fileSize, setFileSize] = useState("6.2 MB");
  const [format, setFormat] = useState("Interactive PDF");
  const [coverGradientIndex, setCoverGradientIndex] = useState(0);

  // Features list
  const [features, setFeatures] = useState<string[]>([
    "The 48-Hour Micro-Gig Launch Sequence.",
    "5 Plug-and-play pitch templates for Upwork.",
    "Interactive pricing calculator sheets.",
  ]);
  const [newFeature, setNewFeature] = useState("");

  // Sample pages
  const [samplePages, setSamplePages] = useState<ProductSamplePage[]>([
    {
      title: "Chapter 1: The Micro-Task Economy",
      subtitle: "Day 1 Foundations",
      content: "The easiest way to start earning online is to stop thinking about giant enterprise projects and focus on micro-tasks. A micro-task is a small, specific job that takes a business owner less than an hour to perform, but which they are willing to delegate for $15 to $30. These include clean-ups of Excel spreadsheets, transcribing brief voice memos, formatting landing page text, or renaming media folders. By offering rapid turnarounds, you create high-velocity feedback loops that attract more clients."
    },
    {
      title: "Section 2: High-Converting Proposals",
      subtitle: "Writing Pitches That Win Gigs",
      content: "When sending a proposal, never write a wall of text detailing your resume. Clients do not care about your backstory; they care about their problem. Begin your message by acknowledging their exact issue and showing you already have a solution. For example: 'Hi [Name], I noticed your formatting is slightly off on mobile screens. I've already resized one image to demonstrate how we can fix this in under an hour...' This value-first approach places you ahead of 99% of other proposals."
    }
  ]);

  // Upload Simulation state
  const [dragActive, setDragActive] = useState(false);
  const [pdfFileName, setPdfFileName] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Refs for animations
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const bookMockupRef = useRef<HTMLDivElement>(null);
  const tabsContentRef = useRef<HTMLDivElement>(null);
  const successModalRef = useRef<HTMLDivElement>(null);

  // GSAP Entrance Animations
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      ".animate-admin-header",
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8 }
    );

    tl.fromTo(
      ".admin-tab-btn",
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1 },
      "-=0.5"
    );

    tl.fromTo(
      tabsContentRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.3"
    );
  }, { scope: pageContainerRef });

  // Floating Mockup GSAP loop (when Upload Tab is loaded)
  useGSAP(() => {
    if (activeTab !== "upload") return;
    
    // Slight float loop
    gsap.fromTo(
      bookMockupRef.current,
      { y: 0, rotationY: 0, rotationX: 0 },
      {
        y: -12,
        rotationY: 4,
        rotationX: 2,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      }
    );
  }, { scope: pageContainerRef, dependencies: [activeTab] });

  // Tab change visual transition
  const handleTabChange = (tab: "inventory" | "upload") => {
    if (tab === activeTab) return;

    // Fade out first
    gsap.to(tabsContentRef.current, {
      opacity: 0,
      y: 15,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        setActiveTab(tab);
        // Slide / Fade in new tab
        gsap.fromTo(
          tabsContentRef.current,
          { opacity: 0, y: -15 },
          { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }
        );
      }
    });
  };

  // Add Ebook feature
  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature("");
    }
  };

  const handleRemoveFeature = (idx: number) => {
    setFeatures(features.filter((_, i) => i !== idx));
  };

  const handleSamplePageChange = (idx: number, field: keyof ProductSamplePage, value: string) => {
    const updated = [...samplePages];
    updated[idx][field] = value;
    setSamplePages(updated);
  };

  // Drag and Drop files
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf") {
        simulateUpload(file.name, file.size);
      } else {
        alert("Please drop a valid PDF file.");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      simulateUpload(file.name, file.size);
    }
  };

  const simulateUpload = (name: string, size: number) => {
    setIsUploading(true);
    setPdfFileName(name);
    
    const mbSize = (size / (1024 * 1024)).toFixed(1);
    setFileSize(`${mbSize} MB`);

    const progressObj = { value: 0 };
    gsap.to(progressObj, {
      value: 100,
      duration: 2.5,
      ease: "power1.inOut",
      onUpdate: () => {
        setUploadProgress(Math.floor(progressObj.value));
      },
      onComplete: () => {
        setIsUploading(false);
      }
    });
  };

  // Publish dynamic product to context
  const handlePublish = () => {
    if (!title) return alert("Please specify an ebook title.");
    if (features.length === 0) return alert("Please specify at least one feature.");

    const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const newProduct: Product = {
      id,
      title,
      snippet,
      description,
      price: Number(price),
      rating: 5.0,
      reviewsCount: 1,
      coverImage: COVER_GRADIENTS[coverGradientIndex].name,
      pages: Number(pages),
      fileSize,
      format,
      publishedYear: new Date().getFullYear().toString(),
      features,
      samplePages
    };

    uploadProduct(newProduct);
    setIsSuccess(true);

    setTimeout(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        successModalRef.current,
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5 }
      );
    }, 50);
  };

  // Dynamic Row collapse on deletion
  const handleDeleteRow = (productId: string) => {
    const rowSelector = `#product-row-${productId}`;
    
    // Row collapse sequence with GSAP before updating core state
    const tl = gsap.timeline({
      onComplete: () => {
        deleteProduct(productId);
      }
    });

    tl.to(rowSelector, {
      backgroundColor: "rgba(239, 68, 68, 0.15)",
      borderColor: "rgba(239, 68, 68, 0.3)",
      x: -15,
      opacity: 0.6,
      duration: 0.25,
      ease: "power2.out"
    });

    tl.to(rowSelector, {
      height: 0,
      paddingTop: 0,
      paddingBottom: 0,
      marginTop: 0,
      marginBottom: 0,
      opacity: 0,
      overflow: "hidden",
      duration: 0.35,
      ease: "power2.inOut"
    });
  };

  const activeGradient = COVER_GRADIENTS[coverGradientIndex];

  return (
    <div ref={pageContainerRef} className="min-h-screen bg-slate-950 text-slate-100 pb-20 relative overflow-hidden">
      {/* Dynamic Background Blurs */}
      <div className="absolute top-10 left-10 w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-indigo-500/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        
        {/* Header */}
        <div className="animate-admin-header space-y-4 mb-10 text-center sm:text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-slate-900 pb-8">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase tracking-widest">
              <FolderLock className="h-3 w-3" /> Secure Admin Center
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight mt-3">
              Storefront <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-indigo-400">Control Panel</span>
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
              Add new digital guides, upload verified PDF assets, specify free pre-sales samples, or remove catalog items.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/80 self-center sm:self-auto">
            <button
              onClick={() => handleTabChange("inventory")}
              className={`admin-tab-btn px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "inventory"
                  ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/10"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <LayoutGrid className="h-4 w-4" /> Ebook Catalog
            </button>
            <button
              onClick={() => handleTabChange("upload")}
              className={`admin-tab-btn px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "upload"
                  ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/10"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Upload className="h-4 w-4" /> Upload New PDF
            </button>
          </div>
        </div>

        {/* --- TABS SWITCHER CONTENT --- */}
        <div ref={tabsContentRef}>
          
          {/* TAB 1: PRODUCT CATALOG INVENTORY TABLE */}
          {activeTab === "inventory" && (
            <div className="space-y-6">
              
              {/* Stats overview boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { label: "Active PDF Guides", val: products.length, desc: "Ready for digital purchase." },
                  { label: "Pre-sales Look Inside", val: "Active (2 pgs)", desc: "Free sample chapters loaded." },
                  { label: "Simulator Currency", val: "USD ($)", desc: "Checkout processes via Stripe mock." }
                ].map((stat, i) => (
                  <div key={i} className="glass-panel border-slate-800 rounded-2xl p-5 flex flex-col space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">{stat.label}</span>
                    <span className="text-2xl font-black text-white">{stat.val}</span>
                    <span className="text-[10px] text-slate-400 mt-1">{stat.desc}</span>
                  </div>
                ))}
              </div>

              {/* Table wrapper */}
              <div className="glass-panel border-slate-800 rounded-3xl overflow-hidden shadow-xl">
                <div className="p-6 border-b border-slate-900 bg-slate-900/30 flex items-center justify-between">
                  <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                    <Settings className="h-4 w-4 text-emerald-400" />
                    Product Inventory Management
                  </h3>
                  <span className="text-[10px] text-slate-500 font-mono font-bold">{products.length} Products Found</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-900 text-slate-500 text-[10px] font-bold uppercase bg-slate-950/40">
                        <th className="py-4 px-6">Product Details</th>
                        <th className="py-4 px-6 text-center">Format</th>
                        <th className="py-4 px-6 text-center">Pages</th>
                        <th className="py-4 px-6 text-center">Pricing</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-900 text-slate-300">
                      {products.map((item) => (
                        <tr 
                          key={item.id} 
                          id={`product-row-${item.id}`}
                          className="hover:bg-slate-900/20 transition-colors border-slate-900"
                        >
                          <td className="py-5 px-6">
                            <div className="flex items-center gap-4">
                              <div className="h-12 w-9 bg-slate-900 rounded border border-slate-800 flex-shrink-0 flex items-center justify-center text-slate-500 text-[8px] font-black">
                                PDF
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-bold text-white truncate max-w-xs sm:max-w-md">{item.title}</p>
                                <p className="text-[10px] text-slate-500 truncate max-w-xs mt-1">{item.snippet}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-5 px-6 text-center">
                            <span className="inline-block px-2.5 py-1 text-[9px] font-bold bg-slate-900 text-slate-400 border border-slate-800 rounded-md">
                              {item.format}
                            </span>
                          </td>
                          <td className="py-5 px-6 text-center text-xs font-bold font-mono">
                            {item.pages} pgs
                          </td>
                          <td className="py-5 px-6 text-center text-sm font-black text-emerald-400 font-mono">
                            ${item.price}
                          </td>
                          <td className="py-5 px-6 text-right">
                            <div className="flex items-center justify-end gap-2.5">
                              <Link href={`/products/${item.id}`} className="p-2 hover:bg-slate-900 text-slate-500 hover:text-emerald-400 rounded-xl transition-all" title="View details">
                                <Eye className="h-4 w-4" />
                              </Link>
                              
                              <button
                                onClick={() => handleDeleteRow(item.id)}
                                className="p-2 hover:bg-red-500/10 text-slate-500 hover:text-red-400 rounded-xl transition-all cursor-pointer"
                                title="Delete ebook from catalog"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {products.length === 0 && (
                  <div className="py-16 text-center flex flex-col items-center justify-center">
                    <div className="p-4 bg-slate-900/50 rounded-full text-slate-500 mb-3">
                      <LayoutGrid className="h-8 w-8" />
                    </div>
                    <p className="text-sm font-bold text-slate-400">Inventory is currently empty.</p>
                    <p className="text-xs text-slate-500 mt-1">Upload a PDF below to populate the catalog.</p>
                    <Button onClick={() => handleTabChange("upload")} className="mt-4 text-xs py-2 px-4">
                      Upload Ebook Now
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: UPLOAD NEW PDF PRODUCT FORM */}
          {activeTab === "upload" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Form columns */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* PDF Drop zone */}
                <div className="glass-panel border-slate-800 rounded-3xl p-6 relative overflow-hidden">
                  <h2 className="text-sm font-black text-white mb-4 flex items-center gap-2 uppercase tracking-wider">
                    <FileText className="h-4 w-4 text-emerald-400" />
                    Step 1: Upload Ebook Document
                  </h2>
                  
                  <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all duration-300 relative overflow-hidden ${
                      dragActive 
                        ? "border-indigo-400 bg-indigo-500/5 shadow-inner" 
                        : "border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900/30"
                    }`}
                  >
                    <input
                      type="file"
                      id="admin-pdf-upload-file"
                      accept="application/pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />

                    {!pdfFileName && !isUploading && (
                      <label htmlFor="admin-pdf-upload-file" className="cursor-pointer flex flex-col items-center group">
                        <div className="p-4 bg-indigo-500/10 rounded-2xl text-indigo-400 mb-3 group-hover:scale-110 transition-transform duration-300">
                          <Upload className="h-6 w-6" />
                        </div>
                        <p className="text-sm font-bold text-white mb-1">Drag & Drop your Ebook PDF here</p>
                        <p className="text-xs text-slate-500">or click to browse local files (PDF only)</p>
                      </label>
                    )}

                    {isUploading && (
                      <div className="w-full max-w-xs space-y-3">
                        <p className="text-xs font-semibold text-indigo-400 animate-pulse">Encrypting & buffering PDF bytes...</p>
                        <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                          <div 
                            className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-100"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                        <p className="text-[10px] text-slate-500 font-mono">{uploadProgress}% complete • SECURE_CHANNEL_TLSv1.3</p>
                      </div>
                    )}

                    {pdfFileName && !isUploading && (
                      <div className="flex flex-col items-center space-y-3">
                        <div className="p-3 bg-emerald-500/20 rounded-full text-emerald-400 border border-emerald-500/30">
                          <CheckCircle2 className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white truncate max-w-xs">{pdfFileName}</p>
                          <p className="text-[10px] text-slate-500 font-mono mt-0.5">{fileSize} • Upload Status: Verified</p>
                        </div>
                        <button
                          onClick={() => setPdfFileName(null)}
                          className="text-xs text-slate-500 hover:text-red-400 underline cursor-pointer"
                        >
                          Remove file
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Metadata card */}
                <div className="glass-panel border-slate-800 rounded-3xl p-6 space-y-4">
                  <h2 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-emerald-400" />
                    Step 2: Core Ebook Specifications
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Ebook Title</label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter Ebook Title"
                        className="w-full bg-slate-900 border border-slate-800 hover:border-slate-700 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Pricing (USD)</label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</span>
                        <input
                          type="number"
                          value={price}
                          onChange={(e) => setPrice(Number(e.target.value))}
                          placeholder="Price"
                          className="w-full bg-slate-900 border border-slate-800 hover:border-slate-700 focus:border-indigo-500 rounded-xl pl-8 pr-4 py-3 text-sm text-white focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Short Snippet Summary</label>
                    <input
                      type="text"
                      value={snippet}
                      onChange={(e) => setSnippet(e.target.value)}
                      placeholder="Brief card summary"
                      className="w-full bg-slate-900 border border-slate-800 hover:border-slate-700 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Ebook Sales Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Write your ebook sales content in detail..."
                      rows={4}
                      className="w-full bg-slate-900 border border-slate-800 hover:border-slate-700 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors resize-y"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-2">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-slate-400 uppercase">Total Pages</label>
                      <input
                        type="number"
                        value={pages}
                        onChange={(e) => setPages(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-800 hover:border-slate-700 focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-slate-400 uppercase">Format</label>
                      <input
                        type="text"
                        value={format}
                        onChange={(e) => setFormat(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 hover:border-slate-700 focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-slate-400 uppercase">File Size</label>
                      <input
                        type="text"
                        value={fileSize}
                        onChange={(e) => setFileSize(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 hover:border-slate-700 focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Selling Points checklist */}
                <div className="glass-panel border-slate-800 rounded-3xl p-6 space-y-4">
                  <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Step 3: What's Inside Ebook Features
                  </h3>
                  
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddFeature()}
                      placeholder="e.g. 5 proposal pitch scripts"
                      className="flex-1 bg-slate-900 border border-slate-800 hover:border-slate-700 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
                    />
                    <Button onClick={handleAddFeature} type="button" className="text-xs px-4">
                      <Plus className="h-4 w-4 mr-1" /> Add
                    </Button>
                  </div>

                  <ul className="space-y-2">
                    {features.map((feat, i) => (
                      <li 
                        key={i} 
                        className="flex items-center justify-between p-3 bg-slate-900/60 rounded-xl border border-slate-900 text-xs text-slate-300"
                      >
                        <span className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                          {feat}
                        </span>
                        <button
                          onClick={() => handleRemoveFeature(i)}
                          className="text-slate-500 hover:text-red-400 transition-colors p-1"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Previews content edit */}
                <div className="glass-panel border-slate-800 rounded-3xl p-6 space-y-4">
                  <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-emerald-400" />
                    Step 4: Look Inside Sample Chapters
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Write exactly what sample content users can view inside the interactive reader.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {samplePages.map((page, i) => (
                      <div key={i} className="p-4 bg-slate-900/40 rounded-2xl border border-slate-900 space-y-3">
                        <span className="text-[9px] uppercase tracking-widest font-black text-emerald-500 block border-b border-slate-900 pb-2">Page {i + 1} Preview</span>

                        <div className="space-y-2">
                          <input
                            type="text"
                            value={page.subtitle}
                            onChange={(e) => handleSamplePageChange(i, "subtitle", e.target.value)}
                            placeholder="Subtitle (e.g. Chapter 1)"
                            className="w-full bg-slate-950 border border-slate-855 focus:border-indigo-500 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                          />
                          <input
                            type="text"
                            value={page.title}
                            onChange={(e) => handleSamplePageChange(i, "title", e.target.value)}
                            placeholder="Title"
                            className="w-full bg-slate-950 border border-slate-855 focus:border-indigo-500 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                          />
                          <textarea
                            value={page.content}
                            onChange={(e) => handleSamplePageChange(i, "content", e.target.value)}
                            placeholder="Content paragraphs..."
                            rows={5}
                            className="w-full bg-slate-950 border border-slate-855 focus:border-indigo-500 rounded-lg p-3 text-xs text-slate-300 focus:outline-none resize-none font-serif leading-relaxed"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Publish CTA */}
                <div className="pt-4 flex justify-end">
                  <Button
                    onClick={handlePublish}
                    disabled={isUploading}
                    className="w-full sm:w-auto px-8 py-4 gap-2 text-sm justify-center shadow-lg shadow-indigo-500/20"
                  >
                    <Sparkles className="h-4 w-4" /> Publish and Add to Inventory
                  </Button>
                </div>

              </div>

              {/* RIGHT: Live mockups preview pane */}
              <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
                
                {/* Cover gradient selectors */}
                <div className="glass-panel border-slate-800 rounded-3xl p-6 space-y-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mockup Design Cover Skin</h3>
                  <div className="grid grid-cols-4 gap-3">
                    {COVER_GRADIENTS.map((grad, i) => (
                      <button
                        key={i}
                        onClick={() => setCoverGradientIndex(i)}
                        className={`h-12 rounded-xl flex flex-col items-center justify-center border transition-all ${
                          coverGradientIndex === i 
                            ? "border-white bg-slate-900 shadow-md shadow-indigo-500/10 scale-105" 
                            : "border-slate-800 hover:border-slate-700 bg-slate-950"
                        }`}
                      >
                        <span 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: grad.color }}
                        />
                        <span className="text-[8px] text-slate-400 mt-1 font-bold truncate max-w-full px-1">{grad.name.split(" ")[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live 3D floating Mockup */}
                <div 
                  ref={bookMockupRef}
                  className="relative aspect-[3/4.2] w-full max-w-[300px] mx-auto bg-slate-900 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center border book-cover"
                  style={{ perspective: "1000px" }}
                >
                  <div className="absolute top-0 left-0 bottom-0 w-3.5 bg-gradient-to-r from-indigo-600/30 via-indigo-500/5 to-transparent z-10" />
                  
                  <div 
                    className="absolute -top-32 -right-32 w-64 h-64 rounded-full blur-[100px] opacity-40 transition-all duration-700" 
                    style={{ backgroundColor: activeGradient.color }}
                  />

                  <div className={`absolute inset-0 p-8 flex flex-col justify-between bg-gradient-to-br ${activeGradient.class} transition-all duration-500`}>
                    
                    <div className="flex justify-between items-start">
                      <span className="text-[9px] font-bold text-emerald-400 border border-emerald-400/20 px-2 py-0.5 rounded bg-emerald-500/5 uppercase tracking-widest flex items-center gap-1">
                        <Sparkles className="h-2.5 w-2.5" /> PDF Class
                      </span>
                      <FileText className="h-5 w-5 text-emerald-400" />
                    </div>

                    <div className="space-y-3 py-6 text-center">
                      <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">OnlineWithMuuo</p>
                      <h3 className="text-lg font-black text-white leading-tight tracking-tight line-clamp-4">
                        {title || "Your Ebook Title"}
                      </h3>
                    </div>

                    <div className="pt-4 border-t border-slate-900/80 flex items-center justify-between text-slate-400">
                      <span className="text-[10px] font-bold">
                        {pages} Pages • Digital PDF
                      </span>
                      <span className="text-sm font-black text-emerald-400">
                        ${price}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card view previewer */}
                <div className="glass-panel border-slate-800 rounded-3xl p-6 space-y-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Storefront Grid Preview</h3>
                  
                  <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-900 space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                        ${price}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        <span className="text-[10px] font-bold text-white">5.0</span>
                        <span className="text-[9px] text-slate-500">(1)</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-white line-clamp-1">{title || "Your Ebook Title"}</h4>
                      <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">{snippet || "Short summary snippet preview..."}</p>
                    </div>

                    <div className="border-t border-slate-900 pt-2.5 flex items-center justify-between">
                      <span className="text-[9px] text-slate-500 font-bold">{format} • {fileSize}</span>
                      <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-0.5 hover:translate-x-1 transition-transform cursor-pointer">
                        Preview details <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>

      </div>

      {/* FULL SCREEN PUBLISHED SUCCESS MODAL */}
      {isSuccess && (
        <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div 
            ref={successModalRef} 
            className="glass-panel border-indigo-500/20 rounded-3xl p-8 max-w-md w-full text-center space-y-6 shadow-2xl shadow-indigo-500/5"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-400 to-emerald-500 rounded-full mx-auto flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <CheckCircle2 className="h-10 w-10 text-slate-950" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-white">Ebook Published & Buffered!</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Your custom PDF guide is officially listed inside the storefront catalog inventory.
              </p>
            </div>

            <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-900 text-left space-y-1">
              <p className="text-[10px] uppercase font-bold text-slate-500">Live Item Details</p>
              <p className="text-xs font-bold text-white truncate">{title}</p>
              <p className="text-[10px] text-emerald-400 font-mono font-bold mt-0.5">PRICE: ${price} • PAGE_COUNT: {pages} • FORMAT: {format}</p>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <Button 
                onClick={() => {
                  setIsSuccess(false);
                  handleTabChange("inventory");
                }}
                className="w-full py-4 justify-center gap-2"
              >
                Go to Catalog Inventory <ArrowRight className="h-4 w-4" />
              </Button>
              <button 
                onClick={() => {
                  setIsSuccess(false);
                  setTitle("Another Ultimate Online Guidebook");
                  setPdfFileName(null);
                  setUploadProgress(0);
                }}
                className="text-xs text-slate-500 hover:text-white transition-colors py-2 cursor-pointer underline"
              >
                Upload Another PDF Product
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
