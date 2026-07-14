import { ImageResponse } from "next/og";
import { LOGO_CIRCLES, LOGO_PATHS, LOGO_VIEWBOX } from "@/lib/logoPath";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: "linear-gradient(135deg, #1a1030, #050308)",
        }}
      >
        <svg width="62%" height="62%" viewBox={LOGO_VIEWBOX} fill="none">
          {LOGO_PATHS.map((d, i) => (
            <path key={i} d={d} fill="#f5f3fa" />
          ))}
          {LOGO_CIRCLES.map((c, i) => (
            <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill="#f5f3fa" />
          ))}
        </svg>
      </div>
    ),
    { ...size }
  );
}
