'use client'
import { useEffect, useState } from 'react'
import { FiArrowRight, FiTarget } from 'react-icons/fi'
import Link from 'next/link'
import { getCaseStudies } from '@/lib/api'

const FALLBACK = [
  {
    id: 1, title: 'How KMeans Clustering Uncovered 3 Hidden Customer Segments', slug: 'customer-segmentation-case-study',
    client_industry: 'Retail / E-commerce',
    problem: 'A retail company had 10,000+ customers but treated everyone the same. Conversion rates were low (2.3%) and CAC was high.',
    approach: 'Used KMeans clustering on RFM (Recency, Frequency, Monetary) features. Applied Elbow Method and Silhouette Score to find K=3 as optimal.',
    insights: 'Segment 1 (Champions): 18% of customers, 54% of revenue. Segment 2 (At-Risk): High past value but 90+ days inactive. Segment 3 (New): Low spend, high engagement.',
    impact: 'Targeted winback campaign: 31% re-engagement. Champions loyalty perks: +22% average order value. Campaign ROI improved 3.2×.',
    tools_used: 'Python, Pandas, Scikit-learn, Matplotlib, Seaborn',
    image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    is_featured: true,
  },
]

export default function CaseStudiesPage() {
  const [cases, setCases] = useState<any[]>([])

  useEffect(() => {
    getCaseStudies().then(d => setCases(d.length ? d : FALLBACK)).catch(() => setCases(FALLBACK))
  }, [])

  return (
    <div className="min-h-screen pt-20">
      <section className="relative py-20 px-4 text-center border-b border-zinc-800 bg-gradient-to-b from-violet-900/10 to-transparent overflow-hidden">
        <div className="orb orb-violet w-[300px] h-[300px] top-0 left-1/4 opacity-10" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="tag mb-4 inline-block"> Business Impact</span>
          <h1 className="text-5xl font-black text-white mb-4">Case <span className="gradient-text">Studies</span></h1>
          <p className="text-zinc-400 text-xl">Data science storytelling — problem to solution to impact.</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 space-y-10">
        {cases.map(cs => (
          <article key={cs.id} className="glass-card-hover overflow-hidden">
            {cs.image_url && (
              <div className="h-52 overflow-hidden">
                <img src={cs.image_url} alt={cs.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            )}
            <div className="p-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="tag">{cs.client_industry}</span>
                {cs.is_featured && <span className="tag-emerald">⭐ Featured</span>}
              </div>
              <h2 className="text-2xl font-black text-white mb-6">{cs.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: ' Problem', content: cs.problem },
                  { label: ' Approach', content: cs.approach },
                  { label: ' Key Insights', content: cs.insights },
                  { label: ' Business Impact', content: cs.impact },
                ].map(({ label, content }) => content && (
                  <div key={label} className="bg-zinc-800/40 rounded-xl p-4">
                    <h3 className="text-cyan-400 font-bold text-sm mb-2">{label}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{content}</p>
                  </div>
                ))}
              </div>
              {cs.tools_used && (
                <div className="mt-6 pt-5 border-t border-zinc-700/50">
                  <span className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mr-3">Tools Used:</span>
                  {cs.tools_used.split(',').map((t: string) => (
                    <span key={t} className="text-xs px-2 py-1 rounded bg-zinc-700/50 text-zinc-400 font-mono mr-2 mb-1 inline-block">{t.trim()}</span>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
