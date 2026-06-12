export const profile = {
  name: 'Rushikesh Davange',
  role: 'Data Analyst | Data Scientist | ML Enthusiast',
  bio: 'Passionate Data Analyst and aspiring Data Scientist skilled in Python, Machine Learning, Data Visualization, and AI-driven solutions. Focused on transforming raw data into meaningful insights and impactful business solutions.',
  email: 'rushikeshdavange9@gmail.com',
  phone: '+91 9423880393',
  location: 'Maharashtra, India',
  resume: '/resume.pdf',
  profileImage: '/rushi.jpeg',
  socials: {
    github: 'https://github.com/davange-rushikesh',
    linkedin: 'https://www.linkedin.com/in/rushikeshdavange/',
    instagram: 'https://www.instagram.com/call_me_rushi_103/',
    kaggle: 'https://www.kaggle.com/rushidavange'
  },
  skills: [
    'Python',
    'Pandas',
    'NumPy',
    'Machine Learning',
    'Data Analysis',
    'Data Visualization',
    'Matplotlib',
    'Seaborn',
    'Scikit-learn',
    'Streamlit',
    'CRUD Operations',
    'File Handling',
    'HTML',
    'CSS',
    'JavaScript',
    'React'
  ],
  projects: [
    {
      name: 'Customer Data Analysis and Segmentation using Python',
      duration: 'Jan 2026 – Feb 2026',
      description: 'Performed EDA on 1,000+ customer records. Identified data quality issues and customer behavior patterns. Built 3 customer segments using KMeans clustering. Created visualizations using Matplotlib and Seaborn. Applied statistical tests including t-test and Anderson-Darling.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      liveLink: 'https://customer-analysis-demo.streamlit.app',
      githubLink: 'https://github.com/davange-rushikesh/customer-segmentation',
      tech: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Scikit-learn']
    },
    {
      name: 'Contact Book Application using Python',
      duration: 'Nov 2025 – Dec 2025',
      description: 'Built interactive contact management app using Python and Streamlit. Implemented CRUD operations: Add, Search, View, Delete contacts. Added persistent file-based storage. Added validation and efficient handling for 100+ records.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop',
      liveLink: 'https://contact-book-demo.streamlit.app',
      githubLink: 'https://github.com/davange-rushikesh/contact-book',
      tech: ['Python', 'Streamlit', 'File Handling']
    },
    {
      name: 'Ola Driver Churn Prediction',
      duration: 'Oct 2025 – Nov 2025',
      description: 'Machine learning model to predict driver churn using historical data, feature engineering, and ensemble methods. Achieved 89% accuracy with Random Forest algorithm and deployed interactive dashboard for real-time predictions.',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
      liveLink: 'https://ola-churn-prediction.streamlit.app',
      githubLink: 'https://github.com/davange-rushikesh/ola-driver-churn',
      tech: ['Python', 'Machine Learning', 'Streamlit', 'Random Forest']
    }
  ],
  experience: [] as { year: string; title: string; company: string; details: string }[],
  services: [
    {
      title: 'Data Analysis & Visualization',
      description: 'Transform raw data into compelling stories with interactive dashboards and advanced analytics.'
    },
    {
      title: 'Machine Learning Solutions',
      description: 'Build predictive models and AI solutions to solve complex business problems.'
    },
    {
      title: 'Business Intelligence',
      description: 'Create comprehensive BI solutions with Power BI, Tableau, and custom analytics platforms.'
    }
  ],
  certifications: [
    {
      title: 'Deloitte Data Analytics Certification',
      issuer: 'Deloitte',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop'
    }
  ],
  education: [
    {
      degree: 'B.Tech in Computer Science',
      institution: 'Mumbai University',
      year: '2021',
      grade: 'First Class',
      image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400&h=300&fit=crop'
    }
  ]
};