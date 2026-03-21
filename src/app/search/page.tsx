"use client";

import { useState } from "react";
import { Search, MapPin, Briefcase, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

type JobResult = {
  title?: string;
  company?: string;
  location?: string;
  url?: string;
  description?: string;
};

export default function Home() {
  const { data: session } = useSession();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<JobResult[]>([]);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setResults(data.jobs || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center px-4">
        <h1 className="text-4xl font-bold text-blue-600">
          Firecrawl AI Job Search & Career Navigation
        </h1>
        <p className="mt-4 max-w-2xl text-xl text-gray-500">
          Please sign in to search for jobs.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white min-h-screen">
      {/* Back Link */}
      <Link href="/" className="inline-flex items-center text-blue-600 font-bold hover:underline mb-8">
        <span className="mr-2">&larr;</span> Back to Dashboard
      </Link>

      {/* Main Title */}
      <h1 className="text-4xl sm:text-5xl font-bold text-blue-600 leading-tight mb-10">
        Firecrawl AI Job Search <br />& Career Navigation
      </h1>

      {/* Search Input Area */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
          <div className="flex-grow">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
              placeholder="Enter job (e.g. software engineer)"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center min-w-[120px]"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Search"}
          </button>
        </form>
        {error && <p className="mt-4 text-red-500 bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>}
      </div>

      {/* Results Area */}
      <div className="mt-6">
        {!loading && results.length === 0 && !error ? (
          <div className="border-2 border-gray-100 rounded-xl p-12 flex items-center justify-center min-h-[200px]">
            <p className="text-gray-500 text-center">
              No results found. Start a search<br />above!
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {results.map((job, idx) => (
              <div key={idx} className="border-2 border-gray-100 rounded-xl p-6 hover:border-blue-200 transition-colors bg-white shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{job.title || "Unknown Title"}</h3>
                    <div className="mt-3 flex items-center text-sm text-gray-500 space-x-6">
                      <span className="flex items-center">
                        <Briefcase className="flex-shrink-0 mr-2 h-4 w-4 text-blue-500" />
                        {job.company || "Unknown Company"}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="flex-shrink-0 mr-2 h-4 w-4 text-blue-500" />
                        {job.location || "Remote"}
                      </span>
                    </div>
                  </div>
                  {job.url && (
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-semibold transition-colors"
                    >
                      Apply
                    </a>
                  )}
                </div>
                <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                  {job.description || "No description provided."}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
