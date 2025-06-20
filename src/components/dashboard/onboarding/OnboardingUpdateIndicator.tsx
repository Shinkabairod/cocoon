
import { Card, CardContent } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";

interface OnboardingUpdateIndicatorProps {
  isUpdating: boolean;
}

const OnboardingUpdateIndicator = ({ isUpdating }: OnboardingUpdateIndicatorProps) => {
  if (!isUpdating) return null;

  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 text-blue-700">
          <RefreshCw className="h-5 w-5 animate-spin" />
          <span>Synchronizing with your Obsidian workspace...</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default OnboardingUpdateIndicator;
