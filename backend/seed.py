"""
Seed script — run once to populate the database with realistic portfolio data.
Run: python seed.py
"""
from database import SessionLocal, engine, Base
import models
from auth import get_password_hash
from datetime import datetime

Base.metadata.create_all(bind=engine)
db = SessionLocal()


def seed():
    print("Seeding database...")

    # ── Admin User ────────────────────────────────────────────────────────────
    if not db.query(models.AdminUser).first():
        admin = models.AdminUser(
            username="admin",
            email="rushikeshdavange9@gmail.com",
            hashed_password=get_password_hash("admin123")
        )
        db.add(admin)
        db.commit()
        print("Admin user created (username: admin / password: admin123)")

    # ── Profile ───────────────────────────────────────────────────────────────
    if not db.query(models.Profile).first():
        profile = models.Profile(
            name="Rushikesh Davange",
            headline="Data Analyst | ML Engineer | Full Stack Data Scientist",
            short_bio="Transforming raw data into actionable business insights. Passionate about ML, AI, and building end-to-end data-driven products.",
            bio="""I'm Rushikesh Davange — a Data Analyst and aspiring Full Stack Data Scientist based in India.
I specialize in Python-based data analysis, machine learning, and building Streamlit web applications.
With a strong foundation in EDA, feature engineering, and model building, I love turning messy datasets into clear, impactful stories.
Currently pursuing Full Stack Data Science with AI, I'm on a mission to become a well-rounded ML/AI Engineer who can build
production-ready data products from end to end — from data ingestion to model deployment.""",
            avatar_url="https://avatars.githubusercontent.com/davange-rushikesh",
            resume_url="/static/resume.pdf",
            email="rushikeshdavange9@gmail.com",
            phone="9423880393",
            location="Aurangabad, Maharashtra, India",
            years_experience="1+",
            projects_count=6,
            certifications_count=3,
            open_to_work=True
        )
        db.add(profile)
        db.commit()
        db.refresh(profile)

        # Social links
        socials = [
            {"platform": "GitHub", "url": "https://github.com/davange-rushikesh", "icon": "github"},
            {"platform": "LinkedIn", "url": "https://www.linkedin.com/in/rushikeshdavange/", "icon": "linkedin"},
            {"platform": "Kaggle", "url": "https://www.kaggle.com/rushidavange", "icon": "kaggle"},
            {"platform": "Email", "url": "mailto:rushikeshdavange9@gmail.com", "icon": "mail"},
        ]
        for s in socials:
            db.add(models.SocialLink(profile_id=profile.id, **s))
        db.commit()
        print("Profile + social links created")

    # ── Skills ────────────────────────────────────────────────────────────────
    if not db.query(models.Skill).first():
        skills_data = [
            # Programming
            {"name": "Python", "category": "Programming", "level": 88, "icon": "🐍", "sort_order": 1},
            {"name": "SQL", "category": "Programming", "level": 75, "icon": "🗄️", "sort_order": 2},
            {"name": "JavaScript", "category": "Programming", "level": 55, "icon": "⚡", "sort_order": 3},
            # Data & ML
            {"name": "Pandas", "category": "Data & ML", "level": 90, "icon": "🐼", "sort_order": 4},
            {"name": "NumPy", "category": "Data & ML", "level": 85, "icon": "🔢", "sort_order": 5},
            {"name": "Scikit-learn", "category": "Data & ML", "level": 82, "icon": "🤖", "sort_order": 6},
            {"name": "EDA", "category": "Data & ML", "level": 90, "icon": "🔍", "sort_order": 7},
            {"name": "Feature Engineering", "category": "Data & ML", "level": 80, "icon": "⚙️", "sort_order": 8},
            {"name": "Machine Learning", "category": "Data & ML", "level": 78, "icon": "🧠", "sort_order": 9},
            # Visualization
            {"name": "Matplotlib", "category": "Visualization", "level": 85, "icon": "📊", "sort_order": 10},
            {"name": "Seaborn", "category": "Visualization", "level": 85, "icon": "📈", "sort_order": 11},
            {"name": "Power BI", "category": "Visualization", "level": 70, "icon": "💡", "sort_order": 12},
            # Tools & Deployment
            {"name": "Streamlit", "category": "Tools & Deployment", "level": 88, "icon": "🚀", "sort_order": 13},
            {"name": "FastAPI", "category": "Tools & Deployment", "level": 72, "icon": "⚡", "sort_order": 14},
            {"name": "Git & GitHub", "category": "Tools & Deployment", "level": 80, "icon": "🐙", "sort_order": 15},
            {"name": "Jupyter Notebook", "category": "Tools & Deployment", "level": 92, "icon": "📓", "sort_order": 16},
            {"name": "VS Code", "category": "Tools & Deployment", "level": 88, "icon": "💻", "sort_order": 17},
            # Statistics
            {"name": "Hypothesis Testing", "category": "Statistics", "level": 75, "icon": "📐", "sort_order": 18},
            {"name": "Statistical Analysis", "category": "Statistics", "level": 78, "icon": "📏", "sort_order": 19},
        ]
        for s in skills_data:
            db.add(models.Skill(**s))
        db.commit()
        print("Skills created")

    # ── Projects ──────────────────────────────────────────────────────────────
    if not db.query(models.Project).first():
        projects_data = [
            {
                "title": "Customer Segmentation & Analysis",
                "slug": "customer-segmentation",
                "summary": "End-to-end ML pipeline that segments customers into distinct groups using KMeans clustering to drive targeted marketing strategies.",
                "description": "Built a complete customer segmentation system using KMeans clustering on a retail dataset. The pipeline includes data cleaning, EDA, feature engineering, model building, and interactive visualizations. Identified 3 customer segments — high-value, mid-range, and budget shoppers — enabling personalized marketing campaigns.",
                "problem_statement": "A retail business struggles to personalize marketing campaigns due to a lack of customer insights. The goal is to segment customers based on spending behavior, income, and demographic data.",
                "approach": "Applied KMeans clustering after extensive EDA and feature engineering. Used the Elbow Method and Silhouette Score to find the optimal number of clusters. Visualized clusters using 2D scatter plots.",
                "outcome": "Identified 3 distinct customer segments. High-value customers (top 20%) drove 60% of revenue. Provided actionable recommendations for targeted campaigns per segment.",
                "image_url": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
                "github_url": "https://github.com/davange-rushikesh/customer-segmentation",
                "demo_url": "",
                "category": "Machine Learning",
                "stack": "Python,Pandas,NumPy,Scikit-learn,Matplotlib,Seaborn,Jupyter",
                "is_featured": True,
                "sort_order": 1
            },
            {
                "title": "Contact Management App",
                "slug": "contact-management-app",
                "summary": "A full-featured Streamlit web application for managing contacts with CRUD operations, data persistence, and a clean intuitive UI.",
                "description": "Developed an interactive web application using Streamlit for managing contact data. Features full CRUD operations, CSV-based persistent storage, search and filter functionality, and a clean UX with form validation.",
                "problem_statement": "Manual contact management using spreadsheets is error-prone and inefficient. A web app with CRUD operations and persistent storage solves this problem.",
                "approach": "Built using Streamlit for the UI layer, with CSV file handling for data persistence. Implemented form validation, real-time search, and a clean multi-page layout.",
                "outcome": "Deployed interactive app demonstrating full-stack Python development ability. Shows practical Streamlit skills applicable for rapid data product prototyping.",
                "image_url": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
                "github_url": "https://github.com/davange-rushikesh/contact-management",
                "demo_url": "",
                "category": "Full Stack",
                "stack": "Python,Streamlit,Pandas,CSV",
                "is_featured": True,
                "sort_order": 2
            },
            {
                "title": "Spam Email Classifier",
                "slug": "spam-email-classifier",
                "summary": "NLP-based binary classifier that detects spam emails with 97%+ accuracy using TF-IDF vectorization and Naive Bayes.",
                "description": "Built an end-to-end spam detection pipeline using NLP techniques. Preprocessed email text with tokenization, stopword removal, and stemming. Used TF-IDF for feature extraction and Naive Bayes for classification. Wrapped in a Streamlit app for real-time predictions.",
                "problem_statement": "Email spam causes productivity loss and security risks. An automated classifier that accurately distinguishes spam from legitimate emails is essential.",
                "approach": "Text preprocessing → TF-IDF vectorization → Naive Bayes classifier. Evaluated with precision, recall, F1-score. Deployed as a Streamlit web app.",
                "outcome": "Achieved 97.2% accuracy on test set. Precision of 98%, Recall of 95%. Real-time prediction available via Streamlit demo.",
                "image_url": "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800",
                "github_url": "https://github.com/davange-rushikesh/spam-classifier",
                "demo_url": "",
                "category": "NLP / ML",
                "stack": "Python,Scikit-learn,NLTK,TF-IDF,Streamlit,Pandas",
                "is_featured": True,
                "sort_order": 3
            },
            {
                "title": "Sales Analytics Dashboard",
                "slug": "sales-analytics-dashboard",
                "summary": "Interactive Power BI + Python sales dashboard with KPIs, trend analysis, and regional breakdown for business decision-making.",
                "description": "Created a comprehensive sales analytics dashboard using Python for data processing and Power BI for interactive visualization. Covers monthly trends, product performance, regional sales, and YoY growth tracking.",
                "problem_statement": "Sales managers lack a unified view of performance metrics, making it hard to identify trends and make data-driven decisions quickly.",
                "approach": "Cleaned and transformed raw sales data with Pandas. Built KPI metrics (revenue, growth %, top products). Visualized in Power BI with interactive slicers.",
                "outcome": "Dashboard reduces reporting time by 80%. Highlights top 3 performing regions and bottom 5 products. Used by simulated management team for monthly reviews.",
                "image_url": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
                "github_url": "https://github.com/davange-rushikesh/sales-dashboard",
                "demo_url": "",
                "category": "Data Analysis",
                "stack": "Python,Pandas,Power BI,Matplotlib,Seaborn,Excel",
                "is_featured": True,
                "sort_order": 4
            },
            {
                "title": "AI Resume Analyzer",
                "slug": "ai-resume-analyzer",
                "summary": "LLM-powered resume analyzer that scores resumes, extracts skills, and gives ATS optimization tips using GPT API + Streamlit.",
                "description": "Built an intelligent resume analysis tool using GPT API for NLP-based feedback. Parses uploaded PDFs, extracts skills and experience, scores ATS compatibility, and provides actionable improvement suggestions.",
                "problem_statement": "Job seekers often submit poorly optimized resumes that fail ATS screening. An AI tool that analyzes and improves resumes can significantly boost job application success.",
                "approach": "PDF parsing with PyPDF2 → GPT API for analysis → Streamlit UI for results. Features ATS score, missing keywords, formatting tips, and skill gap analysis.",
                "outcome": "Analyzes resumes in under 5 seconds. Provides structured feedback. Demonstrates practical LLM integration and end-to-end Python product development.",
                "image_url": "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800",
                "github_url": "https://github.com/davange-rushikesh/ai-resume-analyzer",
                "demo_url": "",
                "category": "AI / LLM",
                "stack": "Python,OpenAI GPT,Streamlit,PyPDF2,Pandas",
                "is_featured": False,
                "sort_order": 5
            },
            {
                "title": "Movie Recommendation System",
                "slug": "movie-recommendation-system",
                "summary": "Content-based filtering recommendation engine that suggests movies based on genre, cast, and user preferences with Streamlit UI.",
                "description": "Built a movie recommendation system using content-based filtering with cosine similarity. Processed the TMDB dataset, engineered features from genres, cast, director, and keywords. Deployed as a Streamlit web application with instant recommendations.",
                "problem_statement": "Users waste time browsing streaming platforms searching for movies they'll enjoy. A smart recommendation system solves the content discovery problem.",
                "approach": "TF-IDF vectorization on movie metadata → Cosine Similarity matrix → Top-N recommendations. Streamlit UI for user interaction.",
                "outcome": "Recommends 10 similar movies instantly. Processes 5,000+ movies from TMDB dataset. Clean Streamlit UI with movie posters and descriptions.",
                "image_url": "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800",
                "github_url": "https://github.com/davange-rushikesh/movie-recommender",
                "demo_url": "",
                "category": "Machine Learning",
                "stack": "Python,Scikit-learn,Pandas,TMDB API,Streamlit",
                "is_featured": False,
                "sort_order": 6
            },
        ]
        for p in projects_data:
            db.add(models.Project(**p))
        db.commit()
        print("Projects created")

    # ── Blogs ─────────────────────────────────────────────────────────────────
    if not db.query(models.Blog).first():
        blogs_data = [
            {
                "title": "KNN Algorithm Explained Simply — With Python Code",
                "slug": "knn-explained-simply",
                "summary": "Break down the k-Nearest Neighbors algorithm with clear intuition, visualizations, and complete Python implementation from scratch.",
                "content": """# KNN Explained Simply

K-Nearest Neighbors (KNN) is one of the most intuitive ML algorithms. Here's the core idea:

> **"Tell me who your neighbors are, and I'll tell you who you are."**

## How it Works

1. Take a new data point
2. Calculate its distance to ALL training points
3. Pick the K closest neighbors
4. Majority vote → that's the prediction

## When to Use KNN
- Small to medium datasets
- Non-linear boundaries
- No training phase needed

## Python Implementation
```python
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# Train model
knn = KNeighborsClassifier(n_neighbors=5)
knn.fit(X_train, y_train)

# Predict
y_pred = knn.predict(X_test)
print(f"Accuracy: {accuracy_score(y_test, y_pred):.2%}")
```

## Key Hyperparameter: K
- Small K → low bias, high variance (overfitting risk)
- Large K → high bias, low variance (underfitting risk)
- Use cross-validation to find the best K!
""",
                "cover_image": "https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=800",
                "tags": "machine-learning,python,knn,algorithms",
                "is_published": True,
                "read_time": 6
            },
            {
                "title": "Bias vs Variance — The Tradeoff Every Data Scientist Must Know",
                "slug": "bias-vs-variance-tradeoff",
                "summary": "Understand the most fundamental concept in ML: the bias-variance tradeoff, with practical examples and solutions.",
                "content": """# Bias vs Variance Tradeoff

The **bias-variance tradeoff** is the balance a model must strike to generalize well on unseen data.

## Bias
- Error from wrong assumptions in the learning algorithm
- High bias → underfitting → model is too simple
- Example: Using linear regression on non-linear data

## Variance
- Error from sensitivity to small fluctuations in training data
- High variance → overfitting → model memorizes training data
- Example: Deep decision tree with no pruning

## The Sweet Spot
```
Total Error = Bias² + Variance + Irreducible Noise
```

| Model | Bias | Variance |
|-------|------|----------|
| Linear Regression | High | Low |
| Deep Decision Tree | Low | High |
| Random Forest | Low | Medium |

## Solutions
- **High Bias**: More features, more complex model, less regularization
- **High Variance**: More data, regularization (L1/L2), ensemble methods, dropout
""",
                "cover_image": "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800",
                "tags": "machine-learning,bias,variance,deep-learning",
                "is_published": True,
                "read_time": 8
            },
            {
                "title": "Feature Engineering Tips That Improved My Model Accuracy by 15%",
                "slug": "feature-engineering-tips",
                "summary": "Practical feature engineering techniques I applied in real projects — from handling missing values to creating interaction features.",
                "content": """# Feature Engineering Tips

Feature engineering is often the difference between a good model and a great one.

## 1. Handle Missing Values Smartly
```python
# Don't just fill with mean blindly
df['age'].fillna(df.groupby('gender')['age'].transform('median'), inplace=True)
```

## 2. Create Interaction Features
```python
df['income_per_age'] = df['income'] / df['age']
df['spending_ratio'] = df['spending_score'] / df['annual_income']
```

## 3. Log Transformation for Skewed Data
```python
import numpy as np
df['log_income'] = np.log1p(df['annual_income'])
```

## 4. Binning Continuous Features
```python
df['age_group'] = pd.cut(df['age'], bins=[0,25,35,50,100], labels=['Young','Adult','Middle','Senior'])
```

## 5. Target Encoding for High Cardinality
```python
target_mean = df.groupby('city')['target'].mean()
df['city_encoded'] = df['city'].map(target_mean)
```

These techniques alone improved my Customer Segmentation model's Silhouette Score by 15%!
""",
                "cover_image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
                "tags": "feature-engineering,machine-learning,python,pandas",
                "is_published": True,
                "read_time": 7
            },
        ]
        for b in blogs_data:
            db.add(models.Blog(**b))
        db.commit()
        print("Blog posts created")

    # ── Case Studies ──────────────────────────────────────────────────────────
    if not db.query(models.CaseStudy).first():
        cs_data = [
            {
                "title": "How KMeans Clustering Uncovered 3 Hidden Customer Segments",
                "slug": "customer-segmentation-case-study",
                "client_industry": "Retail / E-commerce",
                "problem": "A retail company had 10,000+ customers but treated everyone the same in marketing campaigns. Conversion rates were low (2.3%) and CAC was high.",
                "approach": "Used KMeans clustering on RFM (Recency, Frequency, Monetary) features after thorough EDA. Applied Elbow Method and Silhouette Score to find K=3 as optimal clusters.",
                "insights": "Segment 1 (Champions): 18% of customers, 54% of revenue. Segment 2 (At-Risk): High past value but haven't purchased in 90+ days. Segment 3 (New): Low spend but high engagement potential.",
                "impact": "Targeted winback campaign for At-Risk segment resulted in 31% re-engagement. Champions segment received loyalty perks → 22% increase in average order value. Overall campaign ROI improved 3.2x.",
                "tools_used": "Python, Pandas, Scikit-learn, Matplotlib, Seaborn",
                "image_url": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
                "is_featured": True
            },
        ]
        for c in cs_data:
            db.add(models.CaseStudy(**c))
        db.commit()
        print("Case studies created")

    # ── AI Projects ───────────────────────────────────────────────────────────
    if not db.query(models.AIProject).first():
        ai_data = [
            {
                "title": "AI Resume Analyzer & ATS Optimizer",
                "slug": "ai-resume-analyzer-llm",
                "summary": "GPT-powered resume analyzer that scores ATS compatibility, extracts skills, and provides improvement suggestions.",
                "description": "End-to-end LLM application that parses resumes, analyzes content with GPT, and provides structured feedback including ATS score, missing keywords, and formatting recommendations.",
                "tools": "Python,OpenAI GPT-4,Streamlit,PyPDF2,LangChain",
                "architecture": "PDF Upload → Text Extraction (PyPDF2) → Prompt Engineering → GPT-4 API → Structured JSON Response → Streamlit Display",
                "github_url": "https://github.com/davange-rushikesh/ai-resume-analyzer",
                "demo_url": "",
                "image_url": "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800",
                "category": "LLM"
            },
        ]
        for a in ai_data:
            db.add(models.AIProject(**a))
        db.commit()
        print("AI projects created")

    print("\nSeeding complete! Your portfolio database is ready.")
    print("Admin login -> username: admin | password: admin123")


if __name__ == "__main__":
    seed()
    db.close()
