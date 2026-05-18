import { Divider } from "@/components/shared/Divider";
import { Navigation } from "@/components/navigation";
import { Authentication } from "@/components/authentication";

export default function HomePage() {
  return (
    <main className="flex flex-col gap-4 sm:gap-4 p-8">
      <Divider>navigation</Divider>
      <Navigation />
      <Divider>authentication</Divider>
      <Authentication />
    </main>
  );
}
