import { OnboardingData } from '@/types/onboarding';
import { huggingfaceService } from './huggingfaceService';

interface ObsidianFile {
  path: string;
  content: string;
}

export const obsidianStructureService = {
  async createUserVault(userId: string, onboardingData: OnboardingData): Promise<void> {
    const files = this.generateObsidianFiles(onboardingData);
    
    console.log(`🗂️ Création de ${files.length} fichiers Obsidian pour user ${userId}`);
    
    // Créer chaque fichier dans la structure vaults/user_{userId}/
    for (const file of files) {
      try {
        await huggingfaceService.saveObsidianFile(userId, file.path, file.content);
        console.log(`✅ Fichier créé: ${file.path}`);
      } catch (error) {
        console.error(`❌ Erreur création fichier ${file.path}:`, error);
        // Fallback vers la méthode note standard
        await huggingfaceService.saveNote(
          file.path.replace('.md', '').replace(/\//g, '_'),
          file.content,
          'obsidian_vault'
        );
      }
    }
    
    console.log(`🎯 Structure Obsidian complète créée pour user ${userId}`);
  },

  generateObsidianFiles(data: OnboardingData): ObsidianFile[] {
    const files: ObsidianFile[] = [];
    const date = new Date().toISOString().split('T')[0];

    // 1. Profile/user_profile.md
    files.push({
      path: 'Profile/user_profile.md',
      content: this.generateUserProfile(data, date)
    });

    // 2. Profile/business_profile.md
    files.push({
      path: 'Profile/business_profile.md',
      content: this.generateBusinessProfile(data)
    });

    // 3. Profile/creator_personality.md (si path découverte)
    if (data.hasContentDirection === false && data.passions) {
      files.push({
        path: 'Profile/creator_personality.md',
        content: this.generateCreatorPersonality(data)
      });
    }

    // 4. Content_Strategy/content_goals.md
    files.push({
      path: 'Content_Strategy/content_goals.md',
      content: this.generateContentGoals(data)
    });

    // 5. Content_Strategy/platforms_and_audience.md
    files.push({
      path: 'Content_Strategy/platforms_and_audience.md',
      content: this.generatePlatformsAndAudience(data)
    });

    // 6. Content_Strategy/content_types_and_niche.md
    files.push({
      path: 'Content_Strategy/content_types_and_niche.md',
      content: this.generateContentTypesAndNiche(data)
    });

    // 7. Content_Strategy/social_accounts.md
    if (data.socialMediaAccounts && Object.keys(data.socialMediaAccounts).length > 0) {
      files.push({
        path: 'Content_Strategy/social_accounts.md',
        content: this.generateSocialAccounts(data)
      });
    }

    // 8. Resources_and_Skills/current_challenges.md
    files.push({
      path: 'Resources_and_Skills/current_challenges.md',
      content: this.generateCurrentChallenges(data)
    });

    // 9. Resources_and_Skills/available_resources.md
    files.push({
      path: 'Resources_and_Skills/available_resources.md',
      content: this.generateAvailableResources(data)
    });

    // 10. Resources_and_Skills/learning_preferences.md
    files.push({
      path: 'Resources_and_Skills/learning_preferences.md',
      content: this.generateLearningPreferences(data)
    });

    // 11. Resources_and_Skills/existing_skills.md
    if (data.selectedSkills && data.selectedSkills.length > 0) {
      files.push({
        path: 'Resources_and_Skills/existing_skills.md',
        content: this.generateExistingSkills(data)
      });
    }

    // 12. Goals_and_Metrics/impact_goals.md
    files.push({
      path: 'Goals_and_Metrics/impact_goals.md',
      content: this.generateImpactGoals(data)
    });

    // 13. Goals_and_Metrics/success_metrics.md
    if (data.successMetrics && data.successMetrics.length > 0) {
      files.push({
        path: 'Goals_and_Metrics/success_metrics.md',
        content: this.generateSuccessMetrics(data)
      });
    }

    // 14. Goals_and_Metrics/monetization_strategy.md
    files.push({
      path: 'Goals_and_Metrics/monetization_strategy.md',
      content: this.generateMonetizationStrategy(data)
    });

    // 15. AI_Context/onboarding_summary.md (fichier principal pour l'IA)
    files.push({
      path: 'AI_Context/onboarding_summary.md',
      content: this.generateAISummary(data)
    });

    return files;
  },

  generateUserProfile(data: OnboardingData, date: string): string {
    return `# Profil Utilisateur

## Informations de base
- **Niveau d'expérience**: ${data.experienceLevel || 'Non spécifié'}
- **Objectif principal**: ${data.contentGoal || 'Non spécifié'}
- **Localisation**: ${data.city ? `${data.city}, ${data.country}` : data.country || 'Non spécifiée'}
- **Date d'onboarding**: ${date}

## Vision créative
${data.businessDescription || 'Aucune description fournie'}

## Statut onboarding
- **Étape**: ${data.step}/21
- **Direction claire**: ${data.hasContentDirection ? 'Oui' : 'Non'}
- **Path suivi**: ${data.onboardingStage || 'Standard'}

## Tags
#profil #utilisateur #onboarding
`;
  },

  generateBusinessProfile(data: OnboardingData): string {
    return `# Profil Business

## Type d'activité
${data.businessType || 'Non spécifié'}

## Description détaillée
${data.businessDescription || 'Aucune description fournie'}

## Localisation business
- **Pays**: ${data.country || 'Non spécifié'}
- **Ville**: ${data.city || 'Non spécifiée'}

## Objectifs business
${data.contentGoal || 'Non spécifié'}

## Tags
#business #professionnel #activité
`;
  },

  generateCreatorPersonality(data: OnboardingData): string {
    return `# Personnalité Créatrice

## Passions identifiées
${data.passions?.join(', ') || 'Non spécifiées'}

## Traits de personnalité
${data.personalityTraits?.join(', ') || 'Non spécifiés'}

## Valeurs de vie
${data.lifeValues?.join(', ') || 'Non spécifiées'}

## Path de découverte
Cette section contient les informations collectées lors du parcours de découverte créatrice pour les utilisateurs sans direction claire.

## Tags
#personnalité #valeurs #découverte #créateur
`;
  },

  generateContentGoals(data: OnboardingData): string {
    return `# Objectifs de Contenu

## Objectif principal
${data.contentGoal || 'Non spécifié'}

## Objectifs d'impact
${data.impactGoals?.join(', ') || 'Non spécifiés'}

## Vision à long terme
${data.businessDescription || 'Aucune vision définie'}

## Stratégie de croissance
Basé sur le niveau d'expérience: ${data.experienceLevel || 'Non défini'}

## Tags
#objectifs #stratégie #vision #croissance
`;
  },

  generatePlatformsAndAudience(data: OnboardingData): string {
    return `# Plateformes et Audience

## Plateformes cibles
${data.platforms?.join(', ') || 'Aucune plateforme sélectionnée'}

## Audience cible
- **Génération**: ${data.targetGeneration || 'Non spécifiée'}

## Objectifs d'impact sur l'audience
${data.impactGoals?.join(', ') || 'Non spécifiés'}

## Stratégie multi-plateforme
${data.platforms?.length > 1 ? 'Stratégie multi-plateforme activée' : 'Focus sur une plateforme principale'}

## Tags
#plateformes #audience #cible #engagement
`;
  },

  generateContentTypesAndNiche(data: OnboardingData): string {
    return `# Types de Contenu et Niche

## Types de contenu
${data.contentTypes?.join(', ') || 'Aucun type sélectionné'}

## Niche spécialisée
${data.niche || 'Niche générale'}

## Catégories de contenu
${data.contentCategories?.join(', ') || 'Aucune catégorie spécifique'}

## Lieux de tournage
- **Principal**: ${data.filmingLocationName || data.filmingLocation || 'Non spécifié'}
- **Personnalisé**: ${data.customFilmingLocation || 'Aucun'}

## Tags
#contenu #niche #catégories #tournage
`;
  },

  generateSocialAccounts(data: OnboardingData): string {
    const accounts = data.socialMediaAccounts || {};
    const accountList = Object.entries(accounts)
      .filter(([_, account]) => account && account.trim() !== '')
      .map(([platform, account]) => `- **${platform}**: ${account}`)
      .join('\n');

    return `# Comptes Sociaux

## Comptes existants
${accountList || 'Aucun compte renseigné'}

## Stratégie de liaison
Intégration des comptes existants dans la stratégie de contenu globale.

## Tags
#réseaux-sociaux #comptes #existants #intégration
`;
  },

  generateCurrentChallenges(data: OnboardingData): string {
    return `# Défis Actuels

## Principaux défis identifiés
${data.contentChallenges?.join(', ') || 'Aucun défi spécifique identifié'}

## Priorisation des défis
1. **Défi principal**: ${data.contentChallenges?.[0] || 'Non identifié'}
2. **Défi secondaire**: ${data.contentChallenges?.[1] || 'Non identifié'}

## Plan d'action recommandé
Basé sur les défis identifiés et le niveau d'expérience (${data.experienceLevel}).

## Tags
#défis #obstacles #priorités #action
`;
  },

  generateAvailableResources(data: OnboardingData): string {
    return `# Ressources Disponibles

## Temps disponible
**${data.timeAvailable || 'Non spécifié'}** par semaine

## Équipement possédé
${data.equipmentOwned?.join(', ') || 'Aucun équipement spécifique renseigné'}

## Lieux de tournage
- **Type**: ${data.filmingLocationName || 'Non spécifié'}
- **Détails**: ${data.customFilmingLocation || 'Standard'}

## Ressources éducatives sélectionnées
${data.selectedResources?.filter(r => r.selected).map(r => r.title).join(', ') || 'Aucune ressource sélectionnée'}

## Tags
#ressources #équipement #temps #formation
`;
  },

  generateLearningPreferences(data: OnboardingData): string {
    return `# Préférences d'Apprentissage

## Style d'apprentissage
${data.learningStyle || 'Non spécifié'}

## Ressources préférées
${data.selectedResources?.filter(r => r.selected).map(r => `- ${r.title}: ${r.description}`).join('\n') || 'Aucune préférence spécifique'}

## Méthode recommandée
Basé sur le profil: adaptation du coaching selon le style d'apprentissage identifié.

## Tags
#apprentissage #formation #style #méthode
`;
  },

  generateExistingSkills(data: OnboardingData): string {
    return `# Compétences Existantes

## Compétences actuelles
${data.selectedSkills?.join(', ') || 'Aucune compétence spécifique identifiée'}

## Niveau d'expérience global
${data.experienceLevel || 'Non évalué'}

## Compétences à développer
Basé sur les défis identifiés: ${data.contentChallenges?.join(', ') || 'À définir'}

## Tags
#compétences #skills #développement #expertise
`;
  },

  generateImpactGoals(data: OnboardingData): string {
    return `# Objectifs d'Impact

## Types d'impact souhaités
${data.impactGoals?.join(', ') || 'Impact non défini'}

## Audience cible
${data.targetGeneration || 'Toutes générations'}

## Stratégie d'impact
Alignement entre les objectifs d'impact et le type de contenu (${data.contentTypes?.join(', ') || 'non défini'}).

## Tags
#impact #audience #influence #objectifs
`;
  },

  generateSuccessMetrics(data: OnboardingData): string {
    return `# Métriques de Succès

## Indicateurs de succès
${data.successMetrics?.join(', ') || 'Métriques non définies'}

## Objectifs de croissance
Basé sur: ${data.contentGoal || 'objectif non défini'}

## Suivi recommandé
Métriques adaptées au niveau d'expérience (${data.experienceLevel}) et aux plateformes choisies.

## Tags
#métriques #succès #mesure #croissance
`;
  },

  generateMonetizationStrategy(data: OnboardingData): string {
    return `# Stratégie de Monétisation

## Intention de monétisation
${data.monetization || 'Non définie'}

## Plan sélectionné
${data.selectedPlan || 'Aucun plan choisi'}

## Objectifs business
${data.contentGoal || 'Non défini'}

## Recommandations
Stratégie adaptée au niveau d'expérience et aux objectifs définis.

## Tags
#monétisation #business #revenus #stratégie
`;
  },

  generateAISummary(data: OnboardingData): string {
    const challengesPriority = data.contentChallenges?.slice(0, 2) || [];
    const platforms = data.platforms?.slice(0, 3) || [];
    const skills = data.selectedSkills?.slice(0, 3) || [];

    return `# Résumé Onboarding - Contexte IA

## Profil rapide
Créateur **${data.experienceLevel || 'débutant'}** en **${data.niche || 'contenu général'}**, objectif: **${data.contentGoal || 'non défini'}**

## Priorités coaching
1. **Défi principal**: ${challengesPriority[0] || 'À identifier'}
2. **Défi secondaire**: ${challengesPriority[1] || 'À identifier'}
3. **Temps disponible**: ${data.timeAvailable || 'Non spécifié'}
4. **Style d'apprentissage**: ${data.learningStyle || 'À définir'}

## Contexte technique
- **Plateformes**: ${platforms.join(', ') || 'Non définies'}
- **Types de contenu**: ${data.contentTypes?.join(', ') || 'Non définis'}
- **Équipement**: ${data.equipmentOwned?.length || 0} items disponibles
- **Compétences**: ${skills.join(', ') || 'À évaluer'}

## Audience et impact
- **Cible**: ${data.targetGeneration || 'Large audience'}
- **Impact souhaité**: ${data.impactGoals?.join(', ') || 'À définir'}

## Business et monétisation
- **Intention monétisation**: ${data.monetization || 'Non définie'}
- **Type d'activité**: ${data.businessType || 'Personnel'}

## Recommandations automatiques
### Focus immédiat
${challengesPriority[0] ? `Résoudre le défi "${challengesPriority[0]}" en priorité` : 'Définir les priorités de contenu'}

### Plan d'action suggéré
1. **Semaine 1-2**: Formation sur ${challengesPriority[0] || 'les bases'}
2. **Semaine 3-4**: Création de contenu adapté aux ${platforms.join(' et ') || 'plateformes choisies'}
3. **Mois 2**: Optimisation basée sur ${data.successMetrics?.[0] || 'les premiers résultats'}

## Points d'attention pour l'IA
- **Niveau d'accompagnement**: ${data.experienceLevel === 'Beginner' ? 'Haute guidance' : data.experienceLevel === 'Experienced' ? 'Conseils experts' : 'Guidance modérée'}
- **Personnalisation**: ${data.hasContentDirection === false ? 'Forte personnalisation requise' : 'Guidance ciblée'}
- **Urgence business**: ${data.monetization === 'Yes' ? 'Priorité business' : 'Focus créatif'}

## Tags pour recherche IA
#${data.experienceLevel?.toLowerCase() || 'débutant'} #${data.contentGoal?.toLowerCase().replace(/\s+/g, '-') || 'général'} #${data.niche?.toLowerCase().replace(/\s+/g, '-') || 'contenu'} #${challengesPriority[0]?.toLowerCase().replace(/\s+/g, '-') || 'formation'}

---
*Généré automatiquement le ${new Date().toLocaleDateString('fr-FR')} - Onboarding étape ${data.step}/21*
`;
  }
};
