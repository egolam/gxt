const gameModes = [
  {
    id: 0,
    display: "CASUAL",
    value: "casual",
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur rem illo nesciunt quos magni.",
  },
  {
    id: 1,
    display: "CASUAL",
    value: "casual",
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur rem illo nesciunt quos magni.",
  },
  {
    id: 2,
    display: "CASUAL",
    value: "casual",
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur rem illo nesciunt quos magni.",
  },
];

export const GameModeSelection = () => {
  return (
    <ul className="flex gap-4">
      {gameModes.map((mode) => (
        <li key={mode.id}>
          <button className="w-64 aspect-1/2 bg-card-bg">{mode.display}</button>
        </li>
      ))}
    </ul>
  );
};
