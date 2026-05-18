export const Divider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center">
      <div className="h-px flex-1 bg-white/20"></div>
      <p className="px-2 sm:px-4 text-white/20 text-xs sm:text-sm">
        {children}
      </p>
      <div className="h-px flex-1 bg-white/20"></div>
    </div>
  );
};
