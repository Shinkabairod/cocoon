
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, AlertTriangle } from "lucide-react";

interface OnboardingSyncStatusProps {
  status: 'success' | 'error' | 'partial' | null;
  details: string;
}

const OnboardingSyncStatus = ({ status, details }: OnboardingSyncStatusProps) => {
  if (!status) return null;

  return (
    <Card className={`border-l-4 ${
      status === 'success' ? 'border-l-green-500 bg-green-50' :
      status === 'partial' ? 'border-l-orange-500 bg-orange-50' :
      'border-l-red-500 bg-red-50'
    }`}>
      <CardContent className="pt-4">
        <div className="flex items-start gap-2">
          {status === 'success' ? (
            <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
          ) : (
            <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
          )}
          <div>
            <p className={`font-medium ${
              status === 'success' ? 'text-green-800' :
              status === 'partial' ? 'text-orange-800' :
              'text-red-800'
            }`}>
              {status === 'success' ? 'Synchronisation réussie' :
               status === 'partial' ? 'Synchronisation partielle' :
               'Erreur de synchronisation'}
            </p>
            <p className={`text-sm ${
              status === 'success' ? 'text-green-600' :
              status === 'partial' ? 'text-orange-600' :
              'text-red-600'
            }`}>
              {details}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OnboardingSyncStatus;
