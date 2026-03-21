"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HubPage() {
    const tools = [
        {
            title: "Notes Saver",
            description: "Capture, organize, and manage your notes in one secure place.",
            link: "/notes",
            external: false,
        },
        {
            title: "YouTube Summarizer",
            description: "Instantly generate AI summaries from your favorite YouTube videos.",
            link: "https://ai-you-tube-summarizer-rdwg.vercel.app",
            external: true,
        },
        {
            title: "Job Search",
            description: "Find, track, and apply to your dream jobs with ease.",
            link: "/search",
            external: false,
        },
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center py-20 px-6 sm:px-10">
            {/* Top Pill */}
            <div className="inline-flex items-center space-x-2 bg-[#1a1a1a] px-4 py-1.5 rounded-full border border-white/10 mb-10">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-gray-400 tracking-wide uppercase">All-in-One Dashboard</span>
            </div>

            {/* Hero Section */}
            <div className="text-center max-w-4xl mb-24">
                <h1 className="text-6xl sm:text-7xl font-bold mb-8 tracking-tight leading-tight">
                    Your Career Hub,<br />Unified.
                </h1>
                <p className="text-xl sm:text-2xl text-gray-400 font-medium leading-relaxed max-w-3xl mx-auto">
                    Access your productivity tools, media utilities, and career trackers from a single interconnected ecosystem.
                </p>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
                {tools.map((tool, idx) => (
                    <div
                        key={idx}
                        className="group bg-[#141414] p-10 rounded-[40px] border border-white/5 hover:border-white/20 transition-all duration-500 hover:bg-[#1a1a1a] flex flex-col h-full min-h-[300px]"
                    >
                        <div className="flex-1">
                            <h3 className="text-3xl font-bold mb-5 tracking-tight group-hover:text-emerald-400 transition-colors">
                                {tool.title}
                            </h3>
                            <p className="text-lg text-gray-400 leading-relaxed font-medium">
                                {tool.description}
                            </p>
                        </div>

                        <div className="mt-10">
                            <Link
                                href={tool.link}
                                target={tool.external ? "_blank" : "_self"}
                                className="inline-flex items-center text-gray-300 hover:text-white font-semibold text-lg transition-colors group/link"
                            >
                                Open App
                                <ArrowRight className="ml-2 w-5 h-5 group-hover/link:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            <footer className="mt-32 text-gray-600 font-medium tracking-tight">
                <p>© 2024 AI Career Suite All-in-One Dashboard • Unified Task Hub</p>
            </footer>
        </div>
    );
}
