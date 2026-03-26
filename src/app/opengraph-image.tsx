/* eslint-disable @next/next/no-img-element */

import { ImageResponse } from "next/og";

export const alt = "Hassan Raza portfolio preview";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background:
            "radial-gradient(circle at top right, #18263c 0%, #0b111a 42%, #06080d 100%)",
          color: "#f5fbff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 25% 30%, rgba(125, 211, 252, 0.20), transparent 22%), radial-gradient(circle at 80% 25%, rgba(56, 189, 248, 0.14), transparent 18%)",
          }}
        />

        <div
          style={{
            width: "58%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "74px 72px",
          }}
        >
          <div
            style={{
              fontSize: 22,
              letterSpacing: "0.30em",
              textTransform: "uppercase",
              color: "#7dd3fc",
              marginBottom: 22,
            }}
          >
            Hassan Raza
          </div>
          <div
            style={{
              fontSize: 74,
              lineHeight: 1,
              fontWeight: 800,
              marginBottom: 24,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>I am Hassan</span>
            <span>Raza</span>
          </div>
          <div
            style={{
              fontSize: 30,
              lineHeight: 1.35,
              color: "#dff5ff",
              maxWidth: 540,
              display: "flex",
            }}
          >
            Odoo implementer with expertise in both functional and technical consulting, ERP workflows, automation, and AI solutions.
          </div>
        </div>

        <div
          style={{
            width: "42%",
            position: "relative",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            padding: "54px 48px 0 0",
          }}
        >
          <img
            src="https://hassanrazadev.tech/images/hassanraza.jpeg"
            alt="Hassan Raza portrait"
            style={{
              width: 390,
              height: 560,
              objectFit: "cover",
              borderRadius: 28,
              boxShadow: "0 24px 80px rgba(0, 0, 0, 0.35)",
              filter: "saturate(1.03)",
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
