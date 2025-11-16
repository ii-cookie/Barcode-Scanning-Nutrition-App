export type NutrientLevel = 'low' | 'moderate' | 'high';

export interface Nutrient {
  name: string;
  amount: number;
  unit: string;
  level: NutrientLevel;
  dailyValue?: number;
  categoryAverage?: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  barcode: string;
  servingSize: string;
  calories: number;
  nutrients: {
    sugar: Nutrient;
    sodium: Nutrient;
    saturatedFat: Nutrient;
    protein?: Nutrient;
    fiber?: Nutrient;
  };
  overallScore: 'healthy' | 'moderate' | 'unhealthy';
  marketingClaims?: string[];
  imageUrl?: string;
}

export interface HealthierAlternative extends Product {
  improvements: string[];
  caloriesSaved?: number;
}
