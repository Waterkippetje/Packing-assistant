import { useState } from "react";

const PACKAGES = [
  {
    id: "starter",
    duration: "1 Hour",
    price: "€250",
    tag: "Quick Start",
    emoji: "⚡",
    color: "#7C3AED",
    gradient: "linear-gradient(135deg, #7C3AED, #A78BFA)",
    description: "Perfect for a focused problem, feature spike, or team intro to building with Claude, OpenAI, Supabase, or Lovable.",
    perks: [
      "1-on-1 live coding session",
      "Claude / OpenAI / Lovable walkthrough",
      "1 focused problem or feature",
      "Recording included",
    ],
  },
  {
    id: "deep",
    duration: "2 Hours",
    price: "€400",
    tag: "Most Popular",
    emoji: "🔥",
    color: "#DB2777",
    gradient: "linear-gradient(135deg, #DB2777, #F472B6)",
    description: "Go deep on Supabase, Lovable, or Claude. Build a real feature together, connect your backend, or ship a full flow.",
    perks: [
      "Everything in 1 Hour",
      "Supabase / Lovable / GitHub deep dive",
      "Team Q&A included",
      "Follow-up notes & resources",
    ],
    popular: true,
  },
  {
    id: "full",
    duration: "4 Hours",
    price: "€750",
    tag: "Full Day Boost",
    emoji: "🚀",
    color: "#0891B2",
    gradient: "linear-gradient(135deg, #0891B2, #67E8F9)",
    description: "A full vibe coding immersion. From idea to deployed app using Claude, Supabase, Lovable, and GitHub together.",
    perks: [
      "Everything in 2 Hours",
      "Full stack: Lovable + Supabase + GitHub",
      "Up to 5 team members",
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
            Book the {pkg.duration} Session
          </h2>
          <p style={{ margin: "6px 0 0", color: "#888", fontSize: "14px" }}>
            {pkg.price} <span style={{ fontSize: "12px" }}>ex. BTW</span> · choose how you'd like to proceed
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
          <a
            href={`mailto:hello@vibrantcodes.com?subject=Book ${pkg.duration} Vibe Coding Session&body=Hi, I'd like to book the ${pkg.duration} session (${pkg.price} ex. BTW). Please let me know your availability.`}
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
              <div>Book a Session</div>
              <div style={{ fontSize: "12px", fontWeight: 400, opacity: 0.85 }}>We'll confirm your slot via email</div>
            </div>
            <span style={{ marginLeft: "auto", fontSize: "18px" }}>→</span>
          </a>

          <a
            href={`mailto:hello@vibrantcodes.com?subject=Question about ${pkg.duration} Vibe Coding Session`}
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
              <div>Contact Me First</div>
              <div style={{ fontSize: "12px", fontWeight: 400, color: "#888" }}>Have a question? Let's talk</div>
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
          Close
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [selectedPkg, setSelectedPkg] = useState<typeof PACKAGES[0] | null>(null);

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
            Vibe Coding for Organizations
          </div>

          <h1 style={{
            fontSize: "clamp(42px, 7vw, 78px)", fontWeight: 900,
            lineHeight: 1.1, margin: "0 0 24px",
            background: "linear-gradient(135deg, #fff 30%, #A78BFA)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            Apply AI for real.<br />Hands-on.
          </h1>

          <p style={{
            fontSize: "clamp(16px, 2.5vw, 20px)", color: "#9CA3AF",
            lineHeight: 1.7, maxWidth: "560px", margin: "0 auto 44px",
          }}>
            Practical workshops for companies that want to learn how to truly apply AI. Not in theory, but by getting to work with it directly. Together we use Claude, OpenAI, Supabase, Lovable, and GitHub.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", marginBottom: "40px" }}>
            {[
              { name: "Claude", logo: "https://cdn.simpleicons.org/claude/D97757" },
              { name: "OpenAI", logo: "https://cdn.simpleicons.org/openai/74AA9C" },
              { name: "Supabase", logo: "https://cdn.simpleicons.org/supabase/3ECF8E" },
              { name: "Lovable", logo: "https://lovable.dev/favicon.ico" },
              { name: "GitHub", logo: "https://cdn.simpleicons.org/github/ffffff" },
            ].map(tool => (
              <span key={tool.name} style={{
                display: "flex", alignItems: "center", gap: "8px",
                padding: "7px 16px", borderRadius: "99px", fontSize: "13px", fontWeight: 600,
                background: "#0F0F1A", border: "1px solid #2a2a3e", color: "#9CA3AF",
              }}>
                <img src={tool.logo} alt={tool.name} style={{ width: "16px", height: "16px" }} />
                {tool.name}
              </span>
            ))}
          </div>

          <a
            href="#packages"
            style={{
              display: "inline-block", padding: "16px 40px", borderRadius: "14px",
              background: "linear-gradient(135deg, #7C3AED, #DB2777)",
              color: "white", fontWeight: 700, fontSize: "16px",
              textDecoration: "none", boxShadow: "0 12px 40px #7C3AED50",
            }}
          >
            See Packages ↓
          </a>
        </div>
      </section>

      {/* ── WHAT IS IT ── */}
      <section style={{ padding: "80px 24px", maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
          {[
            { icon: "🧑‍💻", title: "Just do it", body: "No boring presentations. We dive straight into your project with the tools that actually matter." },
            { icon: "🤖", title: "Practical & applicable", body: "You learn how to combine Claude, OpenAI, Lovable, and Supabase to build faster and work smarter." },
            { icon: "⚡", title: "Built for teams", body: "These sessions are made for teams that want to understand and apply AI, not just talk about it." },
          ].map(f => (
            <div key={f.title} style={{ background: "#0F0F1A", borderRadius: "18px", padding: "28px", border: "1px solid #1E1E2E" }}>
              <div style={{ fontSize: "32px", marginBottom: "12px" }}>{f.icon}</div>
              <h3 style={{ margin: "0 0 8px", fontSize: "16px", fontWeight: 700, color: "white" }}>{f.title}</h3>
              <p style={{ margin: 0, fontSize: "14px", color: "#6B7280", lineHeight: 1.6 }}>{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PACKAGES ── */}
      <section id="packages" style={{ padding: "80px 24px 120px", maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h2 style={{
            fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, margin: "0 0 14px",
            background: "linear-gradient(135deg, #fff, #9CA3AF)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            Choose your session
          </h2>
          <p style={{ color: "#6B7280", fontSize: "15px", margin: 0 }}>All prices exclude BTW</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", alignItems: "start" }}>
          {PACKAGES.map(pkg => (
            <div
              key={pkg.id}
              style={{
                background: "#0F0F1A", borderRadius: "24px", padding: "36px 32px",
                border: pkg.popular ? `1px solid ${pkg.color}60` : "1px solid #1E1E2E",
                position: "relative", overflow: "hidden",
                transform: pkg.popular ? "scale(1.03)" : "scale(1)",
                boxShadow: pkg.popular ? `0 0 60px ${pkg.color}20` : "none",
              }}
            >
              {pkg.popular && (
                <div style={{
                  position: "absolute", top: 0, right: 0,
                  background: pkg.gradient, color: "white",
                  fontSize: "11px", fontWeight: 800, padding: "6px 16px",
                  borderRadius: "0 24px 0 12px", letterSpacing: "0.5px", textTransform: "uppercase",
                }}>
                  Most Popular
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
                <span style={{ color: "#6B7280", fontSize: "14px", marginLeft: "6px" }}>ex. BTW</span>
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
                onClick={() => setSelectedPkg(pkg)}
                style={{
                  width: "100%", padding: "15px", borderRadius: "14px",
                  border: "none", background: pkg.gradient,
                  color: "white", fontWeight: 700, fontSize: "15px",
                  cursor: "pointer", boxShadow: `0 8px 24px ${pkg.color}40`,
                }}
              >
                Book {pkg.duration} →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid #1E1E2E", padding: "32px 24px", textAlign: "center", color: "#374151", fontSize: "13px" }}>
        <div style={{ fontWeight: 700, color: "#6B7280", marginBottom: "6px", fontSize: "15px" }}>Vibrant Codes</div>
        <div>© {new Date().getFullYear()} · Vibe coding for organizations · All prices ex. BTW</div>
      </footer>

      {selectedPkg && <BookingModal pkg={selectedPkg} onClose={() => setSelectedPkg(null)} />}
    </div>
  );
}
