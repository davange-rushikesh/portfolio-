import { AdminData } from '../types/admin';

export const defaultAdminData: AdminData = {
  profile: {
    name: 'Rushikesh Davange',
    role: 'Data Analyst | Data Scientist | ML Enthusiast',
    phone: '+91 9423880393',
    location: 'Maharashtra, India',
    careerObjective: 'Premium AI and data science portfolio experience for recruiters.',
    currentLearning: 'Building predictive analytics and visualization systems.',
    bio: 'Passionate Data Analyst and aspiring Data Scientist skilled in Python, Machine Learning, Data Visualization, and AI-driven solutions. Focused on transforming raw data into meaningful insights and impactful business solutions.',
    profileImage: '/rushi.jpeg',
    resume: '/resume.pdf'
  },
  socials: {
    github: 'https://github.com/davange-rushikesh',
    linkedin: 'https://www.linkedin.com/in/rushikeshdavange/',
    instagram: 'https://www.instagram.com/call_me_rushi_103/',
    kaggle: 'https://www.kaggle.com/rushidavange',
    email: 'rushikeshdavange9@gmail.com'
  },
  skills: [
    {
      id: 'skill-1',
      name: 'Python',
      progress: 95,
      category: 'Data Analysis',
      description: 'Advanced data processing, automation scripts, and mathematical modeling.'
    },
    {
      id: 'skill-2',
      name: 'Pandas',
      progress: 90,
      category: 'Data Analysis',
      description: 'Data wrangling, cleaning, merging, and grouping complex datasets.'
    },
    {
      id: 'skill-3',
      name: 'NumPy',
      progress: 85,
      category: 'Data Analysis',
      description: 'High-performance mathematical computing and multi-dimensional array operations.'
    },
    {
      id: 'skill-4',
      name: 'Machine Learning',
      progress: 82,
      category: 'Machine Learning',
      description: 'Supervised/unsupervised models, predictive analytics, and model evaluation.'
    },
    {
      id: 'skill-5',
      name: 'Data Analysis',
      progress: 92,
      category: 'Data Analysis',
      description: 'Statistical methods, exploratory data analysis, and insights generation.'
    },
    {
      id: 'skill-6',
      name: 'Data Visualization',
      progress: 88,
      category: 'Data Analysis',
      description: 'Creating stunning dashboards, plotting trends, and visual storytelling.'
    },
    {
      id: 'skill-7',
      name: 'Matplotlib',
      progress: 85,
      category: 'Data Analysis',
      description: 'Static, animated, and interactive plotting structures.'
    },
    {
      id: 'skill-8',
      name: 'Seaborn',
      progress: 84,
      category: 'Data Analysis',
      description: 'Statistical graphics and high-level interface visualization.'
    },
    {
      id: 'skill-9',
      name: 'Scikit-learn',
      progress: 80,
      category: 'Machine Learning',
      description: 'Supervised classification, regression pipelines, and features engineering.'
    },
    {
      id: 'skill-10',
      name: 'Streamlit',
      progress: 78,
      category: 'Backend',
      description: 'Building interactive data web apps and quick ML prototypes.'
    },
    {
      id: 'skill-11',
      name: 'CRUD Operations',
      progress: 80,
      category: 'Backend',
      description: 'Managing persistent databases using Create, Read, Update, and Delete operations.'
    },
    {
      id: 'skill-12',
      name: 'File Handling',
      progress: 82,
      category: 'Backend',
      description: 'Reading, writing, and parsing CSV, JSON, and text files efficiently.'
    },
    {
      id: 'skill-13',
      name: 'HTML',
      progress: 75,
      category: 'Frontend',
      description: 'Structuring responsive and semantic page layouts.'
    },
    {
      id: 'skill-14',
      name: 'CSS',
      progress: 72,
      category: 'Frontend',
      description: 'Tailwind CSS, animations, glassmorphism UI, and responsive grids.'
    },
    {
      id: 'skill-15',
      name: 'JavaScript',
      progress: 70,
      category: 'Frontend',
      description: 'Dynamic scripting, state manipulation, and event handling.'
    },
    {
      id: 'skill-16',
      name: 'React',
      progress: 68,
      category: 'Frontend',
      description: 'Hooks, state management, and component-based UI structures.'
    }
  ],
  projects: [
    {
      id: 'project-1',
      title: 'Customer Data Analysis and Segmentation using Python',
      duration: 'Jan 2026 – Feb 2026',
      description: 'Performed EDA on 1,000+ customer records. Identified data quality issues and customer behavior patterns. Built 3 customer segments using KMeans clustering. Created visualizations using Matplotlib and Seaborn. Applied statistical tests including t-test and Anderson-Darling.',
      githubLink: 'https://github.com/davange-rushikesh/customer-segmentation',
      liveLink: 'https://customer-analysis-demo.streamlit.app',
      tech: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Scikit-learn'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      featured: true
    },
    {
      id: 'project-2',
      title: 'Contact Book Application using Python',
      duration: 'Nov 2025 – Dec 2025',
      description: 'Built interactive contact management app using Python and Streamlit. Implemented CRUD operations: Add, Search, View, Delete contacts. Added persistent file-based storage. Added validation and efficient handling for 100+ records.',
      githubLink: 'https://github.com/davange-rushikesh/contact-book',
      liveLink: 'https://contact-book-demo.streamlit.app',
      tech: ['Python', 'Streamlit', 'File Handling'],
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop',
      featured: true
    },
    {
      id: 'project-3',
      title: 'Ola Driver Churn Prediction',
      duration: 'Oct 2025 – Nov 2025',
      description: 'Machine learning model to predict driver churn using historical data, feature engineering, and ensemble methods. Achieved 89% accuracy with Random Forest algorithm and deployed interactive dashboard for real-time predictions.',
      githubLink: 'https://github.com/davange-rushikesh/ola-driver-churn',
      liveLink: 'https://ola-churn-prediction.streamlit.app',
      tech: ['Python', 'Machine Learning', 'Streamlit', 'Random Forest'],
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
      featured: false
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      title: 'Deloitte Data Analytics Certification',
      issuer: 'Deloitte',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop'
    }
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'B.Tech in Computer Science',
      institution: 'Mumbai University',
      year: '2021',
      grade: 'First Class',
      image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400&h=300&fit=crop'
    }
  ]
};
