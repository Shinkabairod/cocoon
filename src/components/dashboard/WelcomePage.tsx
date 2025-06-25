
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, TrendingUp, Clock, MessageSquare, Sparkles, Users, Folder, Zap, DollarSign } from "lucide-react";

interface WelcomePageProps {
  user: any;
  stats: any;
  onAction: (action: string) => void;
}

interface StatsCardProps {
  title: string;
  value: number | string;
  change: string;
  icon: any;
  color: string;
}

const StatsCard = ({ title, value, change, icon: Icon, color }: StatsCardProps) => {
  const colorClasses = {
    purple: 'bg-purple-100 text-purple-600',
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    orange: 'bg-orange-100 text-orange-600'
  };

  return (
    <Card>
      <CardContent className="p-4 text-center">
        <div className={`flex items-center justify-center w-12 h-12 ${colorClasses[color as keyof typeof colorClasses]} rounded-full mx-auto mb-2`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="text-2xl font-bold text-gray-700">{value}</div>
        <div className="text-sm text-gray-600">{title}</div>
        <div className="text-xs text-green-600 mt-1">{change}</div>
      </CardContent>
    </Card>
  );
};

const NextStepItem = ({ title, description, icon: Icon, completed }: { title: string; description: string; icon: any; completed: boolean }) => (
  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${completed ? 'bg-green-100' : 'bg-gray-100'}`}>
      <Icon className={`h-4 w-4 ${completed ? 'text-green-600' : 'text-gray-400'}`} />
    </div>
    <div className="flex-1">
      <div className="font-medium text-gray-900">{title}</div>
      <div className="text-sm text-gray-500">{description}</div>
    </div>
    {completed && <div className="text-green-600 text-sm">✓</div>}
  </div>
);

const WelcomePage = ({ user, stats, onAction }: WelcomePageProps) => {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Bonjour' : currentHour < 18 ? 'Bon après-midi' : 'Bonsoir';
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Créateur';

  return (
    <div className="p-4 md:p-8 space-y-8">
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            {greeting}, {userName} ! 🦋
          </h1>
          <p className="text-purple-100 text-lg mb-6">
            Bienvenue dans votre cocon de création. Ici, vos idées se transforment en contenu extraordinaire.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="h-5 w-5" />
                <span className="font-medium">Objectif du Jour</span>
              </div>
              <p className="text-sm text-purple-100">
                {stats?.todayActivity > 0 ? `${stats.todayActivity} actions réalisées` : 'Commencer votre transformation'}
              </p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-5 w-5" />
                <span className="font-medium">Progression</span>
              </div>
              <p className="text-sm text-purple-100">
                Score créateur : {stats?.totalScore || 0}
              </p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="h-5 w-5" />
                <span className="font-medium">Temps Économisé</span>
              </div>
              <p className="text-sm text-purple-100">
                {stats?.timeSaved || 0} heures ce mois
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <Button 
              onClick={() => onAction('chat')}
              variant="secondary" 
              size="sm"
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Chatter avec l'IA
            </Button>
            <Button 
              onClick={() => onAction('script')}
              variant="secondary" 
              size="sm"
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Créer un Script
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Scripts Créés" value={stats?.scriptsGenerated || 0} change={stats?.scriptsChange || '+0%'} icon={Sparkles} color="purple" />
        <StatsCard title="Conversations IA" value={stats?.chatConversations || 0} change={stats?.chatChange || '+0%'} icon={Users} color="blue" />
        <StatsCard title="Ressources" value={stats?.resourcesUploaded || 0} change={stats?.resourcesChange || '+0%'} icon={Folder} color="green" />
        <StatsCard title="Transformations" value={Math.ceil((stats?.totalScore || 0) / 10)} change="+∞%" icon={Zap} color="orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Prochaines Étapes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <NextStepItem title="Alimentez votre Chrysalide" description="Ajoutez des ressources pour enrichir votre IA" icon={Folder} completed={stats?.resourcesUploaded > 0} />
            <NextStepItem title="Première Transformation" description="Générez votre premier script personnalisé" icon={Sparkles} completed={stats?.scriptsGenerated > 0} />
            <NextStepItem title="Partagez votre Envol" description="Configurez votre assistant pour la monétisation" icon={DollarSign} completed={false} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Évolution Récente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="text-gray-400 mb-2">📈</div>
              <p className="text-gray-500">Aucune activité récente</p>
              <p className="text-sm text-gray-400">Commencez votre première transformation pour voir vos progrès ici</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WelcomePage;
