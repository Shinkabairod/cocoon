
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarDisplayProps {
  count: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const StarDisplay = ({ count, size = "md", className }: StarDisplayProps) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5", 
    lg: "h-6 w-6"
  };
  
  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
  };
  
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <Star className={cn("text-yellow-500 fill-current", sizeClasses[size])} />
      <span className={cn("font-medium", textSizes[size])}>{count}</span>
    </div>
  );
};

export default StarDisplay;
