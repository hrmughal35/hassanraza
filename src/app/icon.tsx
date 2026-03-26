import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 8,
          background: "linear-gradient(135deg, #0b111a 0%, #06080d 100%)",
          color: "#e0f2fe",
          fontSize: 18,
          fontWeight: 800,
          border: "1px solid rgba(125, 211, 252, 0.35)",
          boxShadow: "inset 0 0 20px rgba(56, 189, 248, 0.15)",
        }}
      >
        HR
      </div>
    ),
    {
      ...size,
    }
  );
}
