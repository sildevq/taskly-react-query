import { CircleCheckBig } from "lucide-react";

const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <CircleCheckBig className="h-8 w-8 text-primary mt-1" />
      <span className="text-2xl font-bold">Taskly</span>
    </div>
  );
};
export default Logo;
