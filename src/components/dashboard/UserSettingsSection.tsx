
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Key, RotateCcw, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const UserSettingsSection = () => {
  const { user } = useAuth();
  const { resetOnboarding } = useOnboarding();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isRestartingOnboarding, setIsRestartingOnboarding] = useState(false);

  const handlePasswordChange = async () => {
    if (!newPassword || newPassword.length < 6) {
      toast({
        title: "❌ Invalid Password",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "❌ Password Mismatch",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    setIsChangingPassword(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      toast({
        title: "✅ Password Updated",
        description: "Your password has been successfully changed.",
      });

      setNewPassword('');
      setConfirmPassword('');

    } catch (error) {
      console.error('Password change error:', error);
      toast({
        title: "❌ Password Change Failed",
        description: error instanceof Error ? error.message : "Unable to change password.",
        variant: "destructive",
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleRestartOnboarding = async () => {
    if (!user) {
      toast({
        title: "❌ Authentication Error",
        description: "You must be logged in to restart onboarding.",
        variant: "destructive",
      });
      return;
    }

    setIsRestartingOnboarding(true);

    try {
      // Reset onboarding data locally
      resetOnboarding();

      toast({
        title: "🔄 Onboarding Reset",
        description: "Your onboarding data has been reset. Redirecting to onboarding...",
      });

      // Redirect to onboarding after a short delay
      setTimeout(() => {
        navigate('/onboarding');
      }, 1500);

    } catch (error) {
      console.error('Onboarding restart error:', error);
      toast({
        title: "❌ Restart Failed",
        description: "Unable to restart onboarding process.",
        variant: "destructive",
      });
    } finally {
      setIsRestartingOnboarding(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Settings className="h-6 w-6" />
          User Settings
        </h2>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Password Change Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Change Password
            </CardTitle>
            <CardDescription>
              Update your account password for better security
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                minLength={6}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                minLength={6}
              />
            </div>
            <Button 
              onClick={handlePasswordChange}
              disabled={isChangingPassword || !newPassword || !confirmPassword}
              className="w-full"
            >
              {isChangingPassword ? (
                <>
                  <RotateCcw className="h-4 w-4 mr-2 animate-spin" />
                  Changing...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Change Password
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Onboarding Restart Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RotateCcw className="h-5 w-5" />
              Restart Onboarding
            </CardTitle>
            <CardDescription>
              Reset your profile and go through the onboarding process again
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              This will reset all your onboarding data and redirect you to the beginning of the setup process. 
              Your account will remain active.
            </p>
            <Button 
              onClick={handleRestartOnboarding}
              disabled={isRestartingOnboarding}
              variant="outline"
              className="w-full"
            >
              {isRestartingOnboarding ? (
                <>
                  <RotateCcw className="h-4 w-4 mr-2 animate-spin" />
                  Restarting...
                </>
              ) : (
                <>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Restart Onboarding
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserSettingsSection;
