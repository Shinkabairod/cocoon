import React, { useState } from 'react';
import { 
  Home, 
  FileText, 
  Calendar, 
  BookOpen, 
  BarChart, 
  Settings, 
  HelpCircle, 
  LogOut,
  Search,
  Bell,
  Plus,
  Sparkles,
  FolderOpen,
  User,
  Crown,
  Eye,
  TrendingUp,
  Users,
  CheckCircle,
  ArrowRight,
  Video,
  Mic,
  Image,
  MessageSquare,
  Upload,
  Edit,
  Trash2,
  MoreHorizontal,
  Target,
  Brain,
  Lightbulb,
  Globe
} from 'lucide-react';

// Composants simulés (gardez vos vrais composants)
const UserSettingsSection = () => (
  <div className="space-y-6">
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
        <Settings className="h-6 w-6" />
        Mon Compte
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">JD</span>
            </div>
            <div>
              <h3 className="font-semibold">John Doe</h3>
              <p className="text-gray-600">john@example.com</p>
              <div className="flex items-center gap-2 mt-1">
                <Crown className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">Plan Pro</span>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <h4 className="font-medium">Actions rapides</h4>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Sparkles, label: 'Outils IA' },
              { icon: FolderOpen, label: 'Mes fichiers' },
              { icon: BarChart, label: 'Statistiques' },
              { icon: User, label: 'Mon profil' }
            ].map((item, index) => (
              <button
                key={index}
                className="bg-gray-50 hover:bg-gray-100 p-3 rounded-lg transition-colors flex flex-col items-center gap-2"
              >
                <item.icon className="h-5 w-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const OnboardingDataSection = () => (
  <div className="space-y-6">
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
        <User className="h-6 w-6" />
        Mes Données Onboarding
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-600">Niveau d'expérience</label>
            <p className="font-medium">Intermédiaire</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Niche</label>
            <p className="font-medium">Marketing Digital</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Plateformes</label>
            <div className="flex gap-2 mt-1">
              {['YouTube', 'LinkedIn', 'Instagram'].map((platform) => (
                <span key={platform} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                  {platform}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-600">Objectif principal</label>
            <p className="font-medium">Développer mon audience</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Type de contenu</label>
            <p className="font-medium">Vidéos éducatives</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Temps disponible</label>
            <p className="font-medium">3-5 heures par semaine</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CreationsSection = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-semibold">Mes Créations</h2>
      <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
        <Plus className="h-4 w-4" />
        Nouvelle création
      </button>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        { title: 'Script Vidéo YouTube', type: 'Vidéo', status: 'Terminé', icon: Video, color: 'from-red-500 to-red-600' },
        { title: 'Article de Blog SEO', type: 'Article', status: 'En cours', icon: FileText, color: 'from-blue-500 to-blue-600' },
        { title: 'Post LinkedIn', type: 'Social', status: 'Planifié', icon: MessageSquare, color: 'from-green-500 to-green-600' },
      ].map((creation, index) => (
        <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className={`w-12 h-12 bg-gradient-to-br ${creation.color} rounded-lg flex items-center justify-center mb-4`}>
            <creation.icon className="h-6 w-6 text-white" />
          </div>
          <h3 className="font-semibold mb-2">{creation.title}</h3>
          <p className="text-sm text-gray-600 mb-3">{creation.type}</p>
          <div className="flex items-center justify-between">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              creation.status === 'Terminé' ? 'bg-green-100 text-green-800' :
              creation.status === 'En cours' ? 'bg-orange-100 text-orange-800' :
              'bg-blue-100 text-blue-800'
            }`}>
              {creation.status}
            </span>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const UserWorkspace = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-semibold flex items-center gap-2">
        <FolderOpen className="h-6 w-6" />
        Mon Espace de Travail
      </h2>
      <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
        <Upload className="h-4 w-4" />
        Uploader
      </button>
    </div>
    
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { type: 'Documents', count: 24, icon: FileText, color: 'from-blue-500 to-blue-600' },
        { type: 'Images', count: 18, icon: Image, color: 'from-green-500 to-green-600' },
        { type: 'Vidéos', count: 7, icon: Video, color: 'from-red-500 to-red-600' },
        { type: 'Audio', count: 5, icon: Mic, color: 'from-purple-500 to-purple-600' }
      ].map((resource) => (
        <div key={resource.type} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className={`w-12 h-12 bg-gradient-to-br ${resource.color} rounded-lg flex items-center justify-center mb-4`}>
            <resource.icon className="h-6 w-6 text-white" />
          </div>
          <h3 className="font-semibold mb-1">{resource.type}</h3>
          <p className="text-sm text-gray-600">{resource.count} fichiers</p>
        </div>
      ))}
    </div>
  </div>
);

const DashboardWebImproved = () => {
  const [activePage, setActivePage] = useState('welcome');
  
  // Navigation items pour la sidebar
  const navItems = [
    { id: 'welcome', icon: Home, label: "Accueil", path: "/dashboard" },
    { id: 'creation', icon: FileText, label: "Mes Créations", path: "/dashboard/scripts" },
    { id: 'resources', icon: FolderOpen, label: "Mon Workspace", path: "/dashboard/calendar" },
    { id: 'monetization', icon: Crown, label: "Mon Bot IA", path: "/dashboard/resources" },
    { id: 'settings', icon: Settings, label: "Paramètres", path: "/dashboard/analytics" },
  ];
  
  const accountItems = [
    { icon: HelpCircle, label: "Aide & Support", path: "/dashboard/support" },
  ];

  // Données pour la page d'accueil
  const stats = {
    contents: 47,
    views: 12543,
    engagement: 8.7,
    followers: 2847
  };

  const quickActions = [
    { icon: Video, label: 'Script Vidéo', color: 'from-red-500 to-red-600', desc: 'Créer un script optimisé' },
    { icon: Mic, label: 'Podcast', color: 'from-purple-500 to-purple-600', desc: 'Episode de podcast' },
    { icon: FileText, label: 'Article Blog', color: 'from-blue-500 to-blue-600', desc: 'Article de blog SEO' },
    { icon: MessageSquare, label: 'Post Social', color: 'from-green-500 to-green-600', desc: 'Contenu pour réseaux' }
  ];

  const recentContent = [
    { id: 1, title: 'Comment créer du contenu viral', type: 'Vidéo', status: 'Publié', views: '2.1K', engagement: '5.2%' },
    { id: 2, title: '10 astuces marketing digital', type: 'Article', status: 'En cours', views: '1.8K', engagement: '7.4%' },
    { id: 3, title: 'Interview expert SEO', type: 'Podcast', status: 'Planifié', views: '-', engagement: '-' }
  ];

  // Fonction pour obtenir le badge de statut
  const getStatusBadge = (status) => {
    const styles = {
      'Publié': 'bg-green-100 text-green-800 border-green-200',
      'En cours': 'bg-orange-100 text-orange-800 border-orange-200',
      'Planifié': 'bg-blue-100 text-blue-800 border-blue-200'
    };
    return styles[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  // Rendu de la page d'accueil
  const renderWelcomePage = () => (
    <div className="space-y-8">
      {/* Hero Section avec stats */}
      <div className="bg-gradient-to-br from-black via-gray-900 to-black rounded-2xl p-8 text-white overflow-hidden relative">
        {/* Pattern background subtil */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Bonjour John ! 👋
              </h1>
              <p className="text-white/80">
                Votre workspace créatif vous attend
              </p>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Crown className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-medium">Plan Pro</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Contenus', value: stats.contents, suffix: '', icon: FileText },
              { label: 'Vues totales', value: stats.views, suffix: '', icon: Eye },
              { label: 'Engagement', value: stats.engagement, suffix: '%', icon: TrendingUp },
              { label: 'Followers', value: stats.followers, suffix: '', icon: Users }
            ].map((stat, index) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="h-5 w-5 mx-auto mb-2 text-white/80" />
                <div className="text-2xl font-bold mb-1">
                  {stat.value.toLocaleString()}{stat.suffix}
                </div>
                <div className="text-xs text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Actions rapides</h2>
          <button className="text-sm text-gray-600 hover:text-black transition-colors flex items-center gap-1">
            Voir tout <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={action.label}
              className="group bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 text-left"
              onClick={() => setActivePage('creation')}
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <action.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-1">{action.label}</h3>
              <p className="text-sm text-gray-600">{action.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Contenus récents */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Contenus récents</h2>
          <button className="text-sm text-gray-600 hover:text-black transition-colors flex items-center gap-1">
            Gérer tout <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        
        <div className="space-y-3">
          {recentContent.map((content) => (
            <div key={content.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium">{content.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadge(content.status)}`}>
                      {content.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{content.type}</span>
                    <span>•</span>
                    <span>{content.views} vues</span>
                    {content.engagement !== '-' && (
                      <>
                        <span>•</span>
                        <span>{content.engagement} engagement</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-black transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-black transition-colors">
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Rendu conditionnel du contenu principal
  const renderMainContent = () => {
    switch(activePage) {
      case 'welcome': return renderWelcomePage();
      case 'creation': return <CreationsSection />;
      case 'resources': return <UserWorkspace />;
      case 'monetization': 
        return (
          <div className="text-center py-12">
            <Crown className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Mon Bot IA</h2>
            <p className="text-gray-600 mb-6">Fonctionnalité premium - Bientôt disponible</p>
            <button className="bg-black text-white px-6 py-3 rounded-lg" disabled>
              En développement
            </button>
          </div>
        );
      case 'settings': return <UserSettingsSection />;
      default: return renderWelcomePage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-white transform rotate-45 rounded-sm"></div>
              </div>
            </div>
            <span className="text-xl font-bold">Cocoon AI</span>
          </div>

          {/* Search bar */}
          <div className="flex items-center flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input 
                type="text"
                placeholder="Rechercher..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Actions utilisateur */}
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">JD</span>
              </div>
              <div>
                <div className="font-medium">John Doe</div>
                <div className="text-xs text-gray-500">Plan Pro</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 h-[calc(100vh-64px)] sticky top-16 flex flex-col">
          <nav className="flex-1 p-4">
            <div className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all ${
                    activePage === item.id 
                      ? 'bg-black text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
            
            <div className="mt-8">
              <h3 className="text-xs uppercase font-medium text-gray-500 mb-2 px-3">
                Compte
              </h3>
              <div className="space-y-1">
                {accountItems.map((item, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-gray-700 hover:bg-gray-100 transition-all"
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </nav>
          
          <div className="p-4 border-t">
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-gray-500 hover:bg-gray-100 transition-all">
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Se déconnecter</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
};

export default DashboardWebImproved;