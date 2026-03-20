"use client";

import { useState } from "react";
import Link from "next/link";

export default function NotesPage() {
    const [note, setNote] = useState("");
    const [notes, setNotes] = useState<string[]>([]);

    const handleSave = () => {
        if (!note.trim()) return;
        setNotes((prev) => [note.trim(), ...prev]);
        setNote("");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-400 via-sky-400 to-blue-500 flex items-center justify-center p-6">
            <div className="w-full max-w-sm bg-white/95 rounded-3xl shadow-2xl overflow-hidden">
                {/* Top gradient header */}
                <div className="bg-gradient-to-r from-cyan-400 to-blue-400 px-6 pt-5 pb-8">
                    <Link href="/" className="inline-flex items-center text-white/90 text-sm font-semibold hover:text-white mb-5">
                        ← Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-extrabold text-blue-900">Notes Saver</h1>
                </div>

                {/* Input card floating over header */}
                <div className="px-6 -mt-4">
                    <div className="bg-white rounded-2xl shadow-lg flex overflow-hidden border border-blue-100">
                        <input
                            type="text"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSave()}
                            placeholder="Write your note here..."
                            className="flex-1 px-4 py-4 text-gray-700 placeholder-gray-400 outline-none text-base"
                        />
                        <button
                            onClick={handleSave}
                            className="bg-teal-500 hover:bg-teal-600 text-white font-bold px-5 text-sm leading-tight transition-colors"
                        >
                            Save<br />Note
                        </button>
                    </div>
                </div>

                {/* Notes list */}
                <div className="px-6 py-6 min-h-[200px]">
                    {notes.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-10 text-center">
                            <span className="text-5xl mb-4">📝</span>
                            <p className="text-gray-500 text-base">
                                No notes yet. Add your first note<br />above!
                            </p>
                        </div>
                    ) : (
                        <ul className="space-y-3">
                            {notes.map((n, idx) => (
                                <li
                                    key={idx}
                                    className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-gray-800 text-sm shadow-sm flex justify-between items-start"
                                >
                                    <span>{n}</span>
                                    <button
                                        onClick={() => setNotes((prev) => prev.filter((_, i) => i !== idx))}
                                        className="ml-3 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                                    >
                                        ✕
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
