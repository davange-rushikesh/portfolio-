'use client'
import { FiDownload, FiExternalLink, FiCheckCircle, FiEdit2 } from 'react-icons/fi'
import Link from 'next/link'

export default function ResumePage() {
  const skills = {
    Programming: ['Python (Pandas, NumPy, Scikit-learn, Streamlit)', 'SQL (Working Knowledge)', 'JavaScript (Basic)'],
    'Data Analysis': ['Data Cleaning & Transformation', 'Exploratory Data Analysis (EDA)', 'Feature Engineering'],
    Visualization: ['Matplotlib', 'Seaborn', 'Power BI (Dashboards & Reporting)'],
    Statistics: ['Hypothesis Testing', 't-test', 'Anderson-Darling Test'],
    Tools: ['Jupyter Notebook', 'VS Code', 'Git & GitHub', 'FastAPI'],
    'ML Algorithms': ['KMeans Clustering', 'Naive Bayes', 'KNN', 'Linear/Logistic Regression', 'Random Forest'],
  }

  const projects = [
    {
      title: 'Ola Driver Churn Prediction  |  Python • Pandas • Seaborn • Machine Learning • EDA',
      period: 'Apr 2026 – May 2026',
      points: [
        'Analyzed 19,000+ driver records using EDA, correlation heatmaps, and statistical visualizations to identify key churn factors.',
        'Engineered 6 custom features (tenure months, income stability, grade change) to improve model predictive performance.',
        'Built Random Forest model achieving 92.99% accuracy and AUC-ROC of 0.963, validated via 5-fold cross-validation.',
        'Delivered 6 business recommendations (onboarding, rating alerts, incentive campaigns) to reduce driver churn.',
      ]
    },
    {
      title: 'Blinkit Sales Analysis  |  SQL • Power BI • Excel • KPI Analysis • Dashboard',
      period: 'Mar 2026 – Apr 2026',
      points: [
        'Cleaned and standardized 50,000+ Blinkit sales records using SQL queries, eliminating inconsistencies across Item_Fat_Content and other fields.',
        'Performed KPI analysis — Total Sales, Average Sales, Number of Items, Average Rating — using aggregate and window functions.',
        'Built interactive Power BI dashboard with KPI cards, pie/bar charts, and sales trend analysis across outlet types and locations.',
        'Delivered business insights on sales by fat content, item type, outlet size, and outlet performance to support data-driven decisions.',
      ]
    },
    {
      title: 'Customer Data Analysis & Segmentation  |  Python • Pandas • Scikit-learn • Matplotlib',
      period: 'Jan 2026 – Feb 2026',
      points: [
        'Designed and implemented an end-to-end data analysis pipeline including data cleaning, transformation, and visualization.',
        'Developed a customer segmentation model using KMeans clustering to identify 3 distinct customer groups.',
        'Built insightful visualizations to analyze customer behavior including income, age, and spending patterns.',
        'Applied statistical testing to validate data distribution and segmentation effectiveness.',
        'Delivered actionable insights to support targeted marketing strategies.',
      ]
    },
    {
      title: 'Contact Management Application  |  Python • Streamlit',
      period: 'Nov 2025 – Dec 2025',
      points: [
        'Developed an interactive web-based application using Streamlit for managing contact data.',
        'Implemented CRUD operations with efficient file handling and persistent storage.',
        'Designed a user-friendly interface with input validation and clean UX.',
        'Demonstrated ability to build end-to-end Python-based applications.',
      ]
    },
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="relative py-16 px-4 text-center border-b border-zinc-800 bg-gradient-to-b from-cyan-900/10 to-transparent overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-violet-600 to-cyan-600 pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="tag mb-4 inline-block">📄 Resume</span>
          <h1 className="text-5xl font-black text-white mb-4">
            My <span className="gradient-text">Resume</span>
          </h1>
          <p className="text-zinc-400 text-xl mb-8">ATS-optimized professional resume</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/static/resume.pdf" download className="btn-primary">
              <FiDownload /> Download PDF
            </a>
            <a href="https://www.linkedin.com/in/rushikeshdavange/" target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <FiExternalLink /> View LinkedIn
            </a>
            <Link
              href="/admin/login"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-violet-500/50 bg-violet-500/10 text-violet-300 hover:bg-violet-500/25 hover:border-violet-400 hover:-translate-y-0.5 transition-all duration-200 font-semibold text-sm"
            >
              <FiEdit2 size={15} /> Edit Resume
            </Link>
          </div>
        </div>
      </section>

      {/* Resume Preview */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="glass-card p-8 md:p-12 space-y-10">

          {/* Name / Contact */}
          <div className="text-center border-b border-zinc-700 pb-8">
            <h2 className="text-3xl font-black text-white mb-2">RUSHIKESH DAVANGE</h2>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-zinc-400 text-sm">
              <span>9423880393</span>
              <span>|</span>
              <a href="mailto:rushikeshdavange9@gmail.com" className="hover:text-cyan-400 transition-colors">rushikeshdavange9@gmail.com</a>
              <span>|</span>
              <a href="https://linkedin.com/in/rushikeshdavange" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">LinkedIn</a>
              <span>|</span>
              <a href="https://github.com/davange-rushikesh" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">GitHub</a>
              <span>|</span>
              <a href="https://kaggle.com/rushidavange" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Kaggle</a>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h3 className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-3 border-b border-zinc-800 pb-2">Professional Summary</h3>
            <p className="text-zinc-300 leading-relaxed">
              Data Analyst with strong expertise in Python and data science techniques, experienced in building analytical solutions
              and data-driven applications. Skilled in exploratory data analysis (EDA), machine learning, and data visualization.
              Hands-on experience in developing interactive dashboards using Power BI and web applications using Streamlit.
              Passionate about transforming data into actionable insights and contributing to scalable data science products.
            </p>
          </div>

          {/* Technical Skills */}
          <div>
            <h3 className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-4 border-b border-zinc-800 pb-2">Technical Skills</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(skills).map(([cat, items]) => (
                <div key={cat} className="flex flex-wrap gap-1">
                  <span className="text-white font-semibold text-sm">{cat}:</span>
                  <span className="text-zinc-400 text-sm">{items.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h3 className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-4 border-b border-zinc-800 pb-2">Projects</h3>
            <div className="space-y-5">
              {projects.map(({ title, period, points }) => (
                <div key={title} className="p-4 rounded-xl border border-zinc-700/60 bg-zinc-800/30 hover:border-cyan-500/30 transition-all duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 gap-1">
                    <h4 className="text-white font-bold text-sm leading-snug">{title}</h4>
                    <span className="text-zinc-500 text-xs font-mono flex-shrink-0 mt-0.5">{period}</span>
                  </div>
                  <ul className="space-y-1.5">
                    {points.map((p, i) => (
                      <li key={i} className="flex items-start gap-2 text-zinc-400 text-sm">
                        <FiCheckCircle className="text-violet-400 flex-shrink-0 mt-0.5" size={13} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-4 border-b border-zinc-800 pb-2">Education</h3>
            <div className="p-4 rounded-xl border border-zinc-700/60 bg-zinc-800/30">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
                <div>
                  <h4 className="text-white font-bold">Bachelor of Computer Applications (BCA) – Computer Science</h4>
                  <p className="text-zinc-400 text-sm mt-1">Shivaji Arts, Commerce & Science College, Kannad</p>
                  <p className="text-zinc-500 text-xs">Dr. Babasaheb Ambedkar Marathwada University</p>
                </div>
                <div className="text-right flex-shrink-0 mt-1">
                  <div className="text-zinc-300 text-sm font-mono">2022 – 2025</div>
                  <div className="text-violet-400 text-sm font-semibold">CGPA: 68.5%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 text-center glass-card p-6 bg-cyan-500/5 border-cyan-500/20">
          <p className="text-zinc-400 mb-4">Want the full formatted resume as a PDF?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/static/resume.pdf" download className="btn-primary">
              <FiDownload /> Download Full Resume (PDF)
            </a>
            <Link
              href="/admin/login"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-violet-500/50 bg-violet-500/10 text-violet-300 hover:bg-violet-500/25 hover:border-violet-400 hover:-translate-y-0.5 transition-all duration-200 font-semibold text-sm"
            >
              <FiEdit2 size={15} /> Edit Resume
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
