
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { huggingfaceService } from '@/services/huggingfaceService';
import { CheckCircle, XCircle, Loader2, TestTube } from 'lucide-react';

const ConnectionTest = () => {
  const [testing, setTesting] = useState(false);
  const [results, setResults] = useState<{
    connection: boolean | null;
    timestamp: string | null;
    error: string | null;
  }>({
    connection: null,
    timestamp: null,
    error: null
  });

  const runTest = async () => {
    setTesting(true);
    setResults({ connection: null, timestamp: null, error: null });

    try {
      await huggingfaceService.testConnection();
      
      setResults({
        connection: true,
        timestamp: new Date().toLocaleString('fr-FR'),
        error: null
      });
    } catch (error) {
      setResults({
        connection: false,
        timestamp: new Date().toLocaleString('fr-FR'),
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    } finally {
      setTesting(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TestTube className="h-5 w-5" />
          <span>Test de connectivité</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={runTest} 
          disabled={testing}
          className="w-full"
        >
          {testing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Test en cours...
            </>
          ) : (
            'Tester Hugging Face'
          )}
        </Button>

        {results.connection !== null && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              {results.connection ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    Connecté
                  </Badge>
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-red-600" />
                  <Badge variant="destructive">
                    Échec
                  </Badge>
                </>
              )}
            </div>
            
            <div className="text-sm text-muted-foreground">
              {results.timestamp && `Testé le ${results.timestamp}`}
            </div>
            
            {results.error && (
              <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                {results.error}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ConnectionTest;
