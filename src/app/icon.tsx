import { ImageResponse } from "next/og";
import { LOGO_CIRCLES, LOGO_PATHS, LOGO_VIEWBOX } from "@/lib/logoPath";

export const size = { width: 64, height: 64 };
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
          background: "#050308",
          borderRadius: 14,
        }}
      >
        <svg width="70%" height="70%" viewBox={LOGO_VIEWBOX} fill="none">
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
