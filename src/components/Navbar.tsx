"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Briefcase, FileText } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
    const { data: session } = useSession();

    return (
        <nav className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2 mr-6 border-r pr-6 border-gray-100">
                            <div className="bg-blue-600 p-1.5 rounded-lg">
                                <FileText className="h-5 w-5 text-white" />
                            </div>
                            <span className="font-bold text-lg text-gray-900 tracking-tight">Career Hub</span>
                        </Link>
                        <Link href="/search" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                            <Briefcase className="h-5 w-5" />
                            <span className="font-medium">AI Job Search</span>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link href="/notes" className="text-sm font-semibold text-teal-600 hover:text-teal-800 transition-colors">
                            📝 Notes
                        </Link>
                        {session ? (
                            <>
                                <span className="text-sm text-gray-700">{session.user?.name || session.user?.email}</span>
                                <button
                                    onClick={() => signOut()}
                                    className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    Sign out
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => signIn("credentials", { callbackUrl: "/" })}
                                className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
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
