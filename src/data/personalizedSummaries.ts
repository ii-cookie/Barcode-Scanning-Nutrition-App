import { AgeGroup, PersonalizedSummary } from '../types/personalization';

// Personalized summaries by age group - reused for all products
const personalizedSummariesByAge: Record<AgeGroup, PersonalizedSummary> = {
  child: {
    label: 'For Children (2-12 years)',
    labelColor: '#3b82f6', // blue-500
    summary: 'This product contains high sugar content which may contribute to energy spikes and dental concerns for growing children. Consider limiting portion sizes and pairing with protein-rich foods to balance blood sugar levels.',
    recommendations: [
      'Limit to 1 serving per day',
      'Pair with protein (e.g., milk, nuts) to slow sugar absorption',
      'Encourage water intake after consumption',
      'Monitor total daily sugar intake from all sources'
    ]
  },
  teen: {
    label: 'For Teens (13-19 years)',
    labelColor: '#a855f7', // purple-500
    summary: 'While this product may fit into an active teen\'s diet, the high sugar and calorie content should be balanced with physical activity. Teens need adequate nutrition for growth, so consider this as an occasional treat rather than a daily staple.',
    recommendations: [
      'Best consumed before or after physical activity',
      'Balance with nutrient-dense meals throughout the day',
      'Stay hydrated, especially if active',
      'Consider portion control to manage daily calorie intake'
    ]
  },
  adult: {
    label: 'For Adults (20-64 years)',
    labelColor: '#22c55e', // green-500
    summary: 'This product can be part of a balanced diet when consumed in moderation. Pay attention to portion sizes and how it fits into your overall daily nutritional goals. Consider your activity level and health objectives when making consumption decisions.',
    recommendations: [
      'Monitor portion sizes to align with daily calorie goals',
      'Balance with whole foods rich in fiber and protein',
      'Consider timing - avoid late evening consumption',
      'Track how this fits into your weekly nutrition plan'
    ]
  },
  senior: {
    label: 'For Seniors (65+ years)',
    labelColor: '#f97316', // orange-500
    summary: 'For seniors, this product\'s nutritional profile should be evaluated in context of overall health conditions and dietary needs. High sugar content may affect blood sugar management, while sodium levels should be monitored for heart health.',
    recommendations: [
      'Consult with healthcare provider if managing chronic conditions',
      'Monitor sodium intake if on blood pressure medication',
      'Consider lower-sugar alternatives if managing diabetes',
      'Ensure adequate hydration, especially with high sodium content'
    ]
  },
  null: {
    label: '',
    labelColor: '',
    summary: '',
    recommendations: []
  }
};

export function getPersonalizedSummary(ageGroup: AgeGroup | null): PersonalizedSummary | null {
  if (!ageGroup || ageGroup === null) {
    return null;
  }
  return personalizedSummariesByAge[ageGroup] || null;
}

export function getAgeGroup(age: number | undefined): AgeGroup {
  if (!age) return null;
  if (age >= 2 && age <= 12) return 'child';
  if (age >= 13 && age <= 19) return 'teen';
  if (age >= 20 && age <= 64) return 'adult';
  if (age >= 65) return 'senior';
  return null;
}

