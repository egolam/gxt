interface Props {
  zoom: number;
  pov: number;
  author: string;
}

export const ImageInfo = ({ author, pov, zoom }: Props) => {
  return (
    <div className="absolute bottom-0 right-0 bg-ghost/75 flex items-center text-xs gap-4 px-4 py-1 -z-1 leading-none">
      <div className="flex items-center gap-2">
        <h3 className="text-text font-medium">Zoom</h3>
        <p className="text-white font-semibold">{zoom}</p>
      </div>
      <div className="flex items-center gap-2">
        <h3 className="text-text font-medium">POV</h3>
        <p className="text-white font-semibold">{pov}</p>
      </div>
      <div className="flex items-center gap-2">
        <h3 className="text-text font-medium">Author</h3>
        <p className="text-white font-semibold">{author}</p>
      </div>
    </div>
  );
};
