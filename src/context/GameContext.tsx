import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { 
  GameStation, 
  Recipe, 
  BakingStep, 
  BakedPastry, 
  CustomerOrder, 
  IngredientType, 
  BakeryUpgrade 
} from '../types/game';
import { RECIPES } from '../data/recipes';
import { BAKERY_UPGRADES } from '../data/upgrades';
import { sound } from '../audio/soundManager';
import confetti from 'canvas-confetti';

interface Toast {
  id: string;
  message: string;
  icon?: string;
}

interface GameContextType {
  // Economy & Progression
  coins: number;
  level: number;
  exp: number;
  expNeeded: number;
  unlockedRecipeIds: string[];
  upgrades: BakeryUpgrade[];
  
  // Navigation
  activeStation: GameStation;
  setActiveStation: (station: GameStation) => void;

  // Showcase & Customers
  showcase: BakedPastry[];
  orders: CustomerOrder[];
  serveCustomer: (orderId: string, pastryId: string) => void;
  buyUpgrade: (upgradeId: string) => void;

  // Kitchen State
  currentRecipe: Recipe | null;
  bakingStep: BakingStep;
  bowlIngredients: Record<IngredientType, number>;
  mixProgress: number;
  bakeProgress: number;
  selectedToppings: string[];
  
  // Kitchen Actions
  startBakingRecipe: (recipe: Recipe) => void;
  addIngredientToBowl: (type: IngredientType) => void;
  removeIngredientFromBowl: (type: IngredientType) => void;
  goToMixingStep: () => void;
  stirBowl: (delta: number) => void;
  placeOnTray: () => void;
  startOvenBaking: () => void;
  addTopping: (toppingId: string) => void;
  finishAndShowcase: () => void;
  cancelBaking: () => void;

  // Audio & UI
  isMuted: boolean;
  toggleMute: () => void;
  isMusicPlaying: boolean;
  toggleMusic: () => void;
  toasts: Toast[];
  addToast: (message: string, icon?: string) => void;
}

const STORAGE_KEY = 'cozy_bakery_save_v1';

const CUSTOMER_NAMES = [
  { name: 'น้องมะลิ', avatar: '👧🏻', dialogue: 'อยากได้ขนมไปทานคู่กับชาร้อนๆ จังเลยค่ะ~' },
  { name: 'คุณตาใจดี', avatar: '👴🏼', dialogue: 'กลิ่นหอมลอยไปถึงหน้าบ้าน อดใจแวะมาไม่ได้เลย' },
  { name: 'พี่กานต์', avatar: '🧑🏽‍💻', dialogue: 'ขอเติมพลังระหว่างทำงานหน่อยครับ' },
  { name: 'น้องพีช', avatar: '🌸', dialogue: 'ขนมน่ารักจนอยากถ่ายรูปเก็บไว้เลยค่ะ' },
  { name: 'คุณแม่นิด', avatar: '👩🏻‍🦰', dialogue: 'ซื้อไปฝากเด็กๆ ที่บ้านจ้า ขนมร้านนี้อร่อยที่สุด' },
  { name: 'เชฟโทนี่', avatar: '👨🏼‍🍳', dialogue: 'ขนมอบร้านนี้ลายสวยและกลิ่นเนยหอมมาก!' },
];

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load initial state or fallback
  const loadSavedData = () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) return JSON.parse(data);
    } catch {
      // Ignore parse error
    }
    return null;
  };

  const saved = loadSavedData();

  const [coins, setCoins] = useState<number>(saved?.coins ?? 100);
  const [level, setLevel] = useState<number>(saved?.level ?? 1);
  const [exp, setExp] = useState<number>(saved?.exp ?? 0);
  const [unlockedRecipeIds, setUnlockedRecipeIds] = useState<string[]>(
    saved?.unlockedRecipeIds ?? ['croissant', 'cookie']
  );
  const [upgrades, setUpgrades] = useState<BakeryUpgrade[]>(() => {
    if (saved?.upgrades) {
      return BAKERY_UPGRADES.map(u => ({
        ...u,
        unlocked: saved.upgrades.includes(u.id),
      }));
    }
    return BAKERY_UPGRADES;
  });

  const [activeStation, setActiveStationState] = useState<GameStation>('kitchen');
  const [showcase, setShowcase] = useState<BakedPastry[]>(saved?.showcase ?? []);
  const [orders, setOrders] = useState<CustomerOrder[]>([]);

  // Kitchen State
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);
  const [bakingStep, setBakingStep] = useState<BakingStep>('select_recipe');
  const [bowlIngredients, setBowlIngredients] = useState<Record<IngredientType, number>>({
    flour: 0,
    sugar: 0,
    egg: 0,
    butter: 0,
    milk: 0,
    chocolate: 0,
    strawberry: 0,
    matcha: 0,
    cinnamon: 0,
  });
  const [mixProgress, setMixProgress] = useState<number>(0);
  const [bakeProgress, setBakeProgress] = useState<number>(0);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);

  // Sound and notifications
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const expNeeded = level * 100;

  // Auto-save to localStorage
  useEffect(() => {
    const dataToSave = {
      coins,
      level,
      exp,
      unlockedRecipeIds,
      upgrades: upgrades.filter(u => u.unlocked).map(u => u.id),
      showcase,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch {
      // Ignore quota error
    }
  }, [coins, level, exp, unlockedRecipeIds, upgrades, showcase]);

  const addToast = (message: string, icon: string = '✨') => {
    const id = Date.now().toString() + Math.random();
    setToasts(prev => [...prev.slice(-3), { id, message, icon }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const setActiveStation = (station: GameStation) => {
    sound.playPop(1.1);
    setActiveStationState(station);
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sound.setMuted(nextMuted);
    if (!nextMuted) sound.playPop(1.2);
  };

  const toggleMusic = () => {
    const playing = sound.toggleMusic();
    setIsMusicPlaying(playing);
    if (playing) {
      addToast('เปิดดนตรีบรรเลง Lofi สบายๆ 🎵', '🎶');
    }
  };

  // Give EXP & handle Level Up
  const gainExp = (amount: number) => {
    setExp(prev => {
      const nextExp = prev + amount;
      if (nextExp >= expNeeded) {
        // Level up!
        const nextLevel = level + 1;
        setLevel(nextLevel);
        sound.playSparkle();
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FDE38C', '#D4A373', '#FFFDF9', '#C08552']
        });
        addToast(`ยินดีด้วย! ร้านเลื่อนเป็นระดับ ${nextLevel} แล้ว 🎉`, '⭐');

        // Check new recipes to unlock
        const newlyUnlocked = RECIPES
          .filter(r => r.unlockLevel <= nextLevel)
          .map(r => r.id);
        setUnlockedRecipeIds(Array.from(new Set([...unlockedRecipeIds, ...newlyUnlocked])));

        return nextExp - expNeeded;
      }
      return nextExp;
    });
  };

  // Generate cozy customer visits periodically (no timer rush)
  useEffect(() => {
    const interval = setInterval(() => {
      if (orders.length >= 3) return; // Keep max 3 patient customers waiting

      // Pick a recipe from unlocked recipes
      const availableRecipeIds = unlockedRecipeIds;
      if (availableRecipeIds.length === 0) return;

      const randomRecipeId = availableRecipeIds[Math.floor(Math.random() * availableRecipeIds.length)];
      const customerProfile = CUSTOMER_NAMES[Math.floor(Math.random() * CUSTOMER_NAMES.length)];

      const newOrder: CustomerOrder = {
        id: 'ord_' + Date.now() + Math.random().toString(36).substring(2, 6),
        customerName: customerProfile.name,
        avatar: customerProfile.avatar,
        dialogue: customerProfile.dialogue,
        requestedRecipeId: randomRecipeId,
        quantity: 1,
        patience: 100,
        createdAt: Date.now(),
      };

      setOrders(prev => [...prev, newOrder]);
      sound.playDoorBell();
      addToast(`มีลูกค้าแวะเข้ามาในร้าน: ${customerProfile.name}`, '🛎️');
    }, 18000); // Gentle 18s interval

    // Initial first order if empty
    if (orders.length === 0) {
      const initCustomer = CUSTOMER_NAMES[0];
      setOrders([{
        id: 'init_order',
        customerName: initCustomer.name,
        avatar: initCustomer.avatar,
        dialogue: initCustomer.dialogue,
        requestedRecipeId: 'croissant',
        quantity: 1,
        patience: 100,
        createdAt: Date.now(),
      }]);
    }

    return () => clearInterval(interval);
  }, [orders.length, unlockedRecipeIds]);

  // Baking Loop Functions
  const startBakingRecipe = (recipe: Recipe) => {
    sound.playPop(1.0);
    setCurrentRecipe(recipe);
    setBakingStep('add_ingredients');
    setBowlIngredients({
      flour: 0,
      sugar: 0,
      egg: 0,
      butter: 0,
      milk: 0,
      chocolate: 0,
      strawberry: 0,
      matcha: 0,
      cinnamon: 0,
    });
    setMixProgress(0);
    setBakeProgress(0);
    setSelectedToppings([]);
  };

  const addIngredientToBowl = (type: IngredientType) => {
    if (!currentRecipe) return;

    if (type === 'egg') {
      sound.playEggCrack();
    } else if (type === 'milk' || type === 'butter') {
      sound.playPour();
    } else {
      sound.playPop(1.1);
    }

    setBowlIngredients(prev => {
      const current = prev[type] || 0;
      if (current >= 10) return prev;
      return { ...prev, [type]: current + 1 };
    });
  };

  const removeIngredientFromBowl = (type: IngredientType) => {
    sound.playPop(0.8);
    setBowlIngredients(prev => {
      const current = prev[type] || 0;
      if (current <= 0) return prev;
      return { ...prev, [type]: current - 1 };
    });
  };

  const goToMixingStep = () => {
    if (!currentRecipe) return;

    // Check if all ingredients match the recipe requirements
    const isExact = currentRecipe.requiredIngredients.every(
      req => (bowlIngredients[req.type] || 0) === req.amount
    );

    // Also check no extra non-required ingredients added
    const hasUnwanted = Object.entries(bowlIngredients).some(([type, count]) => {
      if (count <= 0) return false;
      return !currentRecipe.requiredIngredients.some(req => req.type === type);
    });

    if (!isExact || hasUnwanted) {
      sound.playPop(0.7);
      addToast('จำนวนส่วนผสมยังไม่ตรงตามกระดาษสูตร ตรวจสอบอีกทีนะจ๊ะ 📝', '⚠️');
      return;
    }

    sound.playSparkle();
    setBakingStep('whisk_mix');
    addToast('ส่วนผสมถูกต้องตามสูตรเป๊ะ! ใช้เคอร์เซอร์คนเป็นวงกลมได้เลย ✨', '🥣');
  };


  const stirBowl = (delta: number) => {
    if (bakingStep !== 'whisk_mix') return;
    sound.playWhisk();
    setMixProgress(prev => {
      const next = Math.min(100, prev + delta);
      if (next >= 100 && prev < 100) {
        sound.playSparkle();
        setTimeout(() => {
          setBakingStep('pour_tray');
          addToast('เนื้อแป้งเนียนนุ่มแล้ว! เทใส่ถาดเพื่อเตรียมอบได้เลย', '🥧');
        }, 300);
      }
      return next;
    });
  };

  const placeOnTray = () => {
    if (bakingStep !== 'pour_tray') return;
    sound.playPlop();
    setBakingStep('oven_bake');
    addToast('นำถาดเข้าเตาอบกันเลย!', '🔥');
  };

  const startOvenBaking = () => {
    if (bakingStep !== 'oven_bake' || !currentRecipe) return;
    sound.playOvenStart();

    const vintageUpgrade = upgrades.find(u => u.id === 'vintage_oven' && u.unlocked);
    const effectiveBakeSeconds = Math.max(3, currentRecipe.bakeTimeSeconds - (vintageUpgrade ? 1 : 0));
    const stepDuration = (effectiveBakeSeconds * 1000) / 100;

    let current = 0;
    const interval = setInterval(() => {
      current += 2;
      setBakeProgress(Math.min(100, current));
      if (current >= 100) {
        clearInterval(interval);
        sound.playOvenDing();
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.5 },
          colors: ['#FFE082', '#FFB74D', '#FFF']
        });
        setBakingStep('decorate');
        addToast('อบสุกหอมกรุ่นแล้ว! มาแต่งหน้าขนมกันเถอะ ✨', '🥐');
      }
    }, stepDuration * 2);
  };

  const addTopping = (toppingId: string) => {
    if (bakingStep !== 'decorate' || !currentRecipe) return;
    sound.playCreamPuff();
    setSelectedToppings(prev => [...prev, toppingId]);
  };

  const finishAndShowcase = () => {
    if (!currentRecipe) return;

    sound.playSparkle();
    const newPastry: BakedPastry = {
      id: 'pastry_' + Date.now(),
      recipeId: currentRecipe.id,
      recipeName: currentRecipe.name,
      recipeNameTh: currentRecipe.nameTh,
      icon: currentRecipe.icon,
      quality: selectedToppings.length > 0 ? 5 : 4,
      toppings: [...selectedToppings],
      bakedAt: Date.now(),
      price: currentRecipe.sellPrice + selectedToppings.length * 5,
    };

    setShowcase(prev => [newPastry, ...prev]);
    gainExp(currentRecipe.expReward);

    addToast(`จัดวาง ${currentRecipe.nameTh} ลงในตู้โชว์เรียบร้อยแล้ว!`, '🧁');
    setBakingStep('done');
  };

  const cancelBaking = () => {
    sound.playPop(0.9);
    setCurrentRecipe(null);
    setBakingStep('select_recipe');
  };

  // Serve Customer Order
  const serveCustomer = (orderId: string, pastryId: string) => {
    const pastryIndex = showcase.findIndex(p => p.id === pastryId);
    const orderIndex = orders.findIndex(o => o.id === orderId);

    if (pastryIndex === -1 || orderIndex === -1) return;

    const pastry = showcase[pastryIndex];
    const order = orders[orderIndex];

    // Pet cat tip bonus
    const catBonus = upgrades.find(u => u.id === 'sleeping_cat' && u.unlocked);
    const tip = catBonus ? Math.round(pastry.price * 0.2) : 0;
    const totalEarned = pastry.price + tip;

    sound.playCoin();
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#FFD54F', '#FFCA28', '#FFE082']
    });

    setCoins(prev => prev + totalEarned);
    gainExp(15);
    setShowcase(prev => prev.filter(p => p.id !== pastryId));
    setOrders(prev => prev.filter(o => o.id !== orderId));

    addToast(
      `ขาย ${pastry.recipeNameTh} ให้ ${order.customerName} ได้ +${totalEarned} 🪙 ${tip > 0 ? '(รวมทิปจากน้องแมว)' : ''}`,
      '💰'
    );
  };

  // Purchase Bakery Upgrade
  const buyUpgrade = (upgradeId: string) => {
    const target = upgrades.find(u => u.id === upgradeId);
    if (!target || target.unlocked) return;

    if (coins < target.cost) {
      sound.playPop(0.7);
      addToast('เหรียญยังมีไม่พอจ้า สะสมจากการขายขนมก่อนนะ 🪙', '⚠️');
      return;
    }

    sound.playSparkle();
    setCoins(prev => prev - target.cost);
    setUpgrades(prev => prev.map(u => u.id === upgradeId ? { ...u, unlocked: true } : u));
    gainExp(50);
    addToast(`ปลดล็อกของตกแต่ง: ${target.nameTh} สำเร็จแล้ว!`, target.icon);

    if (upgradeId === 'gramophone' && !isMusicPlaying) {
      toggleMusic();
    }
  };

  return (
    <GameContext.Provider
      value={{
        coins,
        level,
        exp,
        expNeeded,
        unlockedRecipeIds,
        upgrades,
        activeStation,
        setActiveStation,
        showcase,
        orders,
        serveCustomer,
        buyUpgrade,
        currentRecipe,
        bakingStep,
        bowlIngredients,
        mixProgress,
        bakeProgress,
        selectedToppings,
        startBakingRecipe,
        addIngredientToBowl,
        removeIngredientFromBowl,
        goToMixingStep,
        stirBowl,
        placeOnTray,
        startOvenBaking,
        addTopping,
        finishAndShowcase,
        cancelBaking,
        isMuted,
        toggleMute,
        isMusicPlaying,
        toggleMusic,
        toasts,
        addToast,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within GameProvider');
  return context;
};
