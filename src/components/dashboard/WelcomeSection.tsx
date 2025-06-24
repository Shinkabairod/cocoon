
import React from 'react';
import { CheckCircle, Target } from 'lucide-react';

interface WelcomeSectionProps {
  user: any;
  stats: any;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ user, stats }) => {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Bonjour' : currentHour < 18 ? 'Bon après-midi' : 'Bonsoir';
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Créateur';

  return (
    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-xl p-6 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              {greeting}, {userName} ! 👋
            </h2>
            <p className="text-blue-100 mb-4">
              {stats?.todayActivity > 0 
                ? `Vous avez déjà généré ${stats.todayActivity} contenus aujourd'hui !`
                : "Prêt à créer du contenu incroyable aujourd'hui ?"
              }
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">Profil complété</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4" />
                <span className="text-sm">{stats?.completedGoals || 0} objectifs atteints</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{stats?.totalScore || 0}</div>
            <div className="text-sm text-blue-200">Score Créateur</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
