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
          flexDirection: "row",
          position: "relative",
          overflow: "hidden",
          background: "#06080d",
          color: "#f5fbff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 70% at 0% 50%, rgba(125, 211, 252, 0.08), transparent 55%), radial-gradient(ellipse 50% 50% at 100% 20%, rgba(56, 189, 248, 0.06), transparent 50%)",
          }}
        />

        <div
          style={{
            width: "56%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "64px 56px 64px 64px",
          }}
        >
          <div
            style={{
              fontSize: 20,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "#7dd3fc",
              marginBottom: 20,
              fontWeight: 600,
            }}
          >
            Hassan Raza
          </div>
          <div
            style={{
              fontSize: 68,
              lineHeight: 1.05,
              fontWeight: 800,
              marginBottom: 22,
              letterSpacing: "-0.02em",
            }}
          >
            I am Hassan Raza
          </div>
          <div
            style={{
              fontSize: 26,
              lineHeight: 1.45,
              color: "#c5d8e8",
              maxWidth: 520,
            }}
          >
            Odoo implementer with expertise in both functional and technical consulting, ERP, warehouse workflows,
            automation, and AI solutions.
          </div>
        </div>

        <div
          style={{
            width: "44%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "48px 56px 48px 24px",
          }}
        >
          <div
            style={{
              display: "flex",
              padding: "14px",
              borderRadius: 28,
              background: "#c9b8a6",
              boxShadow: "0 28px 70px rgba(0, 0, 0, 0.45)",
            }}
          >
            <img
              src="https://hassanrazadev.tech/images/about-me.jpeg"
              alt="Hassan Raza"
              width={380}
              height={500}
              style={{
                width: 380,
                height: 500,
                objectFit: "cover",
                objectPosition: "60% 24%",
                borderRadius: 18,
                display: "block",
              }}
            />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
