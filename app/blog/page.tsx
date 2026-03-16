import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Script from "next/script"
import { Header } from "@/components/marketing/header"
import { Footer } from "@/components/marketing/footer"
import { getBlogPost, blogPosts } from "@/lib/blog-posts"
import { ArrowLeft, ArrowRight, Clock } from "lucide-react"

// Force dynamic rendering — avoids static param conflicts in dev
export const dynamic = "force-dynamic"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}
  return {
    title:       `${post.title} — Tecsaro AI Blog`,
    description: post.description,
    alternates:  { canonical: `/blog/${post.slug}` },
    openGraph: {
      title:         post.title,
      description:   post.description,
      type:          "article",
      publishedTime: post.date,
    },
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  })
}

const categoryColors: Record<string, string> = {
  "AEO Basics":    "bg-emerald/10 text-emerald border-emerald/20",
  "AI Engines":    "bg-blue-500/10 text-blue-600 border-blue-500/20",
  "Technical AEO": "bg-violet/10 text-violet border-violet/20",
  "AEO Strategy":  "bg-amber/10 text-amber border-amber/20",
}

function categoryColor(cat: string) {
  return categoryColors[cat] ?? "bg-muted text-muted-foreground border-border"
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPost(slug)

  // Explicit guard — avoids TypeScript narrowing issues with notFound()
  if (!post) return notFound()

  const related = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 2)

  const idx  = blogPosts.findIndex((p) => p.slug === post.slug)
  const prev = blogPosts[idx - 1] ?? null
  const next = blogPosts[idx + 1] ?? null

  return (
    <div className="min-h-screen bg-cloud">
      <Script
        id="schema-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline:      post.title,
          description:   post.description,
          datePublished: post.date,
          author:        { "@type": "Organization", name: "Tecsaro AI" },
          publisher:     { "@type": "Organization", name: "Tecsaro AI", url: "https://ai.tecsaro.com" },
          url:           `https://ai.tecsaro.com/blog/${post.slug}`,
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home",  item: "https://ai.tecsaro.com"       },
              { "@type": "ListItem", position: 2, name: "Blog",  item: "https://ai.tecsaro.com/blog"  },
              { "@type": "ListItem", position: 3, name: post.title, item: `https://ai.tecsaro.com/blog/${post.slug}` },
            ],
          },
        })}}
      />
      <Header />

      <main className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6">

          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs text-graphite hover:text-charcoal font-semibold mb-8 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All posts
          </Link>

          {/* Post header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border font-mono ${categoryColor(post.category)}`}>
                {post.category}
              </span>
              <span className="text-xs text-graphite font-mono">{formatDate(post.date)}</span>
              <span className="text-xs text-graphite font-mono flex items-center gap-1">
                <Clock className="h-3 w-3" /> {post.readTime}
              </span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-charcoal mb-4 leading-tight">
              {post.title}
            </h1>

            <p className="text-lg text-graphite leading-relaxed">
              {post.description}
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-border mb-10" />

          {/* Article body */}
          <div
            className="
              prose prose-sm max-w-none
              prose-headings:font-heading prose-headings:text-charcoal prose-headings:font-bold
              prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3
              prose-h3:text-base prose-h3:mt-6 prose-h3:mb-2
              prose-p:text-graphite prose-p:leading-relaxed prose-p:mb-4
              prose-ul:text-graphite prose-ul:pl-5
              prose-ol:text-graphite prose-ol:pl-5
              prose-li:mb-1.5 prose-li:leading-relaxed
              prose-strong:text-charcoal prose-strong:font-semibold
              prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:text-charcoal
            "
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Divider */}
          <div className="border-t border-border mt-12 mb-10" />

          {/* CTA */}
          <div className="bg-charcoal rounded-2xl p-7 text-center mb-10">
            <p className="text-white font-heading text-lg font-bold mb-1.5">
              Start tracking your brand in AI answers
            </p>
            <p className="text-white/50 text-sm mb-5">
              Free forever — no credit card required.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald text-charcoal font-semibold text-sm hover:bg-emerald/90 transition-colors"
            >
              Get Started Free <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Prev / Next navigation */}
          {(prev || next) && (
            <div className="flex items-center justify-between gap-4">
              {prev ? (
                <Link
                  href={`/blog/${prev.slug}`}
                  className="flex-1 group flex items-start gap-3 bg-white border border-border rounded-xl p-4 hover:border-emerald/30 transition-all"
                >
                  <ArrowLeft className="h-4 w-4 text-muted-foreground group-hover:text-emerald transition-colors shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-[10px] text-graphite font-mono mb-0.5">Previous</p>
                    <p className="text-xs font-semibold text-charcoal group-hover:text-emerald transition-colors line-clamp-2">{prev.title}</p>
                  </div>
                </Link>
              ) : <div className="flex-1" />}

              {next ? (
                <Link
                  href={`/blog/${next.slug}`}
                  className="flex-1 group flex items-start gap-3 bg-white border border-border rounded-xl p-4 hover:border-emerald/30 transition-all text-right"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] text-graphite font-mono mb-0.5">Next</p>
                    <p className="text-xs font-semibold text-charcoal group-hover:text-emerald transition-colors line-clamp-2">{next.title}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-emerald transition-colors shrink-0 mt-0.5" />
                </Link>
              ) : <div className="flex-1" />}
            </div>
          )}

          {/* Related posts */}
          {related.length > 0 && (
            <div className="mt-12">
              <p className="font-heading text-base font-bold text-charcoal mb-4">Related Articles</p>
              <div className="space-y-3">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="group flex items-center gap-3 bg-white border border-border rounded-xl p-4 hover:border-emerald/30 transition-all"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-charcoal group-hover:text-emerald transition-colors line-clamp-1">{p.title}</p>
                      <p className="text-xs text-graphite mt-0.5 line-clamp-1">{p.description}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-emerald transition-colors shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  )
}