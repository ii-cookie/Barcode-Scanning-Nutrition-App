import { Sparkles, Plus, Check, RefreshCw } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { HealthierAlternative } from '../types/product';
import { useState } from 'react';

interface HealthierAlternativesProps {
  alternatives: HealthierAlternative[];
  onAddToComparison: (product: HealthierAlternative) => void;
}

export function HealthierAlternatives({ alternatives, onAddToComparison }: HealthierAlternativesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (alternatives.length === 0) return null;

  const currentAlternative = alternatives[currentIndex];
  const hasMultipleAlternatives = alternatives.length > 1;

  const handleRefresh = () => {
    setCurrentIndex((prev) => (prev + 1) % alternatives.length);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-green-600" />
          <h3 className="text-sm text-gray-700">Healthier Alternative</h3>
        </div>
        {hasMultipleAlternatives && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleRefresh}
            className="h-8 gap-1.5"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="text-xs">More options ({currentIndex + 1}/{alternatives.length})</span>
          </Button>
        )}
      </div>

      <Card className="p-3 border-green-200 bg-green-50">
        <div className="space-y-2">
          {/* Product Info */}
          <div className="flex items-start gap-3">
            {/* Product Image */}
            {currentAlternative.imageUrl && (
              <img 
                src={currentAlternative.imageUrl} 
                alt={currentAlternative.name}
                className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
              />
            )}
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1 pr-2">
                  <p className="font-medium">{currentAlternative.name}</p>
                  <p className="text-sm text-gray-600">{currentAlternative.brand}</p>
                </div>
                <Badge className="bg-green-500 text-white border-0 flex-shrink-0">
                  Healthier
                </Badge>
              </div>
            </div>
          </div>

          {/* Improvements */}
          <div className="space-y-1">
            {currentAlternative.improvements.map((improvement, index) => (
              <div key={index} className="flex items-center gap-2 text-xs text-green-800">
                <Check className="w-3 h-3" />
                <span>{improvement}</span>
              </div>
            ))}
          </div>

          {/* Calories Saved */}
          {currentAlternative.caloriesSaved && (
            <div className="pt-2 border-t border-green-200">
              <p className="text-xs text-green-800">
                💡 Save {currentAlternative.caloriesSaved} calories per serving
              </p>
            </div>
          )}

          {/* Nutritional Summary */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-green-200 text-xs">
            <div className="text-center">
              <p className="text-gray-500">Sugar</p>
              <p className="text-green-700">{currentAlternative.nutrients.sugar.amount}g</p>
            </div>
            <div className="text-center">
              <p className="text-gray-500">Sodium</p>
              <p className="text-green-700">{currentAlternative.nutrients.sodium.amount}mg</p>
            </div>
            <div className="text-center">
              <p className="text-gray-500">Sat. Fat</p>
              <p className="text-green-700">{currentAlternative.nutrients.saturatedFat.amount}g</p>
            </div>
          </div>

          {/* Add to Comparison */}
          <Button 
            onClick={() => onAddToComparison(currentAlternative)}
            variant="outline"
            size="sm"
            className="w-full border-green-300 hover:bg-green-100"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add to Comparison
          </Button>
        </div>
      </Card>
    </div>
  );
}