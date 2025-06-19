
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Calendar, MessageSquare } from "lucide-react";

const QuickStatsSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Scripts Generated</p>
              <p className="text-2xl font-bold">24</p>
            </div>
            <FileText className="h-8 w-8 text-coach-primary" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Content Planned</p>
              <p className="text-2xl font-bold">12</p>
            </div>
            <Calendar className="h-8 w-8 text-coach-primary" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">AI Interactions</p>
              <p className="text-2xl font-bold">156</p>
            </div>
            <MessageSquare className="h-8 w-8 text-coach-primary" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickStatsSection;
