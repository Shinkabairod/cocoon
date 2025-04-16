
export type ContentType = 'Videos' | 'Blogs' | 'Podcasts' | 'Social Media Posts';
export type Platform = 'YouTube' | 'Instagram' | 'TikTok' | 'Twitter' | 'LinkedIn' | 'Blog' | 'Podcast';
export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Experienced';
export type ContentGoal = 'Grow an audience' | 'Share knowledge' | 'Make money' | 'Build a brand' | 'Have fun';
export type ContentChallenge = 'Where to start' | 'Choosing equipment' | 'Script writing' | 'Filming' | 'Editing' | 'Promotion';
export type TimeAvailable = 'Less than 1 hour' | '1-3 hours' | '3-5 hours' | '5+ hours';
export type LearningStyle = 'Step-by-step guides' | 'Video tutorials' | 'Articles' | 'Interactive exercises';
export type Monetization = 'Yes' | 'No' | 'Not sure yet';
export type Niche = string;

export interface OnboardingData {
  experienceLevel?: ExperienceLevel;
  contentGoal?: ContentGoal;
  contentTypes?: ContentType[];
  platforms?: Platform[];
  niche?: Niche;
  contentChallenge?: ContentChallenge;
  timeAvailable?: TimeAvailable;
  learningStyle?: LearningStyle;
  wantsFeedback?: boolean;
  equipmentOwned?: string[];
  monetization?: Monetization;
  personalGoal?: string;
  step: number;
}
