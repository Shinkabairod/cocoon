
export type ContentType = 'Videos' | 'Blogs' | 'Podcasts' | 'Social Media Posts';
export type Platform = 'YouTube' | 'Instagram' | 'TikTok' | 'Twitter' | 'LinkedIn' | 'Blog' | 'Podcast';
export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Experienced';
export type ContentGoal = 'Grow an audience' | 'Share knowledge' | 'Make money' | 'Build a brand' | 'Have fun';
export type ContentChallenge = 'Where to start' | 'Choosing equipment' | 'Script writing' | 'Filming' | 'Editing' | 'Promotion';
export type TimeAvailable = 'Less than 1 hour' | '1-3 hours' | '3-5 hours' | '5+ hours';
export type LearningStyle = 'Step-by-step guides' | 'Video tutorials' | 'Articles' | 'Interactive exercises' | 'Coaching personnalisé' | 'AI suggestions' | 'Writing prompts' | 'Examples analysis' | 'Community feedback';
export type Monetization = 'Yes' | 'No' | 'Not sure yet';
export type Niche = string;
export type Country = string;
export type BusinessType = 'Personal Brand' | 'Small Business' | 'Startup' | 'Established Company' | 'Educational Institution' | 'Non-Profit' | 'Other';
export type TargetGeneration = 'Gen Z' | 'Millennials' | 'Gen X' | 'Baby Boomers' | 'All Ages';
export type SocialMediaAccount = { platform: Platform; username: string };
export type ImpactGoal = 'Educate' | 'Entertain' | 'Inspire' | 'Inform' | 'Provoke thought' | 'Build community' | 'Sell products/services';
export type OnboardingStage = 'Initial Guidance' | 'Profile Setup' | 'Content Strategy' | 'Implementation Plan';
export type ContentCategory = string;
export type FilmingLocation = string;
export type ResourceType = 'PDF' | 'Video' | 'Book' | 'Course' | 'Template' | 'Tool' | 'Community';
export type ResourceTopic = 'Storytelling' | 'Camera Techniques' | 'Editing' | 'Scripting' | 'Business Strategy' | 'SEO' | 'Marketing' | 'Content Planning' | 'Analytics';

export interface Resource {
  id: string;
  type: ResourceType;
  topic: ResourceTopic;
  title: string;
  description: string;
  selected: boolean;
}

export interface OnboardingData {
  // Initial guidance
  hasContentDirection?: boolean;
  onboardingStage?: OnboardingStage;
  
  // Basic info
  experienceLevel?: ExperienceLevel;
  contentGoal?: ContentGoal;
  country?: Country;
  businessType?: BusinessType;
  businessDescription?: string;
  targetGeneration?: TargetGeneration;

  // Content details
  contentTypes?: ContentType[];
  platforms?: Platform[];
  niche?: Niche;
  contentCategories?: ContentCategory[];
  socialMediaAccounts?: SocialMediaAccount[];
  impactGoals?: ImpactGoal[];
  contentChallenge?: ContentChallenge;
  contentChallenges?: ContentChallenge[];
  
  // Resources & preferences
  timeAvailable?: TimeAvailable;
  learningStyle?: LearningStyle;
  learningStyles?: LearningStyle[];
  wantsFeedback?: boolean;
  equipmentOwned?: string[];
  monetization?: Monetization;
  personalGoal?: string;
  filmingLocation?: FilmingLocation;
  filmingLocationName?: string;
  customFilmingLocation?: string;
  
  // AI resources
  selectedResources?: Resource[];
  
  // Additional information
  existingSkills?: string;
  startFromScratch?: boolean;
  
  step: number;
}
