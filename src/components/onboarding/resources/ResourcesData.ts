
import { Resource, ResourceTopic } from "@/types/onboarding";

export const generateRecommendedResources = (): Resource[] => {
  return [
    {
      id: "1",
      type: "PDF",
      topic: "Storytelling",
      title: "L'art du storytelling pour créateurs de contenu",
      description: "Apprenez à captiver votre audience avec des histoires mémorables et engageantes.",
      selected: false
    },
    {
      id: "2",
      type: "Video",
      topic: "Storytelling",
      title: "Structure narrative pour vidéos courtes",
      description: "Techniques de narration adaptées aux formats courts (TikTok, Instagram Reels).",
      selected: false
    },
    {
      id: "3",
      type: "Book",
      topic: "Storytelling",
      title: "Le héros aux mille visages",
      description: "Principes fondamentaux du voyage du héros et son application en création de contenu.",
      selected: false
    },
    {
      id: "4",
      type: "Course",
      topic: "Camera Techniques",
      title: "Maîtriser les fondamentaux de la vidéo avec smartphone",
      description: "Techniques professionnelles pour filmer avec un téléphone portable.",
      selected: false
    },
    {
      id: "5",
      type: "Template",
      topic: "Scripting",
      title: "Modèles de scripts pour différents formats vidéo",
      description: "Collection de templates pour vlogs, tutoriels, interviews et plus encore.",
      selected: false
    },
    {
      id: "6",
      type: "PDF",
      topic: "Editing",
      title: "Guide des techniques de montage vidéo essentielles",
      description: "Les principes fondamentaux du montage pour débutants et intermédiaires.",
      selected: false
    },
    {
      id: "7",
      type: "Tool",
      topic: "Content Planning",
      title: "Calendrier éditorial optimisé",
      description: "Planifiez votre contenu de manière stratégique avec ce template personnalisable.",
      selected: false
    },
    {
      id: "8",
      type: "Community",
      topic: "Business Strategy",
      title: "Communauté de créateurs de contenu francophones",
      description: "Rejoignez un groupe de créateurs pour échanger des conseils et obtenir du feedback.",
      selected: false
    },
    {
      id: "9",
      type: "PDF",
      topic: "SEO",
      title: "SEO pour créateurs de contenu vidéo",
      description: "Optimisez vos vidéos pour les moteurs de recherche et augmentez votre visibilité.",
      selected: false
    }
  ];
};

export const getResourceTopics = (): ResourceTopic[] => {
  return [
    "Storytelling",
    "Camera Techniques",
    "Editing",
    "Scripting",
    "Business Strategy",
    "SEO",
    "Marketing",
    "Content Planning",
    "Analytics"
  ];
};
