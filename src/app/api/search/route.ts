import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import FirecrawlApp from "@mendable/firecrawl-js";

export async function POST(req: Request) {
    try {
        // Ensure user is authenticated
        const session = await getServerSession();
        if (!session) {
            return NextResponse.json({ message: "Unauthorized. Please sign in." }, { status: 401 });
        }

        const { query } = await req.json();

        if (!query) {
            return NextResponse.json({ message: "Query is required" }, { status: 400 });
        }

        // Check if API key is provided
        if (!process.env.FIRECRAWL_API_KEY || process.env.FIRECRAWL_API_KEY === "") {
            // Return realistic mock data for their recording demo
            const mockJobs = Array.from({ length: 5 }).map((_, i) => ({
                title: `${query.split(" ")[0] || "Senior"} Developer - Role ${i + 1}`,
                company: ["Google", "Microsoft", "Amazon", "Netflix", "Meta"][i],
                location: ["Remote", "New York, NY", "San Francisco, CA", "Austin, TX", "Seattle, WA"][i],
                url: "https://linkedin.com/jobs",
                description: `We are looking for an experienced ${query || "professional"} to join our fast-paced team. You will be responsible for building highly scalable applications using Next.js and React. Competitive salary and benefits included.`
            }));
            return NextResponse.json({ jobs: mockJobs });
        }

        // Initialize Firecrawl using the free API key
        const app = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY });

        // Use Firecrawl to search for jobs
        // `searchQuery` appended to direct Firecrawl to look for job boards or listings
        const searchQuery = `${query} job posting apply site:linkedin.com/jobs OR site:indeed.com/viewjob`;

        const searchResults = await app.search(searchQuery, {
            limit: 5,
        }) as any;

        if (!searchResults.success) {
            throw new Error(searchResults.error || "Failed to fetch from Firecrawl");
        }

        // Format the results
        const formattedJobs = searchResults.data.map((res: any) => {
            return {
                title: res.title || query,
                company: "Found via " + new URL(res.url).hostname.replace('www.', ''),
                location: "Remote/Unknown",
                url: res.url,
                description: res.description || "Relevant job match found based on your AI search.",
            };
        });

        return NextResponse.json({ jobs: formattedJobs });
    } catch (error: any) {
        console.error("Search API Error:", error);
        return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
    }
}
