import { Product, HealthierAlternative } from '../types/product';

const products: Product[] = [
  {
    id: '1',
    name: 'Sugar Blast Cereal',
    brand: 'Morning Crunch Co.',
    category: 'Breakfast Cereal',
    barcode: '123456789',
    servingSize: '1 cup (30g)',
    calories: 150,
    imageUrl: 'https://images.unsplash.com/photo-1610150158041-4ed238678840?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2Zhc3QlMjBjZXJlYWwlMjBib3dsfGVufDF8fHx8MTc2MzA3MDcyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    nutrients: {
      sugar: {
        name: 'Sugar',
        amount: 15,
        unit: 'g',
        level: 'high',
        dailyValue: 30,
        categoryAverage: 8
      },
      sodium: {
        name: 'Sodium',
        amount: 180,
        unit: 'mg',
        level: 'moderate',
        dailyValue: 8,
        categoryAverage: 150
      },
      saturatedFat: {
        name: 'Saturated Fat',
        amount: 1.5,
        unit: 'g',
        level: 'low',
        dailyValue: 8,
        categoryAverage: 1
      },
      protein: {
        name: 'Protein',
        amount: 2,
        unit: 'g',
        level: 'low'
      },
      fiber: {
        name: 'Fiber',
        amount: 1,
        unit: 'g',
        level: 'low'
      }
    },
    overallScore: 'unhealthy',
    marketingClaims: ['All Natural!', 'Vitamin Enriched', 'Whole Grain']
  },
  {
    id: '2',
    name: 'Oat Goodness',
    brand: 'Healthy Start',
    category: 'Breakfast Cereal',
    barcode: '987654321',
    servingSize: '1 cup (40g)',
    calories: 120,
    imageUrl: 'https://images.unsplash.com/photo-1610150158041-4ed238678840?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2Zhc3QlMjBjZXJlYWwlMjBib3dsfGVufDF8fHx8MTc2MzA3MDcyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    nutrients: {
      sugar: {
        name: 'Sugar',
        amount: 4,
        unit: 'g',
        level: 'low',
        dailyValue: 8,
        categoryAverage: 8
      },
      sodium: {
        name: 'Sodium',
        amount: 85,
        unit: 'mg',
        level: 'low',
        dailyValue: 4,
        categoryAverage: 150
      },
      saturatedFat: {
        name: 'Saturated Fat',
        amount: 0.5,
        unit: 'g',
        level: 'low',
        dailyValue: 3,
        categoryAverage: 1
      },
      protein: {
        name: 'Protein',
        amount: 5,
        unit: 'g',
        level: 'moderate'
      },
      fiber: {
        name: 'Fiber',
        amount: 4,
        unit: 'g',
        level: 'moderate'
      }
    },
    overallScore: 'healthy'
  },
  {
    id: '3',
    name: 'Cola Fizz',
    brand: 'Refresho',
    category: 'Soft Drinks',
    barcode: '456789123',
    servingSize: '12 fl oz (355ml)',
    calories: 150,
    imageUrl: 'https://images.unsplash.com/photo-1665359045452-bfa257a2a6bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2RhJTIwY2FuJTIwZHJpbmt8ZW58MXx8fHwxNzYzMDU1OTM1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    nutrients: {
      sugar: {
        name: 'Sugar',
        amount: 39,
        unit: 'g',
        level: 'high',
        dailyValue: 78,
        categoryAverage: 35
      },
      sodium: {
        name: 'Sodium',
        amount: 45,
        unit: 'mg',
        level: 'low',
        dailyValue: 2,
        categoryAverage: 40
      },
      saturatedFat: {
        name: 'Saturated Fat',
        amount: 0,
        unit: 'g',
        level: 'low',
        dailyValue: 0,
        categoryAverage: 0
      }
    },
    overallScore: 'unhealthy',
    marketingClaims: ['Classic Taste', 'Ice Cold Refreshment']
  },
  {
    id: '4',
    name: 'Sparkling Water Zero',
    brand: 'Pure Bubble',
    category: 'Soft Drinks',
    barcode: '321654987',
    servingSize: '12 fl oz (355ml)',
    calories: 0,
    imageUrl: 'https://images.unsplash.com/photo-1629743113097-92b25b6f43be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFya2xpbmclMjB3YXRlciUyMGJvdHRsZXxlbnwxfHx8fDE3NjMwNDc5OTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    nutrients: {
      sugar: {
        name: 'Sugar',
        amount: 0,
        unit: 'g',
        level: 'low',
        dailyValue: 0,
        categoryAverage: 35
      },
      sodium: {
        name: 'Sodium',
        amount: 25,
        unit: 'mg',
        level: 'low',
        dailyValue: 1,
        categoryAverage: 40
      },
      saturatedFat: {
        name: 'Saturated Fat',
        amount: 0,
        unit: 'g',
        level: 'low',
        dailyValue: 0,
        categoryAverage: 0
      }
    },
    overallScore: 'healthy'
  },
  {
    id: '5',
    name: 'Crispy Potato Chips',
    brand: 'Snack Master',
    category: 'Chips & Snacks',
    barcode: '789123456',
    servingSize: '1 oz (28g)',
    calories: 160,
    imageUrl: 'https://images.unsplash.com/photo-1613919113640-25732ec5e61f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3RhdG8lMjBjaGlwcyUyMHNuYWNrfGVufDF8fHx8MTc2MzEzNDc3OXww&ixlib=rb-4.1.0&q=80&w=1080',
    nutrients: {
      sugar: {
        name: 'Sugar',
        amount: 1,
        unit: 'g',
        level: 'low',
        dailyValue: 2,
        categoryAverage: 1.5
      },
      sodium: {
        name: 'Sodium',
        amount: 170,
        unit: 'mg',
        level: 'moderate',
        dailyValue: 7,
        categoryAverage: 140
      },
      saturatedFat: {
        name: 'Saturated Fat',
        amount: 1.5,
        unit: 'g',
        level: 'moderate',
        dailyValue: 8,
        categoryAverage: 1
      }
    },
    overallScore: 'moderate',
    marketingClaims: ['All Natural', 'No Artificial Flavors']
  },
  {
    id: '6',
    name: 'Sweet Vanilla Yogurt',
    brand: 'Dairy Delight',
    category: 'Yogurt',
    barcode: '147258369',
    servingSize: '6 oz (170g)',
    calories: 180,
    imageUrl: 'https://images.unsplash.com/photo-1578857469534-0a3f1c3b1752?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2d1cnQlMjBjdXB8ZW58MXx8fHwxNzYzMDk4NDUzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    nutrients: {
      sugar: {
        name: 'Sugar',
        amount: 20,
        unit: 'g',
        level: 'high',
        dailyValue: 40,
        categoryAverage: 12
      },
      sodium: {
        name: 'Sodium',
        amount: 110,
        unit: 'mg',
        level: 'moderate',
        dailyValue: 5,
        categoryAverage: 90
      },
      saturatedFat: {
        name: 'Saturated Fat',
        amount: 3,
        unit: 'g',
        level: 'moderate',
        dailyValue: 15,
        categoryAverage: 2
      },
      protein: {
        name: 'Protein',
        amount: 6,
        unit: 'g',
        level: 'moderate'
      }
    },
    overallScore: 'moderate',
    marketingClaims: ['Probiotic Power!', 'Calcium Rich', 'Creamy & Delicious']
  },
  {
    id: '7',
    name: 'Greek Protein Yogurt',
    brand: 'Fit Life',
    category: 'Yogurt',
    barcode: '963852741',
    servingSize: '6 oz (170g)',
    calories: 100,
    imageUrl: 'https://images.unsplash.com/photo-1578857469534-0a3f1c3b1752?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2d1cnQlMjBjdXB8ZW58MXx8fHwxNzYzMDk4NDUzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    nutrients: {
      sugar: {
        name: 'Sugar',
        amount: 8,
        unit: 'g',
        level: 'low',
        dailyValue: 16,
        categoryAverage: 12
      },
      sodium: {
        name: 'Sodium',
        amount: 65,
        unit: 'mg',
        level: 'low',
        dailyValue: 3,
        categoryAverage: 90
      },
      saturatedFat: {
        name: 'Saturated Fat',
        amount: 0.5,
        unit: 'g',
        level: 'low',
        dailyValue: 3,
        categoryAverage: 2
      },
      protein: {
        name: 'Protein',
        amount: 15,
        unit: 'g',
        level: 'high'
      }
    },
    overallScore: 'healthy'
  },
  {
    id: '8',
    name: 'Chocolate Chip Granola Bar',
    brand: 'Energy Boost',
    category: 'Granola Bars',
    barcode: '852963741',
    servingSize: '1 bar (40g)',
    calories: 190,
    imageUrl: 'https://images.unsplash.com/photo-1633360821154-1935fb5671e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFub2xhJTIwYmFyfGVufDF8fHx8MTc2MzEzNzQxNXww&ixlib=rb-4.1.0&q=80&w=1080',
    nutrients: {
      sugar: {
        name: 'Sugar',
        amount: 12,
        unit: 'g',
        level: 'high',
        dailyValue: 24,
        categoryAverage: 8
      },
      sodium: {
        name: 'Sodium',
        amount: 115,
        unit: 'mg',
        level: 'moderate',
        dailyValue: 5,
        categoryAverage: 100
      },
      saturatedFat: {
        name: 'Saturated Fat',
        amount: 4,
        unit: 'g',
        level: 'high',
        dailyValue: 20,
        categoryAverage: 2
      },
      protein: {
        name: 'Protein',
        amount: 3,
        unit: 'g',
        level: 'low'
      },
      fiber: {
        name: 'Fiber',
        amount: 2,
        unit: 'g',
        level: 'low'
      }
    },
    overallScore: 'unhealthy',
    marketingClaims: ['Whole Grain Oats', 'Energy Packed', 'Natural Ingredients']
  }
];

const healthierAlternatives: Record<string, HealthierAlternative[]> = {
  '1': [
    {
      ...products[1],
      improvements: ['11g less sugar', '95mg less sodium', '3g more protein', '3g more fiber'],
      caloriesSaved: 30
    }
  ],
  '3': [
    {
      ...products[3],
      improvements: ['39g less sugar', '40% less sodium'],
      caloriesSaved: 150
    }
  ],
  '5': [
    {
      id: '10',
      name: 'Baked Veggie Crisps',
      brand: 'Healthy Crunch',
      category: 'Chips & Snacks',
      barcode: '159753486',
      servingSize: '1 oz (28g)',
      calories: 120,
      imageUrl: 'https://images.unsplash.com/photo-1613919113640-25732ec5e61f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3RhdG8lMjBjaGlwcyUyMHNuYWNrfGVufDF8fHx8MTc2MzEzNDc3OXww&ixlib=rb-4.1.0&q=80&w=1080',
      nutrients: {
        sugar: {
          name: 'Sugar',
          amount: 2,
          unit: 'g',
          level: 'low',
          dailyValue: 4,
          categoryAverage: 1.5
        },
        sodium: {
          name: 'Sodium',
          amount: 85,
          unit: 'mg',
          level: 'low',
          dailyValue: 4,
          categoryAverage: 140
        },
        saturatedFat: {
          name: 'Saturated Fat',
          amount: 0.5,
          unit: 'g',
          level: 'low',
          dailyValue: 3,
          categoryAverage: 1
        },
        protein: {
          name: 'Protein',
          amount: 3,
          unit: 'g',
          level: 'low'
        },
        fiber: {
          name: 'Fiber',
          amount: 3,
          unit: 'g',
          level: 'moderate'
        }
      },
      overallScore: 'healthy',
      improvements: ['85mg less sodium', '1g less saturated fat', 'Baked instead of fried'],
      caloriesSaved: 40
    },
    {
      id: '11',
      name: 'Air-Popped Popcorn',
      brand: 'Light Bites',
      category: 'Chips & Snacks',
      barcode: '753951486',
      servingSize: '1 oz (28g)',
      calories: 100,
      imageUrl: 'https://images.unsplash.com/photo-1613919113640-25732ec5e61f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3RhdG8lMjBjaGlwcyUyMHNuYWNrfGVufDF8fHx8MTc2MzEzNDc3OXww&ixlib=rb-4.1.0&q=80&w=1080',
      nutrients: {
        sugar: {
          name: 'Sugar',
          amount: 0,
          unit: 'g',
          level: 'low',
          dailyValue: 0,
          categoryAverage: 1.5
        },
        sodium: {
          name: 'Sodium',
          amount: 55,
          unit: 'mg',
          level: 'low',
          dailyValue: 2,
          categoryAverage: 140
        },
        saturatedFat: {
          name: 'Saturated Fat',
          amount: 0.2,
          unit: 'g',
          level: 'low',
          dailyValue: 1,
          categoryAverage: 1
        },
        protein: {
          name: 'Protein',
          amount: 3,
          unit: 'g',
          level: 'low'
        },
        fiber: {
          name: 'Fiber',
          amount: 4,
          unit: 'g',
          level: 'moderate'
        }
      },
      overallScore: 'healthy',
      improvements: ['115mg less sodium', '1.3g less saturated fat', 'High fiber', '1g more fiber'],
      caloriesSaved: 60
    }
  ],
  '6': [
    {
      ...products[6],
      improvements: ['12g less sugar', '45mg less sodium', '9g more protein'],
      caloriesSaved: 80
    }
  ],
  '8': [
    {
      id: '9',
      name: 'Nut & Seed Bar',
      brand: 'Raw Energy',
      category: 'Granola Bars',
      barcode: '741852963',
      servingSize: '1 bar (40g)',
      calories: 150,
      imageUrl: 'https://images.unsplash.com/photo-1633360821154-1935fb5671e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFub2xhJTIwYmFyfGVufDF8fHx8MTc2MzEzNzQxNXww&ixlib=rb-4.1.0&q=80&w=1080',
      nutrients: {
        sugar: {
          name: 'Sugar',
          amount: 5,
          unit: 'g',
          level: 'low',
          dailyValue: 10,
          categoryAverage: 8
        },
        sodium: {
          name: 'Sodium',
          amount: 45,
          unit: 'mg',
          level: 'low',
          dailyValue: 2,
          categoryAverage: 100
        },
        saturatedFat: {
          name: 'Saturated Fat',
          amount: 1,
          unit: 'g',
          level: 'low',
          dailyValue: 5,
          categoryAverage: 2
        },
        protein: {
          name: 'Protein',
          amount: 6,
          unit: 'g',
          level: 'moderate'
        },
        fiber: {
          name: 'Fiber',
          amount: 4,
          unit: 'g',
          level: 'moderate'
        }
      },
      overallScore: 'healthy',
      improvements: ['7g less sugar', '70mg less sodium', '3g less saturated fat', '3g more protein', '2g more fiber'],
      caloriesSaved: 40
    },
    {
      id: '12',
      name: 'Protein Energy Bar',
      brand: 'Athlete Fuel',
      category: 'Granola Bars',
      barcode: '369258147',
      servingSize: '1 bar (40g)',
      calories: 160,
      imageUrl: 'https://images.unsplash.com/photo-1633360821154-1935fb5671e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFub2xhJTIwYmFyfGVufDF8fHx8MTc2MzEzNzQxNXww&ixlib=rb-4.1.0&q=80&w=1080',
      nutrients: {
        sugar: {
          name: 'Sugar',
          amount: 6,
          unit: 'g',
          level: 'low',
          dailyValue: 12,
          categoryAverage: 8
        },
        sodium: {
          name: 'Sodium',
          amount: 60,
          unit: 'mg',
          level: 'low',
          dailyValue: 3,
          categoryAverage: 100
        },
        saturatedFat: {
          name: 'Saturated Fat',
          amount: 1.5,
          unit: 'g',
          level: 'low',
          dailyValue: 8,
          categoryAverage: 2
        },
        protein: {
          name: 'Protein',
          amount: 10,
          unit: 'g',
          level: 'high'
        },
        fiber: {
          name: 'Fiber',
          amount: 3,
          unit: 'g',
          level: 'moderate'
        }
      },
      overallScore: 'healthy',
      improvements: ['6g less sugar', '55mg less sodium', '2.5g less saturated fat', '7g more protein', '1g more fiber'],
      caloriesSaved: 30
    }
  ]
};

export function getRandomProduct(): Product {
  return products[Math.floor(Math.random() * products.length)];
}

export function getHealthierAlternatives(productId: string): HealthierAlternative[] {
  return healthierAlternatives[productId] || [];
}

export function getAllProducts(): Product[] {
  return products;
}