from database import SessionLocal
import models

db = SessionLocal()

project = models.Project(
    title="Blinkit Sales Analysis",
    slug="blinkit-sales-analysis",
    summary="Data cleaning and KPI analysis of 50,000+ Blinkit sales records with an interactive Power BI dashboard.",
    description="• Cleaned and standardized 50,000+ Blinkit sales records using SQL queries, eliminating inconsistencies across Item_Fat_Content and other fields.\n• Performed KPI analysis — Total Sales, Average Sales, Number of Items, Average Rating — using aggregate and window functions.\n• Built interactive Power BI dashboard with KPI cards, pie/bar charts, and sales trend analysis across outlet types and locations.\n• Delivered business insights on sales by fat content, item type, outlet size, and outlet performance to support data-driven decisions.",
    problem_statement="Blinkit needs to analyze their sales data to understand outlet performance, item fat content impact, and sales trends.",
    approach="Data cleaning using SQL, KPI calculations using SQL aggregate and window functions, and interactive dashboard creation using Power BI.",
    outcome="Delivered actionable business insights on sales by fat content, item type, outlet size, and outlet performance to support data-driven decisions.",
    image_url="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    github_url="",
    demo_url="",
    category="Data Analysis",
    stack="SQL,Power BI,Excel",
    is_featured=True,
    sort_order=7
)

db.add(project)
db.commit()
print("Blinkit project added successfully!")
db.close()
