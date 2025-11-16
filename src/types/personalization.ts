export type AgeGroup = 'child' | 'teen' | 'adult' | 'senior' | null;
export type ActivityLevel = 'sedentary' | 'moderate' | 'active' | null;
export type DietaryRestriction = 'none' | 'diabetic' | 'heart-healthy' | 'low-sodium' | 'gluten-free' | null;
export type HealthGoal = 'weight-loss' | 'muscle-gain' | 'maintenance' | 'heart-health' | null;

export interface PersonalizationProfile {
  age?: number;
  ageGroup?: AgeGroup;
  activityLevel?: ActivityLevel;
  dietaryRestrictions?: DietaryRestriction[];
  healthGoals?: HealthGoal[];
}

export interface PersonalizedSummary {
  label: string;
  labelColor: string;
  summary: string;
  recommendations?: string[];
}

