import { Footer } from "../footer";
import { AuthButtons } from "./AuthButtons";
import { Navigation } from "./Navigation";

export const Sidebar = () => {
  return (
    <aside className="border-r border-ghost w-64 flex flex-col justify-between">
      <nav className="flex flex-col">
        {/* <h2 className="text-feature uppercase px-4 text-xs text-right font-bold">
          // navigation
        </h2> */}
        <Navigation />
        {/* <h3 className="text-feature uppercase px-4 text-xs text-right font-bold">
          // end of navigation
        </h3> */}
      </nav>
      <AuthButtons />
      <Footer />
    </aside>
  );
};
