export type ActivityType = 'REVIEW' | 'PLACE' | 'IMAGE';

export interface BadgeProgress {
  code: string;
  name: string;
  threshold: number;
  achieved: boolean;
  achievedAt: string | null;
}

export interface CategoryProgress {
  activityType: ActivityType;
  currentCount: number;
  badges: BadgeProgress[];
}

export interface BadgeProgressResponse {
  categories: CategoryProgress[];
}
