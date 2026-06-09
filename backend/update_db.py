from database import SessionLocal
import models

db = SessionLocal()

# Update Blinkit Image
blinkit = db.query(models.Project).filter(models.Project.title == "Blinkit Sales Analysis").first()
if blinkit:
    blinkit.image_url = "https://images.unsplash.com/photo-1556761175-5973dc0f32b7?w=800"

# Add Ola Driver Churn
ola = models.Project(
    title="Ola Driver Churn Prediction",
    slug="ola-driver-churn-prediction",
    summary="Predictive model using Random Forest to identify key factors leading to driver churn, achieving 92.99% accuracy.",
    description="• Analyzed 19,000+ driver records using EDA, correlation heatmaps, and statistical visualizations to identify key churn factors.\n• Engineered 6 custom features (tenure months, income stability, grade change) to improve model predictive performance.\n• Built Random Forest model achieving 92.99% accuracy and AUC-ROC of 0.963, validated via 5-fold cross-validation.\n• Delivered 6 business recommendations (onboarding, rating alerts, incentive campaigns) to reduce driver churn.",
    problem_statement="High driver churn rate impacts service availability and increases onboarding costs. The goal is to predict which drivers are likely to churn.",
    approach="Performed extensive EDA, feature engineering (tenure, income stability), and trained a Random Forest model with 5-fold cross-validation.",
    outcome="Achieved 92.99% accuracy. Delivered actionable recommendations such as rating alerts and incentive campaigns.",
    image_url="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800",
    github_url="",
    demo_url="",
    category="Machine Learning",
    stack="Python,Pandas,Seaborn,Machine Learning,EDA",
    is_featured=True,
    sort_order=1
)

db.add(ola)
db.commit()
print("DB Updates Completed!")
db.close()
