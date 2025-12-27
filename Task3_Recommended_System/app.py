from flask import Flask, render_template, request
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

# ================= PRODUCT DATA =================
data = [
    # ===== LAPTOPS =====
    ("Laptop", "Dell Inspiron 15", "lightweight laptop intel i5 ssd office work"),
    ("Laptop", "HP Pavilion Gaming", "gaming laptop high performance graphics"),
    ("Laptop", "MacBook Air M1", "lightweight premium laptop long battery"),
    ("Laptop", "Lenovo ThinkPad E14", "business laptop durable long battery"),
    ("Laptop", "Asus VivoBook 14", "student laptop budget daily use"),

    # ===== MOBILES =====
    ("Mobile", "Samsung Galaxy S21", "android phone good camera performance"),
    ("Mobile", "iPhone 13", "ios premium smartphone excellent camera"),
    ("Mobile", "Redmi Note 12", "budget phone long battery"),

    # ===== HEADPHONES =====
    ("Headphones", "Sony WH-1000XM4", "wireless noise cancelling headphones"),
    ("Headphones", "Boat Rockerz 450", "budget wireless headphones bass"),

    # ===== SMARTWATCH =====
    ("Smartwatch", "Apple Watch 8", "health fitness smartwatch"),
    ("Smartwatch", "Noise ColorFit Pro", "budget smartwatch fitness"),

    # ===== SPEAKERS =====
    ("Speaker", "JBL Flip 6", "portable bluetooth speaker bass"),
    ("Speaker", "Boat Stone 1200", "loud bluetooth speaker"),
]

df = pd.DataFrame(data, columns=["Category", "Product", "Description"])

# Vectorize once
vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform(df["Description"])

@app.route("/", methods=["GET", "POST"])
def index():
    categories = sorted(df["Category"].unique())
    recommendations = []

    if request.method == "POST":
        category = request.form.get("category")
        user_input = request.form.get("description")

        # ✅ CRITICAL CHECK
        if category and user_input:
            filtered_df = df[df["Category"] == category]

            filtered_vectors = vectorizer.transform(
                filtered_df["Description"]
            )
            user_vector = vectorizer.transform([user_input])

            similarity_scores = cosine_similarity(
                user_vector, filtered_vectors
            )[0]

            top_indices = similarity_scores.argsort()[::-1][:3]

            for idx in top_indices:
                recommendations.append({
                    "product": filtered_df.iloc[idx]["Product"],
                    "description": filtered_df.iloc[idx]["Description"]
                })

    return render_template(
        "index.html",
        categories=categories,
        recommendations=recommendations
    )

if __name__ == "__main__":
    app.run(debug=True)
