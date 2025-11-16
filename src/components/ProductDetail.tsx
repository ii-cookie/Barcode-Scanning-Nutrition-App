import { ArrowLeft, Plus, Check, Scan, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Product } from '../types/product';
import { PersonalizationProfile } from '../types/personalization';
import { NutrientLabel } from './NutrientLabel';
import { VisualComparison } from './VisualComparison';
import { PersonalizedSuitability } from './PersonalizedSuitability';
import { HealthierAlternatives } from './HealthierAlternatives';
import { getHealthierAlternatives } from '../data/products';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToComparison: (product: Product) => void;
  onScanAnother: () => void;
  isInComparison: boolean;
  comparisonCount: number;
  onViewComparison?: () => void;
  onOpenCart: () => void;
  personalizationProfile: PersonalizationProfile | null;
}

export function ProductDetail({ 
  product, 
  onBack, 
  onAddToComparison, 
  onScanAnother,
  isInComparison,
  comparisonCount,
  onViewComparison,
  onOpenCart,
  personalizationProfile
}: ProductDetailProps) {
  const alternatives = getHealthierAlternatives(product.id);
  
  const getScoreColor = (score: string) => {
    switch (score) {
      case 'healthy': return 'bg-green-500';
      case 'moderate': return 'bg-yellow-500';
      case 'unhealthy': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getScoreText = (score: string) => {
    switch (score) {
      case 'healthy': return 'Healthy Choice';
      case 'moderate': return 'Moderate';
      case 'unhealthy': return 'Less Healthy';
      default: return 'Unknown';
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3 shadow-sm flex items-center justify-between sticky top-0 z-10">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1>Product Details</h1>
        {comparisonCount > 0 && (
          <button onClick={onOpenCart} className="relative">
            <Badge variant="secondary" className="gap-1 cursor-pointer hover:bg-gray-200 transition-colors">
              <ShoppingCart className="w-3 h-3" />
              {comparisonCount}
            </Badge>
          </button>
        )}
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Product Header */}
        <div className="bg-white p-4 border-b">
          <div className="flex items-start gap-3 mb-3">
            {/* Product Image */}
            {product.imageUrl && (
              <img 
                src={product.imageUrl} 
                alt={product.name}
                className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
              />
            )}
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 pr-2">
                  <h2>{product.name}</h2>
                  <p className="text-gray-600">{product.brand}</p>
                  <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                </div>
                <div className={`${getScoreColor(product.overallScore)} text-white px-3 py-1 rounded-full text-sm flex-shrink-0`}>
                  {getScoreText(product.overallScore)}
                </div>
              </div>
            </div>
          </div>
          
          {product.marketingClaims && product.marketingClaims.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2 border-t">
              <p className="text-xs text-gray-500 w-full mb-1">Marketing Claims:</p>
              {product.marketingClaims.map((claim, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {claim}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Calories & Serving */}
        <div className="bg-white px-4 py-3 border-b">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Serving Size</p>
              <p>{product.servingSize}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Calories</p>
              <p className="text-2xl">{product.calories}</p>
            </div>
          </div>
        </div>

        {/* Key Nutrients */}
        <div className="p-4 space-y-3">
          <h3 className="text-sm text-gray-700">Key Nutrients</h3>
          
          <NutrientLabel 
            nutrient={product.nutrients.sugar}
            productCategory={product.category}
          />
          
          <NutrientLabel 
            nutrient={product.nutrients.sodium}
            productCategory={product.category}
          />
          
          <NutrientLabel 
            nutrient={product.nutrients.saturatedFat}
            productCategory={product.category}
          />

          {product.nutrients.protein && (
            <div className="pt-2 border-t">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Protein</span>
                <span>{product.nutrients.protein.amount}{product.nutrients.protein.unit}</span>
              </div>
            </div>
          )}

          {product.nutrients.fiber && (
            <div className="border-t pt-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Fiber</span>
                <span>{product.nutrients.fiber.amount}{product.nutrients.fiber.unit}</span>
              </div>
            </div>
          )}
        </div>

        {/* Visual Comparisons */}
        <div className="px-4 pb-4">
          <VisualComparison product={product} />
        </div>

        {/* Personalized Suitability */}
        <div className="px-4 pb-4">
          <PersonalizedSuitability 
            product={product}
            profile={personalizationProfile}
          />
        </div>

        {/* Healthier Alternatives */}
        {alternatives.length > 0 && (
          <div className="px-4 pb-4">
            <HealthierAlternatives 
              alternatives={alternatives}
              onAddToComparison={onAddToComparison}
            />
          </div>
        )}
      </div>

      {/* Bottom Actions - Fixed */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 space-y-2 shadow-lg">
        <div className="flex gap-2">
          <Button 
            onClick={() => onAddToComparison(product)}
            variant={isInComparison ? "secondary" : "outline"}
            className="flex-1"
            disabled={isInComparison || comparisonCount >= 3}
          >
            {isInComparison ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Added
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Compare
              </>
            )}
          </Button>
          
          <Button 
            onClick={onScanAnother}
            className="flex-1 bg-green-500 hover:bg-green-600"
          >
            <Scan className="w-4 h-4 mr-2" />
            Scan Another
          </Button>
        </div>
        
        {onViewComparison && (
          <Button 
            onClick={onViewComparison} 
            variant="outline"
            className="w-full"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            View Comparison ({comparisonCount})
          </Button>
        )}
      </div>
    </div>
  );
}