import { Divider } from "@/components/shared/Divider";
import { Navigation } from "@/components/navigation";
import { Authentication } from "@/components/authentication";

export default function HomePage() {
  return (
    <main className="flex flex-col gap-2 md:gap-4">
      <Divider>navigation</Divider>
      <Navigation />
      <Divider>authentication</Divider>
      <Authentication />
    </main>
  );
}
