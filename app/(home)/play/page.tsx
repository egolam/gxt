import { Mode } from "@/components/play";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Play satisguessry",
  description: "Are you ready to use your exploitation experience?",
  keywords: ["play", "exploit", "satisfactory", "experience"],
};

export default function PlayPage() {
  return (
    <section>
      <Mode />
    </section>
  );
}
