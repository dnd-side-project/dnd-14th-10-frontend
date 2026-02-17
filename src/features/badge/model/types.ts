export interface Badge {
  id: string;
  label: string;
  requirement: number;
  isEarned: boolean;
  earnedIcon: string;
  lockedIcon: string;
}

export interface BadgeCategory {
  id: string;
  name: string;
  actionLabel: string;
  currentCount: number;
  badges: Badge[];
}
