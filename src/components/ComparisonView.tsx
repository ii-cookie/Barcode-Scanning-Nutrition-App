import { ArrowLeft, X, Scan, Candy, Dumbbell, Footprints, Bike, Waves, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Product } from '../types/product';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

interface ComparisonViewProps {
  products: Product[];
  onBack: () => void;
  onRemove: (productId: string) => void;
  onScanAnother: () => void;
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

export function ComparisonView({ products, onBack, onRemove, onScanAnother }: ComparisonViewProps) {
  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState(0);
  
  const selectedExercise = exerciseTypes[selectedExerciseIndex];
  const ExerciseIcon = selectedExercise.icon;
  
  // Prepare data for chart
  const chartData = [
    {
      name: 'Sugar (g)',
      ...products.reduce((acc, product, index) => ({
        ...acc,
        [`Product ${index + 1}`]: product.nutrients.sugar.amount
      }), {})
    },
    {
      name: 'Sodium (mg)',
      ...products.reduce((acc, product, index) => ({
        ...acc,
        [`Product ${index + 1}`]: product.nutrients.sodium.amount
      }), {})
    },
    {
      name: 'Sat. Fat (g)',
      ...products.reduce((acc, product, index) => ({
        ...acc,
        [`Product ${index + 1}`]: product.nutrients.saturatedFat.amount
      }), {})
    },
    {
      name: 'Calories',
      ...products.reduce((acc, product, index) => ({
        ...acc,
        [`Product ${index + 1}`]: product.calories
      }), {})
    }
  ];

  const colors = ['#3b82f6', '#10b981', '#f59e0b'];

  const getScoreColor = (score: string) => {
    switch (score) {
      case 'healthy': return 'bg-green-500';
      case 'moderate': return 'bg-yellow-500';
      case 'unhealthy': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3 shadow-sm flex items-center justify-between sticky top-0 z-10">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1>Compare Products</h1>
        <div className="w-10" />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {/* Product Cards */}
        <div className="p-4 space-y-3">
          {products.map((product, index) => (
            <Card key={product.id} className="p-3 relative">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 h-6 w-6 p-0"
                onClick={() => onRemove(product.id)}
              >
                <X className="w-4 h-4" />
              </Button>
              
              <div className="pr-8">
                <div className="flex items-center gap-3 mb-2">
                  <Badge className={`${colors[index] ? `bg-[${colors[index]}]` : 'bg-gray-500'} text-white border-0`}>
                    {index + 1}
                  </Badge>
                  
                  {/* Product Image */}
                  {product.imageUrl && (
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                    />
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <p>{product.name}</p>
                    <p className="text-sm text-gray-600">{product.brand}</p>
                  </div>
                  <div className={`${getScoreColor(product.overallScore)} text-white px-2 py-1 rounded text-xs flex-shrink-0`}>
                    {product.overallScore === 'healthy' ? '✓' : product.overallScore === 'unhealthy' ? '✗' : '~'}
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-2 text-xs pt-2 border-t">
                  <div className="text-center">
                    <p className="text-gray-500">Cal</p>
                    <p>{product.calories}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-500">Sugar</p>
                    <p>{product.nutrients.sugar.amount}g</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-500">Sodium</p>
                    <p>{product.nutrients.sodium.amount}mg</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-500">Sat.Fat</p>
                    <p>{product.nutrients.saturatedFat.amount}g</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Chart Comparison */}
        <div className="px-4 pb-4">
          <Card className="p-4">
            <h3 className="text-sm mb-3">Nutrient Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                {products.map((_, index) => (
                  <Bar 
                    key={index}
                    dataKey={`Product ${index + 1}`} 
                    fill={colors[index]} 
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Visual Comparisons */}
        <div className="px-4 pb-4 space-y-3">
          {/* Sugar Cubes Comparison */}
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Candy className="w-5 h-5 text-blue-600" />
              <h3 className="text-sm">Sugar Content Comparison</h3>
            </div>
            
            <div className="space-y-3">
              {products.map((product, index) => {
                const sugarCubes = Math.round(product.nutrients.sugar.amount / 4);
                return (
                  <div key={product.id} className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge className={`bg-[${colors[index]}] text-white border-0 w-6 h-6 flex items-center justify-center p-0`}>
                        {index + 1}
                      </Badge>
                      <p className="text-sm flex-1">{product.name}</p>
                      <p className="text-xs text-gray-600">{sugarCubes} cubes</p>
                    </div>
                    <div className="flex flex-wrap gap-1 ml-8">
                      {Array.from({ length: Math.min(sugarCubes, 12) }).map((_, i) => (
                        <div 
                          key={i}
                          className="w-5 h-5 bg-white border-2 border-gray-300 rounded shadow-sm"
                        />
                      ))}
                      {sugarCubes > 12 && (
                        <div className="w-5 h-5 flex items-center justify-center text-xs text-gray-600">
                          +{sugarCubes - 12}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Exercise Comparison */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <ExerciseIcon className={`w-5 h-5 ${selectedExercise.color.split(' ')[1]}`} />
                <h3 className="text-sm">Exercise to Burn ({selectedExercise.name})</h3>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setSelectedExerciseIndex((prev) => (prev + 1) % exerciseTypes.length)}
                className="h-6 px-2 text-xs"
              >
                Change
              </Button>
            </div>
            
            {/* Exercise Options Selector */}
            <div className="flex gap-2 mb-4 pb-3 border-b">
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
            
            <div className="space-y-2">
              {products.map((product, index) => {
                const exerciseMinutes = Math.round(product.calories / selectedExercise.calPerMin);
                return (
                  <div key={product.id} className="flex items-center gap-2">
                    <Badge className={`bg-[${colors[index]}] text-white border-0 w-6 h-6 flex items-center justify-center p-0`}>
                      {index + 1}
                    </Badge>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <p className="text-sm">{product.name}</p>
                        <p className="text-sm">{exerciseMinutes} min</p>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full mt-1">
                        <div 
                          className="h-full rounded-full"
                          style={{ 
                            width: `${Math.min((exerciseMinutes / Math.max(...products.map(p => Math.round(p.calories / selectedExercise.calPerMin)))) * 100, 100)}%`,
                            backgroundColor: colors[index]
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Winner Card */}
          {products.length > 1 && (() => {
            const healthiestProduct = products.reduce((best, current) => {
              const currentScore = current.nutrients.sugar.amount + 
                (current.nutrients.sodium.amount / 10) + 
                (current.nutrients.saturatedFat.amount * 2);
              const bestScore = best.nutrients.sugar.amount + 
                (best.nutrients.sodium.amount / 10) + 
                (best.nutrients.saturatedFat.amount * 2);
              return currentScore < bestScore ? current : best;
            });
            
            const healthiestIndex = products.findIndex(p => p.id === healthiestProduct.id);
            
            return (
              <Card className="p-4 bg-green-50 border-green-200">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🏆</div>
                  <div className="flex-1">
                    <h3 className="text-sm mb-1">Healthiest Choice</h3>
                    <p>{healthiestProduct.name}</p>
                    <p className="text-sm text-green-700 mt-1">
                      Best overall nutritional profile among compared products
                    </p>
                  </div>
                  <Badge className={`bg-[${colors[healthiestIndex]}] text-white border-0`}>
                    {healthiestIndex + 1}
                  </Badge>
                </div>
              </Card>
            );
          })()}
        </div>
      </div>

      {/* Bottom Actions - Fixed */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <Button 
          onClick={onScanAnother}
          className="w-full bg-green-500 hover:bg-green-600"
          size="lg"
        >
          <Scan className="w-5 h-5 mr-2" />
          Scan Another Product
        </Button>
      </div>
    </div>
  );
}