import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
const FAQSection: React.FC = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  const faqs = [{
    question: "Comment fonctionne l'IA de Cocoon ?",
    answer: "Notre IA analyse tes vraies méthodes, ton contenu et ton savoir-faire pour créer un assistant parfaitement adapté à ton expertise. Pas d'IA générique : chaque réponse reflète ta voix et ton expérience unique."
  }, {
    question: "Mes données sont-elles sécurisées ?",
    answer: "Absolument. Toutes tes données sont cryptées et stockées de manière sécurisée. Tu gardes le contrôle total sur ce que ton bot utilise et délivre. Aucune information n'est partagée ou utilisée sans ton autorisation."
  }, {
    question: "Combien de temps faut-il pour créer mon bot ?",
    answer: "En général, quelques minutes suffisent pour configurer ton profil et télécharger tes ressources. L'IA analyse ensuite tes données et ton bot est prêt à fonctionner en moins de 24h."
  }, {
    question: "Puis-je modifier mon bot après sa création ?",
    answer: "Bien sûr ! Tu peux à tout moment ajouter de nouvelles ressources, modifier le style de communication de ton bot ou ajuster ses domaines d'intervention selon tes besoins."
  }, {
    question: "Comment mon bot génère-t-il des revenus ?",
    answer: "Ton bot peut vendre tes services, proposer tes formations, gérer tes consultations et même créer du contenu personnalisé pour tes clients 24/7, sans que tu aies besoin d'intervenir."
  }, {
    question: "Y a-t-il une garantie de remboursement ?",
    answer: "Oui, nous offrons une garantie satisfait ou remboursé de 30 jours. Si tu n'es pas complètement satisfait de ton bot, nous te remboursons intégralement."
  }];
  return <section className="py-24 bg-gradient-to-br from-gray-50 to-orange-50/30 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-grey-800 bg-clip-text text-transparent mb-6">
            Questions fréquentes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Toutes les réponses aux questions que tu te poses sur Cocoon AI
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => <div key={index} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300"></div>
              {/* Ombre grise dessous */}
              <div className="absolute inset-0 bg-gray-400/20 rounded-2xl transform translate-y-2 translate-x-1 blur-sm"></div>
              <div className="relative bg-white border-2 border-gray-300 rounded-2xl hover:border-gray-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-200/30">
                <button className="w-full p-4 text-left flex items-center justify-between" onClick={() => setOpenQuestion(openQuestion === index ? null : index)}>
                  <h3 className="text-lg font-bold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center group-hover:bg-gray-100 transition-colors duration-300">
                      <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${openQuestion === index ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                </button>
                
                {openQuestion === index && <div className="px-4 pb-4">
                    <div className="border-t border-gray-100 pt-3">
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>}
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};
export default FAQSection;