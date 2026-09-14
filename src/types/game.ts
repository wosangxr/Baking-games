export type IngredientType = 
  | 'flour' 
  | 'sugar' 
  | 'egg' 
  | 'butter' 
  | 'milk' 
  | 'chocolate' 
  | 'strawberry' 
  | 'matcha' 
  | 'cinnamon';

export interface Ingredient {
  id: IngredientType;
  name: string;
  nameTh: string;
  icon: string;
  color: string;
  unit: string;
}

export type RecipeCategory = 'bread' | 'cake' | 'cookie' | 'pastry';

export interface Recipe {
  id: string;
  name: string;
  nameTh: string;
  category: RecipeCategory;
  description: string;
  descriptionTh: string;
  icon: string;
  sellPrice: number;
  expReward: number;
  unlockLevel: number;
  bakeTimeSeconds: number; // e.g. 5-7 seconds (chilled, not long)
  requiredIngredients: {
    type: IngredientType;
    amount: number;
  }[];
  toppings: {
    id: string;
    nameTh: string;
    icon: string;
    color: string;
  }[];
}

export type GameStation = 'kitchen' | 'shop' | 'recipes' | 'decorations';

export type BakingStep = 
  | 'select_recipe'
  | 'add_ingredients'
  | 'whisk_mix'
  | 'pour_tray'
  | 'oven_bake'
  | 'decorate'
  | 'done';

export interface BakedPastry {
  id: string;
  recipeId: string;
  recipeName: string;
  recipeNameTh: string;
  icon: string;
  quality: number; // 1 to 5 stars
  toppings: string[];
  bakedAt: number;
  price: number;
}

export interface CustomerOrder {
  id: string;
  customerName: string;
  avatar: string;
  dialogue: string;
  requestedRecipeId: string;
  quantity: number;
  patience: number; // infinite chill vibe, but visual mood
  createdAt: number;
}

export interface BakeryUpgrade {
  id: string;
  nameTh: string;
  descriptionTh: string;
  category: 'oven' | 'decor' | 'music' | 'pet';
  cost: number;
  unlocked: boolean;
  icon: string;
  effectTh: string;
}
