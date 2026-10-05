export type ActiveModal = 
  | null 
  | 'doctor-search' 
  | 'appointment' 
  | 'emergency' 
  | 'search' 
  | 'op-timings' 
  | 'patient-help' 
  | 'accessibility';

export type ActiveMegaMenu = 
  | null 
  | 'departments' 
  | 'doctors' 
  | 'patient-info' 
  | 'about' 
  | 'academics' 
  | 'quality' 
  | 'more';

export type Language = 'en' | 'ml';

export type TextSize = 'sm' | 'md' | 'lg';

export interface AccessibilitySettings {
  textSize: TextSize;
  highContrast: boolean;
  reduceMotion: boolean;
}

export interface SearchResultItem {
  id: string;
  title: string;
  category: 'Doctor' | 'Department' | 'Service' | 'Information' | 'Academic';
  subtitle?: string;
  url: string;
}
