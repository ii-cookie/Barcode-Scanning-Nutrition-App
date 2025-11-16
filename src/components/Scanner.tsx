import { useState } from 'react';
import { Scan, ShoppingCart, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface ScannerProps {
  onScan: () => void;
  comparisonCount: number;
  onViewComparison?: () => void;
  onOpenCart: () => void;
}

export function Scanner({ onScan, comparisonCount, onViewComparison, onOpenCart }: ScannerProps) {
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    // Simulate scanning delay
    setTimeout(() => {
      setIsScanning(false);
      onScan();
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="bg-white border-b px-4 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-green-500 p-2 rounded-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg">NutriScan</h1>
              <p className="text-sm text-gray-500">Smart Food Choices</p>
            </div>
          </div>
          {comparisonCount > 0 && (
            <button onClick={onOpenCart} className="relative">
              <Badge variant="secondary" className="gap-1 cursor-pointer hover:bg-gray-200 transition-colors">
                <ShoppingCart className="w-3 h-3" />
                {comparisonCount}
              </Badge>
            </button>
          )}
        </div>
      </div>

      {/* Scanner Area */}
      <div className="flex-1 relative bg-gray-900 flex items-center justify-center">
        {/* Scanner Frame */}
        <div className="relative w-64 h-64">
          {/* Scanning Animation */}
          {isScanning && (
            <div className="absolute inset-0 border-2 border-green-500 rounded-lg">
              <div className="absolute top-0 left-0 right-0 h-1 bg-green-500 animate-pulse" 
                   style={{ animation: 'scan 1s linear infinite' }} />
            </div>
          )}
          
          {/* Scanner Frame Corners */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-lg" />
          
          {/* Center Icon */}
          {!isScanning && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Scan className="w-24 h-24 text-white opacity-50" />
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="absolute bottom-32 left-0 right-0 text-center px-4">
          <p className="text-white text-lg">
            {isScanning ? 'Scanning barcode...' : 'Position barcode in frame'}
          </p>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="bg-white border-t p-4 space-y-3">
        <Button 
          onClick={handleScan} 
          className="w-full bg-green-500 hover:bg-green-600"
          size="lg"
          disabled={isScanning}
        >
          <Scan className="w-5 h-5 mr-2" />
          {isScanning ? 'Scanning...' : 'Scan Barcode'}
        </Button>
        
        {onViewComparison && (
          <Button 
            onClick={onViewComparison} 
            variant="outline"
            className="w-full"
            size="lg"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Compare {comparisonCount} Products
          </Button>
        )}
        
        <div className="text-center pt-2">
          <p className="text-sm text-gray-500">
            Make smarter food choices with instant nutritional insights
          </p>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0; }
          50% { top: calc(100% - 4px); }
          100% { top: 0; }
        }
      `}</style>
    </div>
  );
}