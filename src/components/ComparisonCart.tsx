import { X, ShoppingCart, ArrowRight } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Product } from '../types/product';

interface ComparisonCartProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  products: Product[];
  onRemove: (productId: string) => void;
  onViewComparison?: () => void;
}

export function ComparisonCart({ 
  open, 
  onOpenChange, 
  products, 
  onRemove,
  onViewComparison 
}: ComparisonCartProps) {
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
      case 'healthy': return 'Healthy';
      case 'moderate': return 'Moderate';
      case 'unhealthy': return 'Less Healthy';
      default: return 'Unknown';
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="px-4 py-4 border-b">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Comparison Cart ({products.length}/3)
          </SheetTitle>
          <SheetDescription>
            {products.length === 0 
              ? 'Add products to compare their nutritional values' 
              : `Compare ${products.length} product${products.length !== 1 ? 's' : ''} side by side`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4">
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <ShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
              <p className="text-gray-500 mb-2">No products in comparison</p>
              <p className="text-sm text-gray-400">
                Add products from the scan results to compare them
              </p>
            </div>
          ) : (
            <div className="space-y-3">
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
                    <div className="flex items-start gap-3 mb-2">
                      <Badge variant="secondary" className="flex-shrink-0">
                        {index + 1}
                      </Badge>

                      {product.imageUrl && (
                        <img 
                          src={product.imageUrl} 
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                        />
                      )}

                      <div className="flex-1 min-w-0">
                        <p className="text-sm line-clamp-2">{product.name}</p>
                        <p className="text-xs text-gray-600">{product.brand}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex gap-2 text-xs">
                        <span className="text-gray-500">{product.calories} cal</span>
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-500">{product.nutrients.sugar.amount}g sugar</span>
                      </div>
                      <Badge className={`${getScoreColor(product.overallScore)} text-white border-0 text-xs`}>
                        {getScoreText(product.overallScore)}
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}

              {products.length < 3 && (
                <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                  <p className="text-sm text-gray-500">
                    Add {3 - products.length} more product{3 - products.length !== 1 ? 's' : ''} to compare
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {products.length >= 2 && onViewComparison && (
          <div className="border-t p-4 bg-white">
            <Button 
              onClick={() => {
                onViewComparison();
                onOpenChange(false);
              }}
              className="w-full bg-green-500 hover:bg-green-600"
              size="lg"
            >
              Compare {products.length} Products
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}