
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, CheckCircle } from 'lucide-react';

interface StripeConnectionProps {
  isConnected: boolean;
  onConnect: () => void;
}

const StripeConnection = ({ isConnected, onConnect }: StripeConnectionProps) => {
  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <CreditCard className="h-5 w-5" />
        Payment Setup
      </h3>
      
      {!isConnected ? (
        <div className="space-y-4">
          <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-sm text-orange-800 mb-3">
              Connect your Stripe account to receive payments from subscribers
            </p>
            <Button onClick={onConnect} className="gradient-bg">
              <CreditCard className="h-4 w-4 mr-2" />
              Connect Stripe Account
            </Button>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2 text-green-800">
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">Stripe Connected</span>
          </div>
          <p className="text-sm text-green-700 mt-1">
            Ready to receive payments from subscribers
          </p>
        </div>
      )}
    </Card>
  );
};

export default StripeConnection;
