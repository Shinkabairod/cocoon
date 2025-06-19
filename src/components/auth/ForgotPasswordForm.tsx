
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Loader2 } from 'lucide-react';

interface ForgotPasswordFormProps {
  onBack: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { resetPassword } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer votre adresse email",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    const { error } = await resetPassword(email);
    
    if (error) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Email envoyé !",
        description: "Vérifiez votre boîte mail pour réinitialiser votre mot de passe.",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="space-y-4">
      <Button
        variant="ghost"
        onClick={onBack}
        className="p-0 h-auto font-normal text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour à la connexion
      </Button>
      
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Mot de passe oublié</h3>
        <p className="text-sm text-muted-foreground">
          Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="reset-email">Email</Label>
          <Input
            id="reset-email"
            type="email"
            placeholder="Entrez votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <Button type="submit" className="w-full gradient-bg" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Envoi en cours...
            </>
          ) : (
            'Envoyer le lien de réinitialisation'
          )}
        </Button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
