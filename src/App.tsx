import { useState, useRef, useEffect } from "react";

const PACKAGES = [
  {
    id: "starter",
    duration: "1 Uur",
    price: "€250",
    tag: "Snelle Start",
    emoji: "⚡",
    color: "#7C3AED",
    gradient: "linear-gradient(135deg, #7C3AED, #A78BFA)",
    description: "Perfect voor een gefocust probleem, feature spike, of een team-introductie tot bouwen met Claude, OpenAI, Supabase of Lovable.",
    perks: [
      "1-op-1 live coding sessie",
      "Claude / OpenAI / Lovable walkthrough",
      "1 gefocust probleem of feature",
      "Opname inbegrepen",
    ],
  },
  {
    id: "deep",
    duration: "2 Uur",
    price: "€400",
    tag: "Meest Populair",
    emoji: "🔥",
    color: "#DB2777",
    gradient: "linear-gradient(135deg, #DB2777, #F472B6)",
    description: "Ga diep in op Supabase, Lovable of Claude. Bouw samen een echte feature, koppel je backend, of lever een complete flow op.",
    perks: [
      "Alles uit het 1 Uur pakket",
      "Supabase / Lovable / GitHub deep dive",
      "Team Q&A inbegrepen",
      "Nabespreking & bronnen",
    ],
    popular: true,
  },
  {
    id: "full",
    duration: "4 Uur",
    price: "€750",
    tag: "Volledige Dag Boost",
    emoji: "🚀",
    color: "#0891B2",
    gradient: "linear-gradient(135deg, #0891B2, #67E8F9)",
    description: "Een volledige vibe coding-dag. Van idee tot live app met Claude, Supabase, Lovable en GitHub samen.",
    perks: [
      "Alles uit het 2 Uur pakket",
      "Tot 5 teamleden",
    ],
  },
];

function BookingModal({ pkg, onClose }: { pkg: typeof PACKAGES[0]; onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 100, padding: "20px", backdropFilter: "blur(6px)",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#0F0F1A", borderRadius: "24px", padding: "40px",
          maxWidth: "440px", width: "100%",
          border: `1px solid ${pkg.color}40`,
          boxShadow: `0 0 60px ${pkg.color}30`,
        }}
      >
        <div style={{ marginBottom: "28px" }}>
          <div style={{ fontSize: "36px", marginBottom: "8px" }}>{pkg.emoji}</div>
          <h2 style={{ margin: 0, fontSize: "22px", fontWeight: 800, color: "white" }}>
            Boek de {pkg.duration} Sessie
          </h2>
          <p style={{ margin: "6px 0 0", color: "#888", fontSize: "14px" }}>
            {pkg.price} <span style={{ fontSize: "12px" }}>excl. BTW*</span> · kies hoe je verder wilt gaan
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
          <a
            href={`mailto:hello@vibrantcodes.com?subject=Boek ${pkg.duration} Vibe Coding Sessie&body=Hoi, ik wil graag de ${pkg.duration} sessie boeken (${pkg.price} excl. BTW*). Laat me weten wanneer je beschikbaar bent.`}
            style={{
              display: "flex", alignItems: "center", gap: "16px",
              padding: "18px 20px", borderRadius: "14px",
              background: pkg.gradient, textDecoration: "none",
              color: "white", fontWeight: 700, fontSize: "15px",
              boxShadow: `0 8px 24px ${pkg.color}40`,
            }}
          >
            <span style={{ fontSize: "24px" }}>📅</span>
            <div>
              <div>Sessie Boeken</div>
              <div style={{ fontSize: "12px", fontWeight: 400, opacity: 0.85 }}>We bevestigen je tijdslot per e-mail</div>
            </div>
            <span style={{ marginLeft: "auto", fontSize: "18px" }}>→</span>
          </a>

          <a
            href={`mailto:hello@vibrantcodes.com?subject=Vraag over ${pkg.duration} Vibe Coding Sessie`}
            style={{
              display: "flex", alignItems: "center", gap: "16px",
              padding: "18px 20px", borderRadius: "14px",
              background: "#1A1A2E", textDecoration: "none",
              color: "white", fontWeight: 600, fontSize: "15px",
              border: "1px solid #2a2a3e",
            }}
          >
            <span style={{ fontSize: "24px" }}>💬</span>
            <div>
              <div>Eerst Contact Opnemen</div>
              <div style={{ fontSize: "12px", fontWeight: 400, color: "#888" }}>Heb je een vraag? Laten we praten</div>
            </div>
            <span style={{ marginLeft: "auto", fontSize: "18px", color: "#555" }}>→</span>
          </a>
        </div>

        <button
          onClick={onClose}
          style={{
            width: "100%", padding: "12px", borderRadius: "12px",
            border: "1px solid #2a2a3e", background: "transparent",
            color: "#555", cursor: "pointer", fontSize: "14px",
          }}
        >
          Sluiten
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [selectedPkg, setSelectedPkg] = useState<typeof PACKAGES[0] | null>(null);
  const [activeIndex, setActiveIndex] = useState(1);
  const carouselRef = useRef<HTMLDivElement>(null);

  function scrollTo(index: number, behavior: ScrollBehavior = "smooth") {
    const next = Math.max(0, Math.min(PACKAGES.length - 1, index));
    setActiveIndex(next);
    const card = carouselRef.current?.children[next] as HTMLElement;
    card?.scrollIntoView({ behavior, block: "nearest", inline: "center" });
  }

  useEffect(() => { scrollTo(1, "instant"); }, []);

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#07070F", minHeight: "100vh", color: "white" }}>

      {/* ── HERO ── */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "80px 24px 60px", textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, #7C3AED20, transparent 70%)", top: "-100px", left: "-100px", pointerEvents: "none" }}/>
        <div style={{ position: "absolute", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, #DB277720, transparent 70%)", bottom: "-80px", right: "-80px", pointerEvents: "none" }}/>

        <div style={{ position: "relative", maxWidth: "760px" }}>
          <div style={{
            display: "inline-block", background: "linear-gradient(135deg, #7C3AED20, #DB277720)",
            border: "1px solid #7C3AED40", borderRadius: "99px",
            padding: "10px 28px", fontSize: "18px", fontWeight: 700,
            color: "#A78BFA", marginBottom: "28px", letterSpacing: "0.5px",
          }}>
            Vibe Coding voor Organisaties
          </div>

          <h1 style={{
            fontSize: "clamp(42px, 7vw, 78px)", fontWeight: 900,
            lineHeight: 1.1, margin: "0 0 24px",
            background: "linear-gradient(135deg, #fff 30%, #A78BFA)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            Pas AI écht toe.<br />Hands-on.
          </h1>

          <p style={{
            fontSize: "clamp(16px, 2.5vw, 20px)", color: "#9CA3AF",
            lineHeight: 1.7, maxWidth: "560px", margin: "0 auto 24px",
          }}>
            Praktische workshops voor bedrijven die AI écht willen toepassen. Niet in theorie, maar door er direct mee aan de slag te gaan. Samen gebruiken we Claude, OpenAI, Supabase, Lovable en GitHub.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", marginBottom: "20px" }}>
            {[
              { name: "Claude", logo: "https://cdn.simpleicons.org/claude/D97757" },
              { name: "OpenAI", logo: "/openai-logo.svg", tint: "#74AA9C" },
              { name: "Supabase", logo: "https://cdn.simpleicons.org/supabase/3ECF8E" },
              { name: "Lovable", logo: "https://lovable.dev/favicon.ico" },
              { name: "GitHub", logo: "https://cdn.simpleicons.org/github/ffffff" },
            ].map(tool => (
              <span key={tool.name} style={{
                display: "flex", alignItems: "center", gap: "8px",
                padding: "7px 16px", borderRadius: "99px", fontSize: "13px", fontWeight: 600,
                background: "#0F0F1A", border: "1px solid #2a2a3e", color: "#9CA3AF",
              }}>
                <img
                  src={tool.logo}
                  alt={tool.name}
                  style={{
                    width: "16px", height: "16px",
                    ...(tool.tint ? { filter: "invert(67%) sepia(18%) saturate(500%) hue-rotate(130deg) brightness(95%)" } : {}),
                  }}
                />
                {tool.name}
              </span>
            ))}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px" }}>
            <a
              href="#packages"
              style={{
                display: "inline-block", padding: "16px 40px", borderRadius: "14px",
                background: "linear-gradient(135deg, #7C3AED, #DB2777)",
                color: "white", fontWeight: 700, fontSize: "16px",
                textDecoration: "none", boxShadow: "0 12px 40px #7C3AED50",
              }}
            >
              Bekijk Pakketten ↓
            </a>
            <a
              href="#over-ons"
              style={{
                display: "inline-block", padding: "16px 40px", borderRadius: "14px",
                background: "transparent", border: "1px solid #2a2a3e",
                color: "#9CA3AF", fontWeight: 700, fontSize: "16px",
                textDecoration: "none",
              }}
            >
              Over ons
            </a>
          </div>
        </div>
      </section>


      {/* ── PAKKETTEN CARROUSEL ── */}
      <section id="packages" style={{ padding: "80px 0 120px" }}>
        <div style={{ textAlign: "center", marginBottom: "60px", padding: "0 24px" }}>
          <h2 style={{
            fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, margin: "0 0 14px",
            background: "linear-gradient(135deg, #fff, #9CA3AF)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            Kies je sessie
          </h2>
          <p style={{ color: "#6B7280", fontSize: "15px", margin: 0 }}>Alle prijzen excl. BTW*</p>
        </div>

        {/* Cards track */}
        <div
          ref={carouselRef}
          style={{
            display: "flex", gap: "24px",
            overflowX: "auto", scrollSnapType: "x mandatory",
            padding: "20px calc(50vw - 180px) 32px",
            scrollbarWidth: "none",
          }}
        >
          {PACKAGES.map((pkg, i) => {
            const isActive = i === activeIndex;
            return (
              <div
                key={pkg.id}
                onClick={() => scrollTo(i)}
                style={{
                  flexShrink: 0, width: "320px",
                  scrollSnapAlign: "center",
                  background: "#0F0F1A", borderRadius: "24px", padding: "36px 32px",
                  border: isActive ? `1px solid ${pkg.color}70` : "1px solid #1E1E2E",
                  position: "relative", overflow: "hidden",
                  transform: isActive ? "scale(1.04)" : "scale(0.93)",
                  opacity: isActive ? 1 : 0.5,
                  transition: "transform 0.35s ease, opacity 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease",
                  boxShadow: isActive ? `0 0 60px ${pkg.color}25` : "none",
                  cursor: isActive ? "default" : "pointer",
                }}
              >
                {pkg.popular && (
                  <div style={{
                    position: "absolute", top: 0, right: 0,
                    background: pkg.gradient, color: "white",
                    fontSize: "11px", fontWeight: 800, padding: "6px 16px",
                    borderRadius: "0 24px 0 12px", letterSpacing: "0.5px", textTransform: "uppercase",
                  }}>
                    Meest Populair
                  </div>
                )}

                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: pkg.gradient }}/>

                <div style={{ fontSize: "40px", marginBottom: "16px" }}>{pkg.emoji}</div>

                <div style={{
                  display: "inline-block", background: `${pkg.color}20`,
                  color: pkg.color, fontSize: "11px", fontWeight: 700,
                  padding: "3px 10px", borderRadius: "99px", marginBottom: "10px",
                  textTransform: "uppercase", letterSpacing: "0.5px",
                }}>
                  {pkg.tag}
                </div>

                <h3 style={{ margin: "0 0 6px", fontSize: "26px", fontWeight: 800, color: "white" }}>{pkg.duration}</h3>

                <div style={{ margin: "0 0 20px" }}>
                  <span style={{
                    fontSize: "42px", fontWeight: 900,
                    background: pkg.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  }}>
                    {pkg.price}
                  </span>
                  <span style={{ color: "#6B7280", fontSize: "14px", marginLeft: "6px" }}>excl. BTW*</span>
                </div>

                <p style={{ color: "#9CA3AF", fontSize: "14px", lineHeight: 1.65, margin: "0 0 24px" }}>{pkg.description}</p>

                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: "10px" }}>
                  {pkg.perks.map(perk => (
                    <li key={perk} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#D1D5DB" }}>
                      <span style={{
                        width: "18px", height: "18px", borderRadius: "50%",
                        background: `${pkg.color}25`, color: pkg.color,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "10px", fontWeight: 800, flexShrink: 0,
                      }}>✓</span>
                      {perk}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={e => { e.stopPropagation(); setSelectedPkg(pkg); }}
                  style={{
                    width: "100%", padding: "15px", borderRadius: "14px",
                    border: "none", background: pkg.gradient,
                    color: "white", fontWeight: 700, fontSize: "15px",
                    cursor: "pointer", boxShadow: `0 8px 24px ${pkg.color}40`,
                    opacity: isActive ? 1 : 0,
                    transition: "opacity 0.3s ease",
                  }}
                >
                  Boek {pkg.duration} →
                </button>
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "20px", marginTop: "8px" }}>
          <button
            onClick={() => scrollTo(activeIndex - 1)}
            disabled={activeIndex === 0}
            style={{
              width: "44px", height: "44px", borderRadius: "50%",
              border: "1px solid #2a2a3e", background: "#0F0F1A",
              color: activeIndex === 0 ? "#333" : "white",
              fontSize: "18px", cursor: activeIndex === 0 ? "not-allowed" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s",
            }}
          >‹</button>

          <div style={{ display: "flex", gap: "8px" }}>
            {PACKAGES.map((pkg, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                style={{
                  width: i === activeIndex ? "28px" : "8px",
                  height: "8px", borderRadius: "99px", border: "none",
                  background: i === activeIndex ? pkg.color : "#2a2a3e",
                  cursor: "pointer", padding: 0,
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>

          <button
            onClick={() => scrollTo(activeIndex + 1)}
            disabled={activeIndex === PACKAGES.length - 1}
            style={{
              width: "44px", height: "44px", borderRadius: "50%",
              border: "1px solid #2a2a3e", background: "#0F0F1A",
              color: activeIndex === PACKAGES.length - 1 ? "#333" : "white",
              fontSize: "18px", cursor: activeIndex === PACKAGES.length - 1 ? "not-allowed" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s",
            }}
          >›</button>
        </div>
      </section>

      {/* ── OVER ONS ── */}
      <section id="over-ons" style={{ padding: "100px 24px", maxWidth: "860px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h2 style={{
            fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, margin: "0 0 14px",
            background: "linear-gradient(135deg, #fff, #9CA3AF)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            Over ons
          </h2>
        </div>

        <div style={{
          display: "flex", flexWrap: "wrap", gap: "48px", alignItems: "center",
          background: "#0F0F1A", borderRadius: "28px", padding: "48px",
          border: "1px solid #1E1E2E",
        }}>
          <div style={{ flexShrink: 0 }}>
            <img
              src="/berend.jpg"
              alt="Berend Casper"
              style={{
                width: "240px", height: "320px", borderRadius: "24px",
                objectFit: "cover", objectPosition: "center top",
                border: "2px solid #7C3AED40",
                boxShadow: "0 0 50px #7C3AED30",
              }}
            />
          </div>

          <div style={{ flex: 1, minWidth: "240px" }}>
            <h3 style={{ margin: "0 0 4px", fontSize: "24px", fontWeight: 800, color: "white" }}>
              Berend Casper
            </h3>
            <p style={{ margin: "0 0 16px", fontSize: "14px", fontWeight: 600, color: "#7C3AED" }}>
              Business Advisor
            </p>
            <p style={{ margin: "0 0 24px", fontSize: "15px", color: "#9CA3AF", lineHeight: 1.75 }}>
              Berend werkt bij ROM Utrecht Region, waar hij organisaties helpt internationaal te groeien. Naast zijn dagelijkse werk als business advisor is hij verantwoordelijk als data en AI-expert en is hij een van de kwartiermakers van de Young Economic Board Utrecht.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {["AI & Automatisering", "Lovable", "Claude", "Supabase", "GitHub", "Utrecht"].map(tag => (
                <span key={tag} style={{
                  padding: "4px 12px", borderRadius: "99px", fontSize: "12px", fontWeight: 600,
                  background: "#7C3AED15", color: "#A78BFA", border: "1px solid #7C3AED30",
                }}>
                  {tag}
                </span>
              ))}
            </div>

            <a
              href="https://nl.linkedin.com/in/berendcasper"
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                marginTop: "24px", padding: "10px 20px", borderRadius: "10px",
                background: "#0A66C2", color: "white", fontWeight: 600,
                fontSize: "14px", textDecoration: "none",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid #1E1E2E", padding: "32px 24px", textAlign: "center", color: "#374151", fontSize: "13px" }}>

        <div>© {new Date().getFullYear()} · Vibe coding voor organisaties · Alle prijzen excl. BTW*</div>
      </footer>

      {selectedPkg && <BookingModal pkg={selectedPkg} onClose={() => setSelectedPkg(null)} />}
    </div>
  );
}
