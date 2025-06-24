
import React from 'react';

const DashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      <div className="bg-white border-b p-6">
        <div className="h-8 bg-gray-200 rounded w-48"></div>
      </div>
      <div className="p-6 space-y-6">
        <div className="h-32 bg-gray-200 rounded-xl"></div>
        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
