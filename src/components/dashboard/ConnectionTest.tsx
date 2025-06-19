
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { huggingfaceService } from '@/services/huggingfaceService';
import { useAuth } from '@/contexts/AuthContext';
import { CheckCircle, XCircle, Loader2, TestTube, Database, MessageSquare, AlertTriangle } from 'lucide-react';

const ConnectionTest = () => {
  const { user } = useAuth();
  const [testing, setTesting] = useState(false);
  const [results, setResults] = useState<{
    connection: boolean | null;
    aiTest: boolean | null;
    timestamp: string | null;
    error: string | null;
    details: string | null;
  }>({
    connection: null,
    aiTest: null,
    timestamp: null,
    error: null,
    details: null
  });

  const runTest = async () => {
    setTesting(true);
    setResults({ connection: null, aiTest: null, timestamp: null, error: null, details: null });

    try {
      // Vérification préalable de l'authentification
      if (!user) {
        throw new Error('Vous devez être connecté pour effectuer ce test');
      }

      console.log('🔗 Début du test de connectivité...');
      console.log('👤 Utilisateur connecté:', user.id, user.email);

      // Test 1: Connectivité de base
      console.log('🔗 Test de connectivité Hugging Face...');
      await huggingfaceService.testConnection();
      
      setResults(prev => ({ 
        ...prev, 
        connection: true,
        details: 'Connectivité Hugging Face confirmée'
      }));

      console.log('✅ Connectivité OK, test IA...');

      // Test 2: Test de l'IA
      console.log('🤖 Test IA...');
      const aiResponse = await huggingfaceService.askAI(
        "Test de connectivité - réponds juste 'OK' stp",
        "Test technique de connectivité"
      );
      
      console.log('🤖 Réponse IA reçue:', aiResponse);
      
      setResults({
        connection: true,
        aiTest: true,
        timestamp: new Date().toLocaleString('fr-FR'),
        error: null,
        details: `IA fonctionnelle. Réponse: "${aiResponse?.substring(0, 50)}..."`
      });
      
      console.log('✅ Tous les tests réussis !');
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      console.error('❌ Test échoué:', error);
      
      setResults({
        connection: false,
        aiTest: false,
        timestamp: new Date().toLocaleString('fr-FR'),
        error: errorMessage,
        details: null
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
        {!user && (
          <div className="flex items-center space-x-2 p-3 bg-orange-50 rounded-lg">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <span className="text-sm text-orange-700">
              Vous devez être connecté pour tester
            </span>
          </div>
        )}

        <Button 
          onClick={runTest} 
          disabled={testing || !user}
          className="w-full"
        >
          {testing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Test en cours...
            </>
          ) : (
            'Tester Hugging Face + IA'
          )}
        </Button>

        {results.connection !== null && (
          <div className="space-y-3">
            {/* Test de connectivité */}
            <div className="flex items-center space-x-2">
              <Database className="h-4 w-4" />
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

            {/* Test IA */}
            {results.aiTest !== null && (
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4" />
                {results.aiTest ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <Badge variant="default" className="bg-blue-100 text-blue-800">
                      IA OK
                    </Badge>
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 text-red-600" />
                    <Badge variant="destructive">
                      IA Échec
                    </Badge>
                  </>
                )}
              </div>
            )}
            
            <div className="text-sm text-muted-foreground">
              {results.timestamp && `Testé le ${results.timestamp}`}
            </div>
            
            {results.details && (
              <div className="text-sm text-green-600 bg-green-50 p-2 rounded">
                {results.details}
              </div>
            )}
            
            {results.error && (
              <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                <strong>Erreur:</strong> {results.error}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ConnectionTest;
