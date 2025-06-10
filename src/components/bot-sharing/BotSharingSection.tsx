
import React, { useState } from 'react';
import BotSharingHeader from './BotSharingHeader';
import StripeConnection from './StripeConnection';
import BotConfiguration from './BotConfiguration';
import BotStatistics from './BotStatistics';
import PremiumFeatures from './PremiumFeatures';
import QuickActions from './QuickActions';

const BotSharingSection = () => {
  const [isPublic, setIsPublic] = useState(false);
  const [monthlyPrice, setMonthlyPrice] = useState('9.99');
  const [subscriberCount, setSubscriberCount] = useState(12);
  const [totalRevenue, setTotalRevenue] = useState(119.88);
  const [isStripeConnected, setIsStripeConnected] = useState(false);

  const botUrl = `https://ai-coach.app/bot/john-creator-bot`;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(botUrl);
    // You could add a toast notification here
  };

  const handleConnectStripe = () => {
    // Here you would integrate with Stripe Connect
    console.log('Connecting to Stripe...');
    // For demo purposes, we'll simulate connection
    setIsStripeConnected(true);
  };

  return (
    <div className="space-y-6">
      <BotSharingHeader 
        isPublic={isPublic} 
        onTogglePublic={setIsPublic} 
      />

      {isPublic && (
        <StripeConnection 
          isConnected={isStripeConnected}
          onConnect={handleConnectStripe}
        />
      )}

      {isPublic && isStripeConnected && (
        <>
          <BotConfiguration
            monthlyPrice={monthlyPrice}
            onPriceChange={setMonthlyPrice}
            botUrl={botUrl}
            onCopyUrl={handleCopyUrl}
          />

          <BotStatistics
            subscriberCount={subscriberCount}
            totalRevenue={totalRevenue}
            monthlyPrice={monthlyPrice}
          />
        </>
      )}

      <PremiumFeatures />

      {isPublic && isStripeConnected && <QuickActions />}
    </div>
  );
};

export default BotSharingSection;
