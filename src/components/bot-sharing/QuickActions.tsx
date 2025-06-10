
import React from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Eye } from 'lucide-react';

const QuickActions = () => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button variant="outline" className="flex items-center gap-2">
        <Share2 className="h-4 w-4" />
        Share Bot
      </Button>
      <Button variant="outline" className="flex items-center gap-2">
        <Eye className="h-4 w-4" />
        Preview Bot
      </Button>
    </div>
  );
};

export default QuickActions;
