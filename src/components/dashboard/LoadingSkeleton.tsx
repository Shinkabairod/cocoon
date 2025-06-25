
import { Loader2 } from "lucide-react";

const LoadingSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-purple-600" />
        <p className="text-gray-600">Chargement de votre tableau de bord...</p>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
