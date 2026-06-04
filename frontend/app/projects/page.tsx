'use client'
import { useEffect, useState } from 'react'
import ProjectCard from '@/components/ProjectCard'
import { getProjects } from '@/lib/api'

const CATEGORIES = ['All', 'Machine Learning', 'Data Analysis', 'NLP / ML', 'Full Stack', 'AI / LLM']

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [active, setActive] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProjects().then(data => { setProjects(data); setLoading(false) })
      .catch(() => {
        // Fallback data
        setProjects([
          { id:1, title:'Customer Segmentation & Analysis', slug:'customer-segmentation', summary:'End-to-end ML pipeline using KMeans clustering to identify 3 distinct customer groups for targeted marketing.', image_url:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800', category:'Machine Learning', stack:'Python,Pandas,NumPy,Scikit-learn,Matplotlib,Seaborn', is_featured:true, github_url:'https://github.com/davange-rushikesh', demo_url:'' },
          { id:2, title:'Contact Management App', slug:'contact-management-app', summary:'Interactive Streamlit web app with CRUD operations, search, and persistent CSV storage.', image_url:'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800', category:'Full Stack', stack:'Python,Streamlit,Pandas,CSV', is_featured:true, github_url:'https://github.com/davange-rushikesh', demo_url:'' },
          { id:3, title:'Spam Email Classifier', slug:'spam-email-classifier', summary:'NLP binary classifier with 97.2% accuracy using TF-IDF vectorization and Naive Bayes.', image_url:'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800', category:'NLP / ML', stack:'Python,Scikit-learn,NLTK,TF-IDF,Streamlit', is_featured:true, github_url:'https://github.com/davange-rushikesh', demo_url:'' },
          { id:4, title:'Sales Analytics Dashboard', slug:'sales-analytics-dashboard', summary:'Interactive Power BI + Python dashboard with KPIs, trend analysis, and regional breakdown.', image_url:'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800', category:'Data Analysis', stack:'Python,Pandas,Power BI,Matplotlib,Seaborn', is_featured:true, github_url:'https://github.com/davange-rushikesh', demo_url:'' },
          { id:5, title:'AI Resume Analyzer', slug:'ai-resume-analyzer', summary:'GPT-powered resume analyzer that scores ATS compatibility and provides optimization suggestions.', image_url:'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800', category:'AI / LLM', stack:'Python,OpenAI,Streamlit,PyPDF2', is_featured:false, github_url:'https://github.com/davange-rushikesh', demo_url:'' },
          { id:6, title:'Movie Recommendation System', slug:'movie-recommendation-system', summary:'Content-based filtering recommender using cosine similarity on TMDB dataset with Streamlit UI.', image_url:'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800', category:'Machine Learning', stack:'Python,Scikit-learn,Pandas,TMDB API,Streamlit', is_featured:false, github_url:'https://github.com/davange-rushikesh', demo_url:'' },
        ])
        setLoading(false)
      })
  }, [])

  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active)

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="relative py-20 px-4 text-center border-b border-zinc-800 bg-gradient-to-b from-cyan-900/10 to-transparent overflow-hidden">
        <div className="orb orb-blue w-[300px] h-[300px] top-0 right-0 opacity-10" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="tag mb-4 inline-block"> Portfolio</span>
          <h1 className="text-5xl font-black text-white mb-4">
            My <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-zinc-400 text-xl">
            Real-world data science & ML projects built from scratch — end-to-end.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                active === cat
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/20'
                  : 'bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700'
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass-card h-80 animate-pulse">
                <div className="h-48 bg-zinc-800 rounded-t-2xl" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-zinc-800 rounded w-3/4" />
                  <div className="h-3 bg-zinc-800 rounded w-full" />
                  <div className="h-3 bg-zinc-800 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(p => <ProjectCard key={p.id} project={p} />)}
          </div>
        ) : (
          <div className="text-center py-20 text-zinc-500">
            <div className="text-5xl mb-4"></div>
            <p>No projects found in this category.</p>
          </div>
        )}
      </div>
    </div>
  )
}
