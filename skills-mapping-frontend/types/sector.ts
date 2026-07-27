export interface Sector {
  id: string;
  name: string;
  skillCount: number;
  workerCount: string;
  annualGrowth: string;
  tags: string[];
  featured?: boolean;
  icon: string; // emoji used as icon
  accentColor?: string;
}
