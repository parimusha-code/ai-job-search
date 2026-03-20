"use client";

import Link from "next/link";
import { Briefcase, Youtube, FileText, ClipboardList, ArrowRight } from "lucide-react";

export default function HubPage() {
    const tools = [
        {
            title: "AI Resume Maker",
            description: "Build a professional, ATS-optimized resume using AI in minutes.",
            icon: <FileText className="w-10 h-10 text-pink-500" />,
            link: "https://ai-resume-builder-iota-peach.vercel.app",
            external: true,
            color: "from-pink-50 to-white",
            borderColor: "border-pink-100",
            buttonColor: "bg-pink-500 hover:bg-pink-600",
        },
        {
            title: "AI Job Search & Career Navigation",
            description: "Find your next role faster with AI-powered job board scraping.",
            icon: <Briefcase className="w-10 h-10 text-blue-500" />,
            link: "/search",
            external: false,
            color: "from-blue-50 to-white",
            borderColor: "border-blue-100",
            buttonColor: "bg-blue-600 hover:bg-blue-700",
        },
        {
            title: "AI YouTube Summarizer",
            description: "Instantly summarize long videos into key takeaways and notes.",
            icon: <Youtube className="w-10 h-10 text-red-500" />,
            link: "https://ai-you-tube-summarizer.vercel.app",
            external: true,
            color: "from-red-50 to-white",
            borderColor: "border-red-100",
            buttonColor: "bg-red-500 hover:bg-red-600",
        },
        {
            title: "Notes Saver",
            description: "A simple, elegant place to store and manage your career notes.",
            icon: <ClipboardList className="w-10 h-10 text-teal-500" />,
            link: "/notes",
            external: false,
            color: "from-teal-50 to-white",
            borderColor: "border-teal-100",
            buttonColor: "bg-teal-500 hover:bg-teal-600",
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        AI Multi-Tool <span className="text-blue-600">Career Suite</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Everything you need for your modern career journey, all in one simplified and AI-powered dashboard.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {tools.map((tool, idx) => (
                        <div
                            key={idx}
                            className={`group bg-gradient-to-br ${tool.color} p-8 rounded-3xl border ${tool.borderColor} shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden flex flex-col justify-between h-full min-h-[250px]`}
                        >
                            <div className="relative z-10">
                                <div className="mb-6 p-4 bg-white rounded-2xl shadow-sm inline-block">
                                    {tool.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">{tool.title}</h3>
                                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                    {tool.description}
                                </p>
                            </div>

                            <div className="relative z-10 mt-auto">
                                <Link
                                    href={tool.link}
                                    target={tool.external ? "_blank" : "_self"}
                                    className={`inline-flex items-center px-6 py-3 rounded-xl text-white font-bold text-lg shadow-md transition-all duration-300 ${tool.buttonColor}`}
                                >
                                    Open Tool
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>

                            {/* Decorative background circle */}
                            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-gray-900/5 rounded-full blur-3xl group-hover:bg-gray-900/10 transition-colors pointer-events-none"></div>
                        </div>
                    ))}
                </div>

                <footer className="mt-20 text-center text-gray-500">
                    <p>© 2024 AI Multi-Tool Career Suite • Final Week Project Submission</p>
                </footer>
            </div>
        </div>
    );
}
