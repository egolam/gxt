import { FaGear } from "react-icons/fa6";

export default function Loading() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col gap-2 items-center">
        <FaGear className="animate-spin text-text" size={24} />;
      </div>
    </div>
  );
}
