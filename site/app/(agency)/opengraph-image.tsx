import { ImageResponse } from "next/og";
import { site } from "@/content/site";

// The picture shown when the site is shared on social media or in a chat.
export const dynamic = "force-static";
export const alt = `${site.name}. ${site.slogan}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#0a0a0a",
        color: "#fafafa",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, letterSpacing: 8, textTransform: "uppercase" }}>
        <div style={{ width: 14, height: 14, borderRadius: 14, background: "#f05a3c" }} />
        {site.name}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ fontSize: 92, letterSpacing: -3, lineHeight: 1.05 }}>{site.slogan}</div>
        <div style={{ fontSize: 30, color: "#a3a3a3" }}>{site.descriptor}</div>
      </div>
    </div>,
    size,
  );
}
