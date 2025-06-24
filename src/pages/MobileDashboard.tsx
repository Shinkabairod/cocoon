import React, { useState } from 'react';
import { Home, MessageSquare, Upload, Settings, User, Plus, TrendingUp, Target, BookOpen, Video, Mic, FileText, Image } from 'lucide-react';

const MobileDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState({ name: 'Alex', plan: 'Pro' });

  const tabs = [
    { id: 'home', icon: Home, label: 'Accueil' },
    { id: 'create', icon: Plus, label: 'Créer' },
    { id: 'chat', icon: MessageSquare, label: 'Coach IA' },
    { id: 'resources', icon: Upload, label: 'Ressources' },
    { id: 'profile', icon: User, label: 'Profil' }
  ];

  const quickActions = [
    { icon: Video, label: 'Script Vidéo', color: 'bg-red-500' },
    { icon: Mic, label: 'Podcast', color: 'bg-purple-500' },
    { icon: FileText, label: 'Article Blog', color: 'bg-blue-500' },
    { icon: Image, label: 'Post Social', color: 'bg-green-500' }
  ];

  const recentContent = [
    { title: 'Comment créer du contenu viral', type: 'Vidéo', status: 'En cours', views: '2.1K' },
    { title: '10 astuces marketing', type: 'Article', status: 'Publié', views: '5.3K' },
    { title: 'Interview expert SEO', type: 'Podcast', status: 'Planifié', views: '-' }
  ];

  const renderHomeContent = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Salut {user.name} ! 👋</h1>
            <p className="text-purple-100 text-sm">Prêt à créer du contenu génial ?</p>
          </div>
          <div className="bg-white/20 px-3 py-1 rounded-full">
            <span className="text-xs font-medium">{user.plan}</span>
          </div>
        </div>
      </div>

      {/* Stats rapides */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Vues ce mois</p>
              <p className="text-lg font-bold">24.5K</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Target className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Objectif atteint</p>
              <p className="text-lg font-bold">78%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions rapides */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Actions rapides</h2>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className="bg-white rounded-xl p-4 shadow-sm border flex items-center gap-3 hover:shadow-md transition-shadow"
            >
              <div className={`${action.color} p-2 rounded-lg`}>
                <action.icon className="h-5 w-5 text-white" />
              </div>
              <span className="font-medium text-gray-800 text-sm">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Contenu récent */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Contenu récent</h2>
        <div className="space-y-3">
          {recentContent.map((content, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-sm border">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800 text-sm">{content.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{content.type}</p>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    content.status === 'Publié' ? 'bg-green-100 text-green-600' :
                    content.status === 'En cours' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {content.status}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{content.views} vues</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCreateContent = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Créer du contenu</h1>
      
      {/* Templates */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Templates populaires</h2>
        <div className="space-y-3">
          {[
            { title: 'Vidéo TikTok virale', desc: 'Hook + problème + solution', time: '5 min' },
            { title: 'Thread Twitter', desc: 'Storytelling en 10 tweets', time: '3 min' },
            { title: 'Post LinkedIn', desc: 'Contenu professionnel engageant', time: '4 min' },
            { title: 'Script YouTube', desc: 'Structure complète avec CTA', time: '8 min' }
          ].map((template, index) => (
            <button key={index} className="w-full bg-white rounded-xl p-4 shadow-sm border text-left hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-gray-800">{template.title}</h3>
                  <p className="text-sm text-gray-500">{template.desc}</p>
                </div>
                <div className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">
                  {template.time}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Création personnalisée */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border">
        <h3 className="font-semibold text-gray-800 mb-2">Création personnalisée</h3>
        <p className="text-sm text-gray-600 mb-4">Décrivez votre idée et l'IA créera le contenu parfait</p>
        <button className="w-full bg-purple-600 text-white rounded-lg py-3 font-medium hover:bg-purple-700 transition-colors">
          Commencer avec l'IA
        </button>
      </div>
    </div>
  );

  const renderChatContent = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Coach IA</h1>
      
      {/* Suggestions */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Questions rapides</h2>
        <div className="space-y-2">
          {[
            "Comment améliorer mon engagement ?",
            "Idées de contenu pour cette semaine",
            "Analyser ma dernière vidéo",
            "Stratégie pour 10K abonnés"
          ].map((question, index) => (
            <button key={index} className="w-full bg-white rounded-lg p-3 shadow-sm border text-left text-sm hover:shadow-md transition-shadow">
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Chat interface */}
      <div className="bg-white rounded-xl shadow-sm border h-64 flex flex-col">
        <div className="p-4 border-b">
          <h3 className="font-medium">Chat avec votre coach</h3>
        </div>
        <div className="flex-1 p-4 space-y-3">
          <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
            <p className="text-sm">Bonjour ! Comment puis-je vous aider aujourd'hui ?</p>
          </div>
        </div>
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Tapez votre question..."
              className="flex-1 rounded-lg border px-3 py-2 text-sm"
            />
            <button className="bg-purple-600 text-white rounded-lg px-4 py-2 text-sm">
              Envoyer
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderResourcesContent = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Mes ressources</h1>
      
      {/* Upload */}
      <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
        <h3 className="font-medium text-gray-700 mb-2">Ajouter des ressources</h3>
        <p className="text-sm text-gray-500 mb-4">PDF, vidéos, images, liens...</p>
        <button className="bg-purple-600 text-white rounded-lg px-4 py-2 text-sm">
          Parcourir les fichiers
        </button>
      </div>

      {/* Fichiers récents */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Fichiers récents</h2>
        <div className="space-y-3">
          {[
            { name: 'Guide_Creation_Contenu.pdf', type: 'PDF', size: '2.4 MB', date: 'Il y a 2h' },
            { name: 'Video_Tuto_Editing.mp4', type: 'Vidéo', size: '45 MB', date: 'Hier' },
            { name: 'Templates_Instagram.zip', type: 'Archive', size: '12 MB', date: '3 jours' }
          ].map((file, index) => (
            <div key={index} className="bg-white rounded-lg p-3 shadow-sm border flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-sm">{file.name}</h3>
                <p className="text-xs text-gray-500">{file.type} • {file.size} • {file.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProfileContent = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Mon profil</h1>
      
      {/* Info utilisateur */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <div>
            <h2 className="font-bold text-lg">{user.name}</h2>
            <p className="text-gray-500">Créateur de contenu</p>
            <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded">{user.plan}</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between py-2">
            <span className="text-gray-600">Email</span>
            <span>alex@example.com</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-600">Spécialité</span>
            <span>Marketing Digital</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-600">Objectif</span>
            <span>100K abonnés</span>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="space-y-3">
        {[
          'Modifier le profil',
          'Préférences',
          'Notifications',
          'Aide et support',
          'Se déconnecter'
        ].map((setting, index) => (
          <button key={index} className="w-full bg-white rounded-lg p-4 shadow-sm border text-left hover:shadow-md transition-shadow">
            {setting}
          </button>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'home': return renderHomeContent();
      case 'create': return renderCreateContent();
      case 'chat': return renderChatContent();
      case 'resources': return renderResourcesContent();
      case 'profile': return renderProfileContent();
      default: return renderHomeContent();
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          ContentAI
        </h1>
        <div className="bg-gray-100 p-2 rounded-lg">
          <Settings className="h-5 w-5 text-gray-600" />
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 p-4 pb-20">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t shadow-lg">
        <div className="flex justify-around py-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                activeTab === tab.id 
                  ? 'text-purple-600 bg-purple-50' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default MobileDashboard;