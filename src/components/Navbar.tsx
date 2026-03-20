"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Briefcase, FileText } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
    const { data: session } = useSession();

    return (
        <nav className="bg-[#0a0a0a] border-b border-white/5 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2 mr-6 border-r pr-6 border-white/10">
                            <div className="bg-emerald-500 p-1.5 rounded-lg">
                                <FileText className="h-5 w-5 text-white" />
                            </div>
                            <span className="font-bold text-lg text-white tracking-tight">Hub</span>
                        </Link>
                        <Link href="/search" className="flex items-center space-x-2 text-gray-400 hover:text-emerald-400 transition-colors">
                            <Briefcase className="h-5 w-5" />
                            <span className="font-medium text-gray-400 hover:text-emerald-400">AI Job Search</span>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link href="/notes" className="text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors bg-emerald-400/10 px-4 py-2 rounded-full border border-emerald-400/20">
                            📝 Notes
                        </Link>
                        {session ? (
                            <>
                                <span className="text-sm font-medium text-gray-400">{session.user?.name || session.user?.email}</span>
                                <button
                                    onClick={() => signOut()}
                                    className="bg-white/5 text-gray-300 hover:bg-white/10 px-5 py-2.5 rounded-xl text-sm font-bold transition-all border border-white/10"
                                >
                                    Sign out
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => signIn("credentials", { callbackUrl: "/" })}
                                className="bg-emerald-500 text-white hover:bg-emerald-600 px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-[0_4px_15px_rgba(16,185,129,0.2)]"
                            >
                                Sign in
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
