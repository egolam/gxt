import { navLinks } from "@/constants/nav-links";
import { NavigationLinks } from "./NavigationLinks";

export const Navigation = () => {
  return (
    <ul>
      {navLinks.map((link) => (
        <li key={link.id} className="flex">
          <NavigationLinks
            display={link.display}
            href={link.href}
            iconKey={link.iconKey}
          />
        </li>
      ))}
    </ul>
  );
};
