import React from 'react';
import { useGame } from '../../context/GameContext';
import { CozyButton } from '../ui/CozyButton';
import { Utensils, Star, Heart, CheckCircle2, AlertCircle } from 'lucide-react';

export const ShopCounter: React.FC = () => {
  const {
    showcase,
    orders,
    serveCustomer,
    setActiveStation,
    upgrades,
  } = useGame();

  const hasCat = upgrades.some(u => u.id === 'sleeping_cat' && u.unlocked);
  const hasFlower = upgrades.some(u => u.id === 'flower_vase' && u.unlocked);
  const hasLamp = upgrades.some(u => u.id === 'warm_lamp' && u.unlocked);

  return (
    <div className="max-w-6xl mx-auto px-4 py-4">
      {/* Shop Ambience Banner / Counter */}
      <div className="relative bg-[#F5EBE1] border-2 border-[#DFCBBA] rounded-3xl p-6 sm:p-8 mb-8 shadow-md overflow-hidden">
        {/* Soft Warm Light Overlay if Lamp unlocked */}
        {hasLamp && (
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFE0B2]/30 rounded-full blur-3xl pointer-events-none" />
        )}

        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#543310]">
                หน้าร้าน & เคาน์เตอร์ตู้โชว์ 🏪
              </h2>
              {hasLamp && <span title="โคมไฟวอร์มไลท์เปิดอยู่">💡</span>}
            </div>
            <p className="text-sm text-[#8C6B53] mt-1">
              จัดวางขนมอบหอมกรุ่นในตู้กระจก ลูกค้าจะแวะมาอุดหนุนอย่างสบายใจโดยไม่มีการเร่งเวลา
            </p>
          </div>

          {/* Counter Props (Cat, Flowers) */}
          <div className="flex items-center gap-3">
            {hasFlower && (
              <div className="bg-[#FFFDF9] border border-[#DFC4AA] px-3 py-1.5 rounded-2xl flex items-center gap-1.5 shadow-2xs text-sm text-[#6F452A] animate-float-gentle">
                <span>🌼</span>
                <span className="font-bold">แจกันเดซี่</span>
              </div>
            )}
            {hasCat && (
              <div className="bg-[#FFFDF9] border border-[#DFC4AA] px-3 py-1.5 rounded-2xl flex items-center gap-1.5 shadow-2xs text-sm text-[#6F452A]">
                <span className="text-xl animate-pulse">🐱</span>
                <span className="font-bold">เจ้าส้มหลับปุ๋ย (ทิป +20%)</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Glass Showcase Cabinet */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-[#543310] flex items-center gap-2">
              <span>ตู้โชว์กระจก</span>
              <span className="text-xs bg-[#EFE3D5] text-[#7A5034] font-bold px-2.5 py-0.5 rounded-full">
                {showcase.length} ชิ้นในตู้
              </span>
            </h3>

            <CozyButton
              variant="secondary"
              size="sm"
              onClick={() => setActiveStation('kitchen')}
              icon={<Utensils className="w-4 h-4" />}
            >
              ไปอบขนมเพิ่ม 🥣
            </CozyButton>
          </div>

          {/* Glass Showcase Display */}
          <div className="bg-[#FFFDF9] border-4 border-[#DECAB7] rounded-3xl p-6 shadow-lg min-h-[320px]">
            {showcase.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center text-[#B08A6F]">
                <span className="text-5xl mb-3 animate-float-gentle">🥐</span>
                <h4 className="text-lg font-bold text-[#6F452A] mb-1">
                  ตู้โชว์ยังว่างอยู่เลย
                </h4>
                <p className="text-xs max-w-xs mb-4">
                  ไปที่โต๊ะทำขนมแล้วอบขนมอร่อยๆ มาจัดวางในตู้กันเถอะ
                </p>
                <CozyButton
                  variant="primary"
                  size="sm"
                  onClick={() => setActiveStation('kitchen')}
                  icon={<Utensils className="w-4 h-4" />}
                >
                  เริ่มอบขนมชิ้นแรก
                </CozyButton>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {showcase.map((pastry) => (
                  <div
                    key={pastry.id}
                    className="bg-[#FAF4ED] border-2 border-[#EAD7C3] rounded-2xl p-4 flex flex-col items-center text-center shadow-xs hover:shadow-md transition-all group"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-[#FFFDF9] border border-[#E5D2BE] flex items-center justify-center text-4xl mb-2 shadow-inner group-hover:scale-110 transition-transform">
                      {pastry.icon}
                    </div>
                    <h5 className="font-bold text-sm text-[#543310] mb-1">
                      {pastry.recipeNameTh}
                    </h5>

                    {/* Star quality */}
                    <div className="flex gap-0.5 text-[#FFA726] text-xs mb-1.5">
                      {Array.from({ length: pastry.quality }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>

                    <span className="text-xs font-bold text-[#8C5B3F] bg-[#FFFDF9] px-2 py-0.5 rounded-full border border-[#E8D8C7]">
                      🪙 {pastry.price} เหรียญ
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Column: Customer Orders Area */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-[#543310] flex items-center gap-2">
              <span>ลูกค้าที่แวะมา</span>
              <span className="text-xs bg-[#EFE3D5] text-[#7A5034] font-bold px-2.5 py-0.5 rounded-full">
                {orders.length} ท่าน
              </span>
            </h3>
          </div>

          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="bg-[#FAF4ED] border-2 border-[#E5D2BE] rounded-3xl p-6 text-center text-[#9C7860]">
                <span className="text-4xl mb-2 block animate-float-gentle">🚪</span>
                <p className="font-bold text-sm text-[#6F452A] mb-1">
                  กำลังรอคุณลูกค้าแวะมา...
                </p>
                <p className="text-xs">
                  ลูกค้าจะทยอยเดินเข้ามาเรื่อยๆ อย่างใจเย็น
                </p>
              </div>
            ) : (
              orders.map((order) => {
                // Check if we have matching pastry in showcase
                const matchingPastry = showcase.find(
                  p => p.recipeId === order.requestedRecipeId
                );

                return (
                  <div
                    key={order.id}
                    className="bg-[#FFFDF9] border-2 border-[#E5D2BE] rounded-3xl p-5 shadow-sm flex flex-col gap-3 transition-all hover:shadow-md"
                  >
                    {/* Customer Info */}
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#F8EFE4] border border-[#E5D2BE] flex items-center justify-center text-3xl shrink-0 shadow-inner">
                        {order.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-sm text-[#543310]">
                            {order.customerName}
                          </h4>
                          <span className="text-xs text-[#9C7860] flex items-center gap-1">
                            <Heart className="w-3 h-3 text-[#E04D53] fill-current" /> ชิลล์ๆ
                          </span>
                        </div>
                        <p className="text-xs text-[#8C6B53] italic mt-0.5 line-clamp-2">
                          "{order.dialogue}"
                        </p>
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="bg-[#FAF4ED] rounded-2xl p-3 border border-[#EFE3D5] flex items-center justify-between text-xs">
                      <span className="text-[#8C6B53] font-bold">ต้องการซื้อ:</span>
                      <span className="font-bold text-[#543310] flex items-center gap-1">
                        {order.requestedRecipeId === 'croissant' && '🥐 ครัวซองต์'}
                        {order.requestedRecipeId === 'cookie' && '🍪 คุกกี้'}
                        {order.requestedRecipeId === 'shortcake' && '🍰 ชอร์ตเค้ก'}
                        {order.requestedRecipeId === 'cinnamon_roll' && '🍥 ชินนามอนโรล'}
                        {order.requestedRecipeId === 'matcha_tart' && '🍵 ทาร์ตมัทฉะ'}
                        {order.requestedRecipeId === 'cupcake' && '🧁 คัพเค้ก'}
                      </span>
                    </div>

                    {/* Serve Button */}
                    <div>
                      {matchingPastry ? (
                        <CozyButton
                          variant="primary"
                          size="sm"
                          className="w-full"
                          onClick={() => serveCustomer(order.id, matchingPastry.id)}
                          icon={<CheckCircle2 className="w-4 h-4" />}
                        >
                          เสิร์ฟขนม & รับ 🪙 {matchingPastry.price} {hasCat ? '(+ทิป)' : ''}
                        </CozyButton>
                      ) : (
                        <div className="flex items-center justify-between bg-[#F7EEE3] px-3 py-2 rounded-xl text-xs text-[#9C7860]">
                          <span className="flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 text-[#C08552]" />
                            ยังไม่มีขนมนี้ในตู้
                          </span>
                          <button
                            onClick={() => setActiveStation('kitchen')}
                            className="font-bold text-[#8C5B3F] hover:underline cursor-pointer"
                          >
                            ไปอบเลย ➔
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
