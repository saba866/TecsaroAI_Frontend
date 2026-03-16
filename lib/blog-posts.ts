// lib/blog-posts.ts
// Static blog posts — add new posts here

export interface BlogPost {
  slug:        string
  title:       string
  description: string
  date:        string
  category:    string
  readTime:    string
  featured:    boolean
  content:     string   // HTML string
}

export const blogPosts: BlogPost[] = [
  {
    slug:        "what-is-aeo-answer-engine-optimization",
    title:       "What is AEO? A Complete Guide to Answer Engine Optimization",
    description: "AEO is the practice of optimizing your content to appear in AI-generated answers. Learn what it is, why it matters, and how to get started.",
    date:        "2025-03-01",
    category:    "AEO Basics",
    readTime:    "6 min read",
    featured:    true,
    content: `
<p>Search is changing. Millions of people now ask ChatGPT, Gemini, and Perplexity questions instead of typing into Google — and they get direct answers, not a list of links.</p>

<p>This is where <strong>Answer Engine Optimization (AEO)</strong> comes in.</p>

<h2>What is AEO?</h2>
<p>AEO is the practice of optimizing your brand, content, and website so that AI engines like ChatGPT, Gemini, and Perplexity mention your business in their answers.</p>

<p>Traditional SEO focuses on ranking pages in search results. AEO focuses on getting your brand cited in AI-generated responses — the new first point of discovery for millions of users.</p>

<h2>Why AEO matters right now</h2>
<p>AI-generated answers are increasingly the first thing people see when they search. If your brand doesn't appear in those answers, you're invisible to a growing segment of your audience.</p>

<ul>
  <li>ChatGPT now handles hundreds of millions of queries per day</li>
  <li>Google's AI Overview appears at the top of search results</li>
  <li>Perplexity is growing as a direct research tool</li>
</ul>

<p>Businesses that appear in AI answers get discovered. Those that don't are losing ground to competitors — often without realizing it.</p>

<h2>How AEO differs from SEO</h2>
<p>SEO optimizes for keyword rankings. AEO optimizes for brand mentions in AI-generated answers. The signals are different:</p>

<ul>
  <li><strong>SEO:</strong> backlinks, page authority, keyword density</li>
  <li><strong>AEO:</strong> topical authority, structured data, FAQ content, clear brand signals</li>
</ul>

<p>That said, good SEO often helps AEO — but the two are not the same, and optimizing for one doesn't guarantee the other.</p>

<h2>How to get started with AEO</h2>
<p>Start by finding out where you stand. Ask ChatGPT or Gemini the questions your customers are likely asking — and see if your brand appears. Then:</p>

<ol>
  <li>Add structured data (schema markup) to your key pages</li>
  <li>Create FAQ content that answers real user questions</li>
  <li>Build topical authority on your core subject matter</li>
  <li>Track your brand's AI visibility regularly</li>
</ol>

<p>This is exactly what Tecsaro AI was built to help with — automated daily tracking, clear scores, and actionable recommendations so you always know where you stand.</p>
    `,
  },
  {
    slug:        "how-chatgpt-decides-what-brands-to-mention",
    title:       "How ChatGPT Decides Which Brands to Mention in Answers",
    description: "Understanding how large language models surface brand recommendations — and what you can do to improve your chances of being cited.",
    date:        "2025-03-08",
    category:    "AI Engines",
    readTime:    "5 min read",
    featured:    true,
    content: `
<p>When someone asks ChatGPT "what's the best project management tool?", how does it decide which brands to mention? Understanding this is the foundation of effective AEO.</p>

<h2>It's about training data and content signals</h2>
<p>ChatGPT was trained on a large corpus of text from the web. The brands that appear most frequently — in reviews, comparisons, listicles, forum discussions, and documentation — are the ones most likely to surface in answers.</p>

<p>This means:</p>
<ul>
  <li>Brands with more online presence have an inherent advantage</li>
  <li>Being mentioned in authoritative sources (G2, Capterra, Reddit) helps</li>
  <li>Having clear, structured content about what you do helps</li>
</ul>

<h2>Structured data matters</h2>
<p>Schema markup — especially Organization, Product, and FAQ schema — gives AI engines a clean, structured signal about who you are and what you do. Without it, the model has to infer this from your page text.</p>

<h2>Topical authority signals</h2>
<p>If your website consistently covers a topic in depth, AI models learn to associate your brand with that topic. A company that has 50 pages about email marketing is more likely to be cited for email marketing queries than a company with one landing page.</p>

<h2>What you can do</h2>
<ol>
  <li>Add Organization schema to your homepage</li>
  <li>Create FAQ pages that directly answer user questions</li>
  <li>Get listed on third-party review and comparison sites</li>
  <li>Build content depth around your core topics</li>
  <li>Track your mentions using tools like Tecsaro AI to see if your efforts are working</li>
</ol>

<p>The good news: you don't need millions of backlinks to appear in AI answers. You need clear signals, good structure, and consistent content in your area of expertise.</p>
    `,
  },
  {
    slug:        "schema-markup-for-ai-visibility",
    title:       "Schema Markup for AI Visibility: What to Add and Why",
    description: "Structured data isn't just for Google anymore. Here's how schema markup helps AI engines understand your brand — and which schemas matter most.",
    date:        "2025-03-15",
    category:    "Technical AEO",
    readTime:    "7 min read",
    featured:    false,
    content: `
<p>Schema markup has always been important for SEO. But in the era of AI-generated answers, it's become even more critical — it gives AI engines a clean, machine-readable understanding of who you are and what you offer.</p>

<h2>Why schema helps with AI visibility</h2>
<p>AI language models are trained on web data — including structured data from schema markup. When your pages have clear, well-formed schema, the model gets a reliable signal about your brand, products, and content.</p>

<p>Without schema, the model has to infer your brand context from surrounding text — which is less reliable and may lead to your brand being overlooked.</p>

<h2>The most important schema types for AEO</h2>

<h3>1. Organization</h3>
<p>Add this to your homepage. It tells AI engines your brand name, website, logo, social profiles, and contact information. This is the single most important schema for brand visibility.</p>

<h3>2. FAQ</h3>
<p>FAQ schema is highly effective for AEO. Questions and answers are exactly the format AI engines use — having them marked up makes it easy for the model to surface your content as a cited answer.</p>

<h3>3. Product</h3>
<p>For e-commerce and SaaS, Product schema tells AI engines what you sell, your pricing, and your features. Essential if you want to appear in product recommendation queries.</p>

<h3>4. Article</h3>
<p>For blog posts and guides, Article schema signals topical authority and helps establish your brand as a credible source on a given topic.</p>

<h2>How to implement schema</h2>
<p>Add JSON-LD blocks to the <code>&lt;head&gt;</code> of your pages. Tecsaro AI automatically generates ready-to-implement schema for your key pages — including FAQ, Organization, and Product schemas — based on your crawled website data.</p>

<p>Once added, run your prompts through AI engines and check if your brand starts appearing more frequently in answers on those topics.</p>
    `,
  },
  {
    slug:        "track-brand-in-ai-answers",
    title:       "How to Track Whether Your Brand Appears in AI Answers",
    description: "A practical guide to monitoring your brand's visibility in ChatGPT, Gemini, and Perplexity — manually and with automated tools.",
    date:        "2025-03-22",
    category:    "AEO Strategy",
    readTime:    "5 min read",
    featured:    false,
    content: `
<p>Most businesses have no idea whether they appear in AI-generated answers. Here's how to find out — and how to track it over time.</p>

<h2>The manual approach</h2>
<p>Start by identifying the questions your customers are likely asking AI engines:</p>
<ul>
  <li>"What's the best [your category] tool?"</li>
  <li>"How do I [problem your product solves]?"</li>
  <li>"[Competitor name] alternatives"</li>
  <li>"Best [product type] for [use case]"</li>
</ul>

<p>Then open ChatGPT, Gemini, and Perplexity and type each question. Note whether your brand is mentioned, and at what position.</p>

<p>This gives you a starting point. The problem: it's time-consuming, inconsistent, and impossible to track at scale.</p>

<h2>The automated approach</h2>
<p>Tools like Tecsaro AI do this automatically. You provide your website and a set of prompts — and every day, the platform runs those prompts across ChatGPT, Gemini, and Perplexity, detects whether your brand appears, and gives you a visibility score.</p>

<p>This means:</p>
<ul>
  <li>You get daily data without manual effort</li>
  <li>You can track changes over time</li>
  <li>You can see which prompts you win and which you lose</li>
  <li>You can detect competitors appearing in your place</li>
</ul>

<h2>What to do with the data</h2>
<p>Once you know where you stand, you have a clear picture of gaps. If you're not appearing for certain queries, you can:</p>
<ol>
  <li>Create or improve content targeting that topic</li>
  <li>Add FAQ schema addressing that question directly</li>
  <li>Build more third-party mentions around that topic</li>
  <li>Track progress weekly to see if visibility improves</li>
</ol>

<p>Measurement is the foundation of any AEO strategy. Without it, you're optimizing blind.</p>
    `,
  },
  {
    slug:        "perplexity-citations-brand-visibility",
    title:       "Perplexity Citations: Why Getting Cited as a Source Matters",
    description: "Perplexity's native citation system is one of the most transparent in AI search. Here's what it means for your brand to appear as a cited source.",
    date:        "2025-03-29",
    category:    "AI Engines",
    readTime:    "4 min read",
    featured:    false,
    content: `
<p>Unlike ChatGPT or Gemini, Perplexity shows its sources — listing the websites it pulled information from to generate each answer. This makes it uniquely valuable for brand visibility tracking.</p>

<h2>What Perplexity citations mean</h2>
<p>When Perplexity answers a question, it typically cites 3–5 sources. These are the actual URLs it retrieved and used to form its response.</p>

<p>If your brand is cited as a source, it means:</p>
<ul>
  <li>Perplexity indexed and trusted your content</li>
  <li>Your page was relevant enough to be included in the answer</li>
  <li>Users can click through directly to your site</li>
</ul>

<p>This is direct, measurable AI referral traffic — and it's growing.</p>

<h2>How to get cited by Perplexity</h2>
<p>Perplexity uses a real-time web search approach. It retrieves current pages and synthesizes them into answers. To be cited:</p>

<ul>
  <li>Your content needs to be indexed and accessible</li>
  <li>It should directly answer the question being asked</li>
  <li>Clear structure (headings, lists, direct answers) helps</li>
  <li>FAQ content performs particularly well</li>
</ul>

<h2>Tracking your citation rate</h2>
<p>Tecsaro AI's Pro plan tracks your Perplexity citation rate — showing how often your brand appears as a source when AI answers questions in your category. It also identifies which sources are frequently cited that you're not currently appearing on, giving you a clear list of gaps to close.</p>

<p>As Perplexity grows, citation tracking will become one of the most important metrics in AI search visibility — similar to how backlink profiles are tracked in traditional SEO today.</p>
    `,
  },
  {
    slug:        "aeo-vs-seo-differences",
    title:       "AEO vs SEO: What's the Difference and Do You Need Both?",
    description: "SEO and AEO are related but different disciplines. Here's a clear breakdown of how they differ and why both matter for modern digital visibility.",
    date:        "2025-04-05",
    category:    "AEO Basics",
    readTime:    "6 min read",
    featured:    true,
    content: `
<p>Everyone knows SEO. But as AI-generated answers become the dominant way people discover brands and products, AEO is becoming equally important. Here's how the two compare.</p>

<h2>What SEO optimizes for</h2>
<p>Traditional SEO focuses on ranking your web pages in search engine results pages (SERPs). The primary signals are:</p>
<ul>
  <li>Backlinks and domain authority</li>
  <li>On-page keyword optimization</li>
  <li>Page speed and technical health</li>
  <li>Click-through rate from search results</li>
</ul>

<p>The goal: get your page to position 1–3 on Google for target keywords.</p>

<h2>What AEO optimizes for</h2>
<p>AEO focuses on getting your brand mentioned in AI-generated answers. The primary signals are:</p>
<ul>
  <li>Structured data and schema markup</li>
  <li>FAQ and question-answer content</li>
  <li>Topical authority and content depth</li>
  <li>Clear brand signals across the web</li>
  <li>Third-party citations (review sites, directories)</li>
</ul>

<p>The goal: appear by name in answers from ChatGPT, Gemini, and Perplexity when users ask relevant questions.</p>

<h2>How they overlap</h2>
<p>Good SEO content often helps with AEO — especially content that's clearly structured, topically focused, and covers subjects in depth. Schema markup helps both. Fast, well-structured pages help both.</p>

<p>But they're not the same. A page can rank #1 on Google and never appear in a ChatGPT answer. And a brand can be frequently cited by AI engines while having mediocre search rankings.</p>

<h2>Do you need both?</h2>
<p>Yes — but prioritize based on where your audience is. If most of your traffic still comes from organic search, don't neglect SEO. But if your customers are increasingly turning to AI tools for discovery (which most are), AEO should be part of your strategy now — not later.</p>

<p>The businesses investing in AEO today are building a compounding advantage that will be very difficult to close in two to three years.</p>
    `,
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter((p) => p.featured)
}

export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((p) => p.category === category)
}

export const categories = [...new Set(blogPosts.map((p) => p.category))]