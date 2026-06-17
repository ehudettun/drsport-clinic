"use client";

const feedItems = [
  {
    platform: "tiktok",
    label: "רגע של שיקום 💪",
    views: "12.4K",
    likes: "892",
    aspectRatio: "9:16",
    gradient: "linear-gradient(135deg, #1A3A7C 0%, #2B1A5C 100%)",
  },
  {
    platform: "instagram",
    label: "ניתוח ברך לייב",
    views: "8.1K",
    likes: "634",
    aspectRatio: "1:1",
    gradient: "linear-gradient(135deg, #0B1F4A 0%, #3A1A5C 100%)",
  },
  {
    platform: "tiktok",
    label: "חזרה לשדה אחרי 6 חודשים",
    views: "31.7K",
    likes: "2.3K",
    aspectRatio: "9:16",
    gradient: "linear-gradient(135deg, #1A3A7C 0%, #1A5C3A 100%)",
  },
  {
    platform: "instagram",
    label: "תרגילי כתף מתקדמים",
    views: "5.9K",
    likes: "411",
    aspectRatio: "1:1",
    gradient: "linear-gradient(135deg, #0B1F4A 0%, #5C1A1A 100%)",
  },
  {
    platform: "instagram",
    label: "כאב גב? הסבר מלא",
    views: "18.2K",
    likes: "1.1K",
    aspectRatio: "1:1",
    gradient: "linear-gradient(135deg, #1A3A7C 0%, #5C4A1A 100%)",
  },
  {
    platform: "tiktok",
    label: "ריצה נכונה — טכניקה",
    views: "44.5K",
    likes: "3.8K",
    aspectRatio: "9:16",
    gradient: "linear-gradient(135deg, #1A3A7C 0%, #2B57B8 100%)",
  },
];

function InstagramIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="6"
        stroke="white"
        strokeWidth="2"
      />
      <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1" fill="white" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg
      width="16"
      height="18"
      viewBox="0 0 24 28"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z" />
    </svg>
  );
}

export default function SocialFeed() {
  return (
    <section
      id="social"
      className="section-pad"
      style={{ background: "#0D1B35" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-right">
          <div className="flex items-center gap-4 justify-end mb-3">
            <h2
              className="text-3xl md:text-4xl font-extrabold"
              style={{ color: "#F0F4FF" }}
            >
              עוקבים אחרינו?
            </h2>
            <div className="flex items-center gap-2">
              <span
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, #833AB4, #FD1D1D, #F77737)",
                }}
              >
                <InstagramIcon />
              </span>
              <span
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "#010101" }}
              >
                <TikTokIcon />
              </span>
            </div>
          </div>
          <div
            className="h-1 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, #833AB4, #FD1D1D)",
              width: "220px",
              marginLeft: "auto",
            }}
          />
          <p className="mt-4 text-base" style={{ color: "#8BA4C8" }}>
            תוכן ספורטיבי, ניתוחים, ושיקום — ישירות מהקליניקה
          </p>
        </div>

        {/* Feed Grid */}
        <div className="grid grid-cols-3 gap-4">
          {feedItems.map((item, i) => {
            const isTikTok = item.aspectRatio === "9:16";
            return (
              <div
                key={i}
                className="card-hover rounded-2xl overflow-hidden relative cursor-pointer group"
                style={{
                  background: item.gradient,
                  paddingBottom: isTikTok ? "177.78%" : "100%",
                  border: "1px solid rgba(43,87,184,0.3)",
                }}
              >
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-3"
                  style={{
                    background: "rgba(0,0,0,0.2)",
                  }}
                >
                  {/* Play button */}
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-110"
                    style={{
                      background: "rgba(255,255,255,0.15)",
                      backdropFilter: "blur(4px)",
                      border: "1px solid rgba(255,255,255,0.3)",
                    }}
                  >
                    <span className="text-2xl" style={{ marginRight: "-3px" }}>
                      ▶
                    </span>
                  </div>

                  {/* Label */}
                  <p
                    className="text-xs font-bold text-center leading-tight"
                    style={{ color: "#F0F4FF" }}
                  >
                    {item.label}
                  </p>
                </div>

                {/* Bottom overlay with stats */}
                <div
                  className="absolute bottom-0 left-0 right-0 px-3 py-2 flex items-center justify-between"
                  style={{ background: "rgba(0,0,0,0.6)" }}
                >
                  <div className="flex items-center gap-1">
                    {item.platform === "instagram" ? (
                      <InstagramIcon />
                    ) : (
                      <TikTokIcon />
                    )}
                  </div>
                  <div
                    className="flex items-center gap-3 text-xs"
                    style={{ color: "rgba(255,255,255,0.8)" }}
                  >
                    <span>👁 {item.views}</span>
                    <span>❤️ {item.likes}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div
          className="mt-10 rounded-2xl p-6 text-center"
          style={{
            background: "rgba(43,87,184,0.1)",
            border: "1px solid rgba(43,87,184,0.3)",
          }}
        >
          <p
            className="text-lg font-bold mb-4"
            style={{ color: "#F0F4FF" }}
          >
            עקבו עלינו ב-{" "}
            <span style={{ color: "#00E676" }}>@drsportil</span>
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a
              href="https://instagram.com/drsportil"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-200"
              style={{
                background:
                  "linear-gradient(135deg, #833AB4, #FD1D1D, #F77737)",
                color: "#FFF",
                textDecoration: "none",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.opacity = "0.85")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.opacity = "1")
              }
            >
              <InstagramIcon />
              Instagram
            </a>
            <a
              href="https://tiktok.com/@drsportil"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-200"
              style={{
                background: "#010101",
                color: "#FFF",
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#222")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#010101")
              }
            >
              <TikTokIcon />
              TikTok
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
