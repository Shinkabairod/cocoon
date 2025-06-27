
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const OnboardingFlow: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome to Onboarding</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            This is the onboarding flow. Complete your profile setup to get started.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingFlow;
