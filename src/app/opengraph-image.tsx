import { ImageResponse } from "next/og";
import { profile } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#050308",
          backgroundImage:
            "linear-gradient(135deg, #1a1030 0%, #050308 55%, #05171a 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              backgroundColor: "#35e6d6",
            }}
          />
          <span
            style={{
              fontSize: 26,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#35e6d6",
            }}
          >
            {profile.role} · {profile.tagline}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 108,
            fontWeight: 600,
            color: "#f5f3fa",
            marginTop: 28,
            lineHeight: 1.05,
          }}
        >
          {profile.name}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: "#9b96b3",
            marginTop: 24,
            maxWidth: 900,
          }}
        >
          {profile.yearsExperience} years shipping React, GSAP, Three.js
          &amp; Motion.
        </div>
      </div>
    ),
    { ...size }
  );
}
