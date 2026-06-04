import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'Rushikesh Davange | Data Scientist & ML Engineer',
  description: 'Full Stack Data Scientist skilled in Python, Machine Learning, EDA, Streamlit and AI. View my projects, skills, and get in touch.',
  keywords: 'Data Scientist, ML Engineer, Python, Pandas, Scikit-learn, Streamlit, AI, Machine Learning, Portfolio',
  authors: [{ name: 'Rushikesh Davange' }],
  openGraph: {
    title: 'Rushikesh Davange | Data Scientist & ML Engineer',
    description: 'Building data-driven products with Python, ML, and AI.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-dark-900 text-white min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            style: { background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(99,102,241,0.3)' },
          }}
        />
      </body>
    </html>
  )
}
