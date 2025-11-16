import { AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Nutrient } from '../types/product';

interface NutrientLabelProps {
  nutrient: Nutrient;
  productCategory: string;
}

export function NutrientLabel({ nutrient, productCategory }: NutrientLabelProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-500';
      case 'moderate': return 'bg-yellow-500';
      case 'high': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case 'low': return 'Low';
      case 'moderate': return 'Moderate';
      case 'high': return 'High';
      default: return 'Unknown';
    }
  };

  const getHealthMessage = () => {
    if (nutrient.name === 'Sugar' && nutrient.level === 'high') {
      return 'High sugar content may cause energy crashes and increase health risks';
    } else if (nutrient.name === 'Sodium' && nutrient.level === 'high') {
      return 'High sodium may increase blood pressure';
    } else if (nutrient.name === 'Saturated Fat' && nutrient.level === 'high') {
      return 'High saturated fat may raise cholesterol levels';
    }
    return null;
  };

  const healthMessage = getHealthMessage();
  const isAboveAverage = nutrient.categoryAverage && nutrient.amount > nutrient.categoryAverage;

  return (
    <Card className="p-3">
      <div className="space-y-2">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>{nutrient.name}</span>
            <Badge className={`${getLevelColor(nutrient.level)} text-white border-0`}>
              {getLevelText(nutrient.level)}
            </Badge>
          </div>
          <span>{nutrient.amount}{nutrient.unit}</span>
        </div>

        {/* Daily Value Progress */}
        {nutrient.dailyValue !== undefined && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-600">
              <span>Daily Value</span>
              <span>{nutrient.dailyValue}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all ${getLevelColor(nutrient.level)}`}
                style={{ width: `${Math.min(nutrient.dailyValue, 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Category Comparison */}
        {nutrient.categoryAverage && (
          <div className="flex items-center gap-2 text-xs pt-1">
            {isAboveAverage ? (
              <>
                <TrendingUp className="w-3 h-3 text-red-500" />
                <span className="text-gray-600">
                  {(nutrient.amount - nutrient.categoryAverage).toFixed(1)}{nutrient.unit} above 
                  {' '}{productCategory} average ({nutrient.categoryAverage}{nutrient.unit})
                </span>
              </>
            ) : (
              <>
                <TrendingDown className="w-3 h-3 text-green-500" />
                <span className="text-gray-600">
                  Below {productCategory} average ({nutrient.categoryAverage}{nutrient.unit})
                </span>
              </>
            )}
          </div>
        )}

        {/* Health Warning */}
        {healthMessage && (
          <div className="flex gap-2 pt-2 border-t">
            <AlertCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-gray-700">{healthMessage}</p>
          </div>
        )}
      </div>
    </Card>
  );
}