
import React from 'react';
import { createPortal } from 'react-dom';
import { HeroSection } from './HeroSection';
import { MenuSection } from './MenuSection';
import { Cart, MenuItem, CartItem } from '../types';

interface Step1MealSelectionProps {
  cart: Cart;
  onUpdateCart: (item: MenuItem, change: number) => void;
  onUpdateNotes: (itemName: string, notes: string) => void;
  onNext: () => void;
  totalAmount: number;
  isOrderingOpen: boolean;
}

export const Step1MealSelection: React.FC<Step1MealSelectionProps> = ({
  cart,
  onUpdateCart,
  onUpdateNotes,
  onNext,
  totalAmount,
  isOrderingOpen
}) => {
  const cartItems = Object.values(cart) as CartItem[];
  const totalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div className="pb-80 md:pb-64">
      <div className="p-4 space-y-6 animate-fade-in">
        {!isOrderingOpen && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 flex items-start gap-3">
            <span className="material-icons-outlined text-red-500 dark:text-red-400">error_outline</span>
            <div>
              <h3 className="font-bold text-red-700 dark:text-red-400">انتهى وقت استقبال الطلبات</h3>
              <p className="text-sm text-red-600 dark:text-red-300 mt-1">
                نعتذر منكم، لقد تم إغلاق باب الطلبات لهذا اليوم. نستقبل طلباتكم غداً من الساعة 7:00 صباحاً وحتى 12:30 ظهراً.
              </p>
            </div>
          </div>
        )}
        <HeroSection />
        <MenuSection 
          cart={cart}
          onUpdateCart={onUpdateCart}
          onUpdateNotes={onUpdateNotes}
        />
      </div>

      {/* Floating Footer for Step 1 */}
      {createPortal(
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <div className="max-w-md mx-auto bg-card-light dark:bg-card-dark border-t border-border-light dark:border-border-dark shadow-[0_-8px_30px_rgba(0,0,0,0.12)] p-4 rounded-t-2xl">
          
          {/* Selected Meals Summary List */}
          {cartItems.length > 0 && (
             <div className="mb-3 border-b border-border-light dark:border-border-dark pb-3">
                <div className="flex items-center gap-1 mb-2 text-xs text-subtle-light dark:text-subtle-dark font-medium">
                   <span className="material-icons-outlined text-sm">shopping_bag</span>
                   <span>الوجبات المختارة</span>
                </div>
                <div className="max-h-24 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                   {cartItems.map((item) => (
                     <div key={item.name} className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2">
                           <span className="bg-primary/20 text-primary text-xs font-bold px-1.5 py-0.5 rounded">{item.qty}x</span>
                           <span className="text-text-light dark:text-text-dark truncate max-w-[180px]">{item.name}</span>
                        </div>
                        <span className="font-bold text-text-light dark:text-text-dark text-xs">{item.price * item.qty} ₪</span>
                     </div>
                   ))}
                </div>
             </div>
          )}

          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col">
              <span className="text-xs text-subtle-light dark:text-subtle-dark">المجموع الكلي</span>
              <span className="text-2xl font-extrabold text-primary">{totalAmount} ₪</span>
            </div>
            <div className="text-xs text-subtle-light dark:text-subtle-dark bg-background-light dark:bg-background-dark px-3 py-1 rounded-full border border-border-light dark:border-border-dark">
              {totalQty} وجبات
            </div>
          </div>

          <button 
            onClick={onNext}
            disabled={totalQty === 0 || !isOrderingOpen}
            className={`
              w-full h-14 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg transition-all
              ${totalQty === 0 || !isOrderingOpen
                ? 'bg-subtle-light dark:bg-subtle-dark text-white cursor-not-allowed opacity-50' 
                : 'bg-gradient-to-r from-primary to-[#ffc800] text-black hover:shadow-primary/25 active:scale-[0.98]'
              }
            `}
          >
            <span>متابعة لإدخال البيانات</span>
            <span className="material-icons-outlined rotate-180">arrow_right_alt</span>
          </button>
        </div>
      </div>,
      document.body
      )}
    </div>
  );
};
