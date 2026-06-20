import { ImageResponse } from "next/og";

// Branded social-share card (used for Open Graph + Twitter). Generated at build
// time by Satori via next/og — no external font/asset fetches, so it can't fail
// the build. Colours mirror the site tokens in globals.css.
export const alt = "Cloak — a private remote for your coding agent";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#0b0c09";
const TEXT = "#eae9dd";
const DIM = "#8d8f7b";
const FAINT = "#5e6052";
const LIME = "#c2f24a";
const BORDER = "#3a3e29";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          color: TEXT,
          padding: 84,
          borderTop: `8px solid ${LIME}`,
          fontFamily: "sans-serif",
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 24,
            letterSpacing: 5,
            color: DIM,
            textTransform: "uppercase",
          }}
        >
          <div style={{ width: 15, height: 15, background: LIME }} />
          A private remote for your coding agent
        </div>

        {/* Wordmark + tagline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 156,
              fontWeight: 700,
              letterSpacing: 2,
              lineHeight: 1,
            }}
          >
            CLO
            <div style={{ width: 48, height: 48, background: LIME, margin: "0 20px" }} />
            AK
          </div>
          <div style={{ display: "flex", fontSize: 42, fontWeight: 600, lineHeight: 1.25, maxWidth: 920 }}>
            Drive Claude Code from your phone. Nothing leaves your machines.
          </div>
        </div>

        {/* Command chip + proof */}
        <div style={{ display: "flex", alignItems: "center", gap: 24, fontSize: 27 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              border: `1px solid ${BORDER}`,
              borderRadius: 12,
              padding: "14px 22px",
              color: LIME,
              fontFamily: "monospace",
            }}
          >
            <span style={{ color: FAINT }}>$</span>
            npx cloak-remote
          </div>
          <div style={{ display: "flex", color: DIM }}>No account · No cloud · End-to-end encrypted</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
