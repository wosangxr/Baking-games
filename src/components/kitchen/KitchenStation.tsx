import React from 'react';
import { useGame } from '../../context/GameContext';
import { RecipeSelector } from './RecipeSelector';
import { AddIngredientsStep } from './AddIngredientsStep';
import { WhiskMixStep } from './WhiskMixStep';
import { TrayStep } from './TrayStep';
import { OvenStep } from './OvenStep';
import { DecorateStep } from './DecorateStep';
import { FinishStep } from './FinishStep';

export const KitchenStation: React.FC = () => {
  const { bakingStep } = useGame();

  switch (bakingStep) {
    case 'select_recipe':
      return <RecipeSelector />;
    case 'add_ingredients':
      return <AddIngredientsStep />;
    case 'whisk_mix':
      return <WhiskMixStep />;
    case 'pour_tray':
      return <TrayStep />;
    case 'oven_bake':
      return <OvenStep />;
    case 'decorate':
      return <DecorateStep />;
    case 'done':
      return <FinishStep />;
    default:
      return <RecipeSelector />;
  }
};
