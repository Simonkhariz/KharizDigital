import Image from "next/image";
import { AuthFlow } from "@/demos/showcase/olivar-auth/components/AuthFlow";
import "@/demos/showcase/olivar-auth/components/Flow.css";

export default function OlivarAuthPage() {
  return (
    <main className="ol-card">
      <AuthFlow />
      {/* Original procedural pixel artwork, enlarged without smoothing. */}
      <Image
        className="ol-art"
        src="/showcase/olivar-auth/landscape.webp"
        width={216}
        height={300}
        priority
        alt="Pixel-art landscape: an old tree beside a path, rose mountains and a clouded sky"
      />
    </main>
  );
}
