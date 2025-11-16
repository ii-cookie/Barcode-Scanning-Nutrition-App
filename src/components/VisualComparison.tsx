import { Dumbbell, Candy, Footprints, Bike, Waves, Zap } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Product } from '../types/product';
import { useState } from 'react';

interface VisualComparisonProps {
  product: Product;
}

type ExerciseType = {
  name: string;
  icon: typeof Footprints;
  calPerMin: number;
  color: string;
};

const exerciseTypes: ExerciseType[] = [
  { name: 'Walking', icon: Footprints, calPerMin: 5, color: 'bg-blue-50 text-blue-600' },
  { name: 'Running', icon: Zap, calPerMin: 10, color: 'bg-orange-50 text-orange-600' },
  { name: 'Cycling', icon: Bike, calPerMin: 8, color: 'bg-green-50 text-green-600' },
  { name: 'Swimming', icon: Waves, calPerMin: 9, color: 'bg-cyan-50 text-cyan-600' },
];

export function VisualComparison({ product }: VisualComparisonProps) {
  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState(0);
  
  const selectedExercise = exerciseTypes[selectedExerciseIndex];
  const ExerciseIcon = selectedExercise.icon;
  
  // Calculate sugar cubes (1 cube = ~4g sugar)
  const sugarCubes = Math.round(product.nutrients.sugar.amount / 4);
  
  // Calculate exercise minutes to burn calories
  const exerciseMinutes = Math.round(product.calories / selectedExercise.calPerMin);

  const handleExerciseChange = () => {
    setSelectedExerciseIndex((prev) => (prev + 1) % exerciseTypes.length);
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm text-gray-700">Visual Context</h3>
      
      {/* Sugar Cubes Visualization */}
      {sugarCubes > 0 && (
        <Card className="p-3">
          <div className="flex items-start gap-3">
            <div className="bg-blue-50 p-2 rounded-lg">
              <Candy className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm mb-2">Sugar Content</p>
              <div className="flex flex-wrap gap-1 mb-2">
                {Array.from({ length: Math.min(sugarCubes, 12) }).map((_, i) => (
                  <div 
                    key={i}
                    className="w-6 h-6 bg-white border-2 border-gray-300 rounded shadow-sm"
                    title="Sugar cube (~4g)"
                  />
                ))}
                {sugarCubes > 12 && (
                  <div className="w-6 h-6 flex items-center justify-center text-xs text-gray-600">
                    +{sugarCubes - 12}
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-600">
                {sugarCubes} sugar cube{sugarCubes !== 1 ? 's' : ''} ({product.nutrients.sugar.amount}g)
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Exercise Equivalent */}
      <Card className="p-3">
        <div className="flex items-start gap-3">
          <div className={`${selectedExercise.color.split(' ')[0]} p-2 rounded-lg cursor-pointer transition-colors`} onClick={handleExerciseChange}>
            <ExerciseIcon className={`w-5 h-5 ${selectedExercise.color.split(' ')[1]}`} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm">Exercise to Burn</p>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleExerciseChange}
                className="h-6 px-2 text-xs"
              >
                Change
              </Button>
            </div>
            <p className="text-2xl mb-1">{exerciseMinutes} min</p>
            <p className="text-xs text-gray-600">
              Of {selectedExercise.name.toLowerCase()} to burn {product.calories} calories
            </p>
            
            {/* Exercise Options */}
            <div className="flex gap-2 mt-3 pt-2 border-t">
              {exerciseTypes.map((exercise, index) => {
                const Icon = exercise.icon;
                const isSelected = index === selectedExerciseIndex;
                return (
                  <button
                    key={exercise.name}
                    onClick={() => setSelectedExerciseIndex(index)}
                    className={`flex-1 p-2 rounded-lg border-2 transition-all ${
                      isSelected 
                        ? `${exercise.color} border-current` 
                        : 'bg-gray-50 text-gray-400 border-gray-200 hover:border-gray-300'
                    }`}
                    title={exercise.name}
                  >
                    <Icon className={`w-4 h-4 mx-auto ${isSelected ? '' : 'opacity-50'}`} />
                    <p className="text-xs mt-1">{exercise.name}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </Card>

      {/* Saturated Fat Warning */}
      {product.nutrients.saturatedFat.level === 'high' && (
        <Card className="p-3 bg-orange-50 border-orange-200">
          <p className="text-xs text-orange-800">
            ⚠️ Contains {product.nutrients.saturatedFat.amount}g saturated fat — 
            {product.nutrients.saturatedFat.dailyValue}% of daily recommended amount, 
            potentially raising cholesterol levels
          </p>
        </Card>
      )}
    </div>
  );
}