import { Card } from './ui/card';
import { PersonalizationProfile, PersonalizedSummary } from '../types/personalization';
import { Product } from '../types/product';
import { getPersonalizedSummary, getAgeGroup } from '../data/personalizedSummaries';
import { User } from 'lucide-react';

interface PersonalizedSuitabilityProps {
  product: Product;
  profile: PersonalizationProfile | null;
}

export function PersonalizedSuitability({ product, profile }: PersonalizedSuitabilityProps) {
  if (!profile) {
    return null;
  }

  // Determine age group from age
  const ageGroup = profile.ageGroup || (profile.age ? getAgeGroup(profile.age) : null);
  
  if (!ageGroup) {
    return null;
  }

  const summary: PersonalizedSummary | null = getPersonalizedSummary(ageGroup);
  
  if (!summary) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <User className="w-5 h-5 text-gray-700" />
        <h3 className="text-sm text-gray-700">Personalized Suitability</h3>
      </div>
      
      <Card 
        className="p-4 border-0 shadow-sm"
        style={{ backgroundColor: summary.labelColor || 'transparent' }}
      >
        <div className="space-y-3">
          {/* Label */}
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-white drop-shadow-sm">
              {summary.label}
            </h4>
          </div>

          {/* Summary */}
          <p className="text-sm text-white drop-shadow-sm leading-relaxed">
            {summary.summary}
          </p>

          {/* Recommendations */}
          {summary.recommendations && summary.recommendations.length > 0 && (
            <div className="pt-2 border-t border-white/20 space-y-2">
              <p className="text-xs font-semibold text-white drop-shadow-sm">Recommendations:</p>
              <ul className="space-y-1.5">
                {summary.recommendations.map((rec, index) => (
                  <li key={index} className="text-xs text-white drop-shadow-sm flex items-start gap-2">
                    <span className="text-white/80 mt-0.5">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

