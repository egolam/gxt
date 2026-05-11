export const Divider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center">
      <div className="h-px flex-1 bg-ghost"></div>
      <p className="px-4 text-feature font-medium text-xs md:text-sm">{children}</p>
      <div className="h-px flex-1 bg-ghost"></div>
    </div>
  );
};
