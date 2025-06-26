
export interface Activity {
  text: string;
  icon: React.ReactNode;
  color: string;
  example: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  iconColor: string;
}

export interface Testimonial {
  name: string;
  activity: string;
  content: string;
  avatar: string;
  gradient: string;
  revenue: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
  popular: boolean;
}

export interface ScrollingButton {
  text: string;
  color: string;
}

export interface ScrollingButtonsData {
  row1: ScrollingButton[];
  row2: ScrollingButton[];
  row3: ScrollingButton[];
}

export interface AnimatedStats {
  bots: number;
  revenue: number;
  hours: number;
  experts: number;
}
