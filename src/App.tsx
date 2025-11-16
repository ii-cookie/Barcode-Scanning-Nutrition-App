import { useState } from 'react';
import { Scanner } from './components/Scanner';
import { ProductDetail } from './components/ProductDetail';
import { ComparisonView } from './components/ComparisonView';
import { ComparisonCart } from './components/ComparisonCart';
import { Product } from './types/product';
import { getRandomProduct } from './data/products';

export default function App() {
  const [view, setView] = useState<'scanner' | 'product' | 'comparison'>('scanner');
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [comparisonProducts, setComparisonProducts] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleScan = () => {
    const product = getRandomProduct();
    setCurrentProduct(product);
    setView('product');
  };

  const handleAddToComparison = (product: Product) => {
    if (comparisonProducts.length < 3 && !comparisonProducts.find(p => p.id === product.id)) {
      setComparisonProducts([...comparisonProducts, product]);
    }
  };

  const handleRemoveFromComparison = (productId: string) => {
    setComparisonProducts(comparisonProducts.filter(p => p.id !== productId));
  };

  const handleViewComparison = () => {
    setView('comparison');
  };

  const handleBackToScanner = () => {
    setView('scanner');
    setCurrentProduct(null);
  };

  const handleBackToProduct = () => {
    setView('product');
  };

  const handleScanAnother = () => {
    const product = getRandomProduct();
    setCurrentProduct(product);
    setView('product');
  };

  const handleOpenCart = () => {
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {view === 'scanner' && (
        <Scanner 
          onScan={handleScan}
          comparisonCount={comparisonProducts.length}
          onViewComparison={comparisonProducts.length > 1 ? handleViewComparison : undefined}
          onOpenCart={handleOpenCart}
        />
      )}
      
      {view === 'product' && currentProduct && (
        <ProductDetail 
          product={currentProduct}
          onBack={handleBackToScanner}
          onAddToComparison={handleAddToComparison}
          onScanAnother={handleScanAnother}
          isInComparison={comparisonProducts.some(p => p.id === currentProduct.id)}
          comparisonCount={comparisonProducts.length}
          onViewComparison={comparisonProducts.length > 1 ? handleViewComparison : undefined}
          onOpenCart={handleOpenCart}
        />
      )}
      
      {view === 'comparison' && (
        <ComparisonView 
          products={comparisonProducts}
          onBack={handleBackToProduct}
          onRemove={handleRemoveFromComparison}
          onScanAnother={handleScanAnother}
        />
      )}

      {/* Comparison Cart Drawer */}
      <ComparisonCart 
        open={isCartOpen}
        onOpenChange={setIsCartOpen}
        products={comparisonProducts}
        onRemove={handleRemoveFromComparison}
        onViewComparison={comparisonProducts.length > 1 ? handleViewComparison : undefined}
      />
    </div>
  );
}