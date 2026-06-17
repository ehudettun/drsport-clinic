"use client";

import { useState } from "react";

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

const colors = [
  { label: "כחול", value: "#1A3A7C" },
  { label: "לבן", value: "#F0F4FF" },
  { label: "שחור", value: "#111827" },
];

const sizingChart = [
  { size: "XS", chest: "84-88", waist: "66-70", length: "110" },
  { size: "S", chest: "88-92", waist: "70-74", length: "112" },
  { size: "M", chest: "92-96", waist: "74-78", length: "114" },
  { size: "L", chest: "96-100", waist: "78-82", length: "116" },
  { size: "XL", chest: "100-104", waist: "82-86", length: "118" },
  { size: "XXL", chest: "104-108", waist: "86-90", length: "120" },
];

const comingSoon = [
  { name: "גרביי דחיסה — ספורטמד™", price: "₪149" },
  { name: "כפפות פיזיותרפיה — FlexGrip™", price: "₪229" },
];

export default function ShopSection() {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showSizing, setShowSizing] = useState(false);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("אנא בחר מידה לפני הוספה לסל");
      return;
    }
    alert(`נוסף לסל! חלוק רפו סריס™ — מידה ${selectedSize} — ₪389`);
  };

  return (
    <section
      id="shop"
      className="section-pad"
      style={{ background: "#0D1B35" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-right">
          <h2
            className="text-3xl md:text-4xl font-extrabold mb-2"
            style={{ color: "#F0F4FF" }}
          >
            חנות ד״ר ספורט
          </h2>
          <p className="text-base" style={{ color: "#8BA4C8" }}>
            ביגוד רפואי מקצועי לאנשי רפואה
          </p>
          <div
            className="h-1 rounded-full mt-3"
            style={{
              background: "linear-gradient(90deg, transparent, #00E676)",
              width: "180px",
              marginLeft: "auto",
            }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Product Image Placeholder */}
          <div
            className="rounded-3xl flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, #1A3A7C 0%, #0B1F4A 50%, #2B57B8 100%)",
              minHeight: "420px",
              border: "1px solid rgba(43,87,184,0.4)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Decorative circles */}
            <div
              style={{
                position: "absolute",
                width: "300px",
                height: "300px",
                borderRadius: "50%",
                border: "1px solid rgba(0,230,118,0.15)",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                border: "1px solid rgba(0,230,118,0.1)",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
            />
            <div className="text-center relative z-10">
              <div className="text-8xl mb-4">🥼</div>
              <p
                className="text-sm font-semibold"
                style={{ color: "#8BA4C8" }}
              >
                חלוק רפואי פרו סריס™
              </p>
              {selectedColor !== null && (
                <div
                  className="w-6 h-6 rounded-full mx-auto mt-3 border-2"
                  style={{
                    background: colors[selectedColor].value,
                    borderColor: "#00E676",
                  }}
                />
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-6">
            <div>
              <h3
                className="text-2xl font-extrabold mb-1"
                style={{ color: "#F0F4FF" }}
              >
                חלוק רפואי ספורטיבי — פרו סריס™
              </h3>
              <div
                className="text-3xl font-extrabold"
                style={{ color: "#00E676" }}
              >
                ₪389
              </div>
            </div>

            <p className="text-sm leading-relaxed" style={{ color: "#8BA4C8" }}>
              חלוק רפואי ייחודי המשלב טכנולוגיית ניהול לחות עם עיצוב
              ספורטיבי. מתאים לחדרי ניתוח, קליניקות, ובשדה.
            </p>

            {/* Color Selector */}
            <div>
              <p
                className="text-sm font-semibold mb-3"
                style={{ color: "#F0F4FF" }}
              >
                צבע:{" "}
                <span style={{ color: "#8BA4C8" }}>
                  {colors[selectedColor].label}
                </span>
              </p>
              <div className="flex gap-3">
                {colors.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(i)}
                    title={color.label}
                    className="w-9 h-9 rounded-full transition-all duration-200"
                    style={{
                      background: color.value,
                      border:
                        selectedColor === i
                          ? "2px solid #00E676"
                          : "2px solid rgba(255,255,255,0.2)",
                      boxShadow:
                        selectedColor === i
                          ? "0 0 12px rgba(0,230,118,0.4)"
                          : "none",
                      transform:
                        selectedColor === i ? "scale(1.15)" : "scale(1)",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <p
                className="text-sm font-semibold mb-3"
                style={{ color: "#F0F4FF" }}
              >
                מידה:{" "}
                {selectedSize ? (
                  <span style={{ color: "#00E676" }}>{selectedSize}</span>
                ) : (
                  <span style={{ color: "#8BA4C8" }}>לא נבחרה</span>
                )}
              </p>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className="px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200"
                    style={{
                      background:
                        selectedSize === size
                          ? "#00E676"
                          : "rgba(43,87,184,0.2)",
                      color: selectedSize === size ? "#050E1F" : "#8BA4C8",
                      border:
                        selectedSize === size
                          ? "1px solid #00E676"
                          : "1px solid rgba(43,87,184,0.4)",
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="w-full py-4 rounded-xl text-base font-extrabold tracking-wide transition-all duration-200"
              style={{
                background: "#00E676",
                color: "#050E1F",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#00c864";
                e.currentTarget.style.boxShadow =
                  "0 0 30px rgba(0,230,118,0.4)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#00E676";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "none";
              }}
            >
              🛒 הוסף לסל
            </button>

            {/* Sizing Chart Toggle */}
            <div>
              <button
                onClick={() => setShowSizing(!showSizing)}
                className="text-sm font-semibold flex items-center gap-2 transition-colors"
                style={{ color: "#2B57B8", background: "none", border: "none", cursor: "pointer" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#00E676")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#2B57B8")}
              >
                <span>{showSizing ? "▲" : "▼"}</span>
                מידות זמינות — טבלת מידות
              </button>

              {showSizing && (
                <div
                  className="mt-4 rounded-xl overflow-hidden"
                  style={{ border: "1px solid rgba(43,87,184,0.3)" }}
                >
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ background: "rgba(43,87,184,0.3)" }}>
                        {["מידה", 'חזה (ס"מ)', 'מותניים (ס"מ)', 'אורך (ס"מ)'].map(
                          (h) => (
                            <th
                              key={h}
                              className="py-2 px-3 font-bold text-right"
                              style={{ color: "#F0F4FF" }}
                            >
                              {h}
                            </th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {sizingChart.map((row, i) => (
                        <tr
                          key={row.size}
                          style={{
                            background:
                              i % 2 === 0
                                ? "rgba(13,27,53,0.8)"
                                : "rgba(26,58,124,0.15)",
                          }}
                        >
                          <td
                            className="py-2 px-3 font-bold"
                            style={{ color: "#00E676" }}
                          >
                            {row.size}
                          </td>
                          <td className="py-2 px-3" style={{ color: "#8BA4C8" }}>
                            {row.chest}
                          </td>
                          <td className="py-2 px-3" style={{ color: "#8BA4C8" }}>
                            {row.waist}
                          </td>
                          <td className="py-2 px-3" style={{ color: "#8BA4C8" }}>
                            {row.length}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Coming Soon Items */}
        <div className="mt-12">
          <h4
            className="text-lg font-bold mb-6 text-right"
            style={{ color: "#8BA4C8" }}
          >
            בקרוב בחנות
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {comingSoon.map((item, i) => (
              <div
                key={i}
                className="rounded-xl p-5 flex items-center justify-between"
                style={{
                  background: "rgba(13,27,53,0.5)",
                  border: "1px dashed rgba(43,87,184,0.3)",
                  opacity: 0.6,
                }}
              >
                <div>
                  <p className="font-bold" style={{ color: "#F0F4FF" }}>
                    {item.name}
                  </p>
                  <p className="text-sm mt-1" style={{ color: "#8BA4C8" }}>
                    {item.price}
                  </p>
                </div>
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full"
                  style={{
                    background: "rgba(255,109,0,0.15)",
                    color: "#FF6D00",
                    border: "1px solid rgba(255,109,0,0.3)",
                  }}
                >
                  Coming Soon
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
