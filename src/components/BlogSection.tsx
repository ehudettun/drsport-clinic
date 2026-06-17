"use client";

const articles = [
  {
    category: "ברך",
    categoryColor: "#2B57B8",
    date: "יוני 2025",
    title: "קרע מניסקוס בספורטאי כדורסל — כל מה שצריך לדעת",
    excerpt:
      'קרע מניסקוס היא אחת הפציעות הנפוצות בקרב שחקני כדורסל. מהם הסימפטומים? מתי ניתוח ומתי שמרני? ד״ר כהן מסביר את כל האפשרויות.',
  },
  {
    category: "כתף",
    categoryColor: "#FF6D00",
    date: "מאי 2025",
    title: "פציעת כתף ב-90%: איך להחזיר ספורטאים לשדה מהר יותר",
    excerpt:
      "פגיעות בגידי הכתף מייצגות עד 30% מפציעות הספורט. עם פרוטוקול שיקום נכון, ניתן לקצר זמן החזרה ב-40%.",
  },
  {
    category: "ביצועים",
    categoryColor: "#00E676",
    date: "אפריל 2025",
    title: "עומס אימונים ועייפות שרירים — הגבול הדק בין ביצועים לפציעה",
    excerpt:
      'כיצד מאמנים ורופאים מזהים סימני עומס יתר? ד״ר כהן חולק את מדדי הסף שהוא עוקב אחריהם עבור ספורטאים מקצועיים.',
  },
];

export default function BlogSection() {
  return (
    <section
      id="blog"
      className="section-pad"
      style={{ background: "#050E1F" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-right">
          <h2
            className="text-3xl md:text-4xl font-extrabold mb-3"
            style={{ color: "#F0F4FF" }}
          >
            בלוג פציעות ספורט
          </h2>
          <div
            className="h-1 rounded-full"
            style={{
              background: "linear-gradient(90deg, transparent, #00E676)",
              width: "200px",
              marginRight: "0",
              marginLeft: "auto",
            }}
          />
          <p className="mt-4 text-base" style={{ color: "#8BA4C8" }}>
            עדכונים, מחקרים, וטיפים ממרפאת ד״ר ספורט
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <article
              key={i}
              className="card-hover rounded-2xl p-6 flex flex-col gap-4"
              style={{
                background: "#0D1B35",
                border: "1px solid rgba(43,87,184,0.3)",
              }}
            >
              {/* Top row: badge + date */}
              <div className="flex items-center justify-between">
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full"
                  style={{
                    background: article.categoryColor + "22",
                    color: article.categoryColor,
                    border: `1px solid ${article.categoryColor}44`,
                  }}
                >
                  {article.category}
                </span>
                <span className="text-xs" style={{ color: "#8BA4C8" }}>
                  {article.date}
                </span>
              </div>

              {/* Title */}
              <h3
                className="text-lg font-bold leading-snug"
                style={{ color: "#F0F4FF" }}
              >
                {article.title}
              </h3>

              {/* Excerpt */}
              <p
                className="text-sm leading-relaxed flex-1"
                style={{ color: "#8BA4C8" }}
              >
                {article.excerpt}
              </p>

              {/* Read more link */}
              <a
                href="#blog"
                className="text-sm font-bold transition-all duration-200 inline-flex items-center gap-1"
                style={{ color: "#00E676", textDecoration: "none" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#00c864";
                  e.currentTarget.style.textShadow =
                    "0 0 12px rgba(0,230,118,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#00E676";
                  e.currentTarget.style.textShadow = "none";
                }}
              >
                קרא עוד ←
              </a>
            </article>
          ))}
        </div>

        {/* View all button */}
        <div className="text-center mt-10">
          <a
            href="#blog"
            className="inline-block px-8 py-3 rounded-full text-sm font-bold transition-all duration-200"
            style={{
              border: "1px solid #00E676",
              color: "#00E676",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(0,230,118,0.1)";
              e.currentTarget.style.boxShadow =
                "0 0 20px rgba(0,230,118,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            כל המאמרים
          </a>
        </div>
      </div>
    </section>
  );
}
