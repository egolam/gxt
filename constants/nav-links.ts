export interface NavLink {
  id: number;
  href: string;
  display: string;
  iconKey: string;
}

export const navLinks: NavLink[] = [
  { id: 5, href: "/", display: "Home", iconKey: "home" },
  { id: 0, href: "/play", display: "PLAY", iconKey: "play" },
  {
    id: 1,
    href: "/leaderboard",
    display: "Leaderboard",
    iconKey: "leaderboard",
  },
  { id: 2, href: "/profile", display: "Profile", iconKey: "user" },
  { id: 3, href: "/settings", display: "Settings", iconKey: "settings" },
  { id: 4, href: "/how-to-play", display: "How to Play", iconKey: "question" },
];
