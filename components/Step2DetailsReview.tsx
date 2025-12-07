
import React from 'react';
import { EmployeeForm } from './EmployeeForm';
import { Cart, UserDetails, CartItem } from '../types';

interface Step2DetailsReviewProps {
  cart: Cart;
  userDetails: UserDetails;
  onUserDetailsChange: (key: keyof UserDetails, value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
  totalAmount: number;
}

export const Step2DetailsReview: React.FC<Step2DetailsReviewProps> = ({
  cart,
  userDetails,
  onUserDetailsChange,
  onSubmit,
  onBack,
  isSubmitting,
  totalAmount
}) => {
  const cartItems = Object.values(cart) as CartItem[];

  return (
    <div className="pb-32">
      <div className="p-4 space-y-6 animate-fade-in">
        
        {/* Step Indicator */}
        <div className="flex items-center gap-2 mb-4">
          <button 
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-card-light dark:bg-card-dark text-text-light dark:text-text-dark border border-border-light dark:border-border-dark shadow-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <span className="material-icons-outlined">arrow_forward</span>
          </button>
          <div>
             <h2 className="text-xl font-bold text-text-light dark:text-text-dark">مراجعة الطلب</h2>
             <p className="text-xs text-subtle-light dark:text-subtle-dark">الخطوة 2 من 2</p>
          </div>
        </div>

        {/* Employee Form */}
        <div className="bg-card-light dark:bg-card-dark rounded-2xl p-5 shadow-sm border border-border-light dark:border-border-dark">
          <EmployeeForm details={userDetails} onChange={onUserDetailsChange} />
        </div>

        {/* Order Summary */}
        <div className="bg-card-light dark:bg-card-dark rounded-2xl p-5 shadow-sm border border-border-light dark:border-border-dark space-y-4">
          <div className="flex items-center gap-2 border-b border-border-light dark:border-border-dark pb-3">
             <span className="material-icons-outlined text-primary">receipt_long</span>
             <h3 className="text-lg font-bold text-text-light dark:text-text-dark">تفاصيل الوجبات</h3>
          </div>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.name} className="flex flex-col gap-1">
                <div className="flex justify-between items-start">
                  <div className="flex gap-2 items-center">
                    <span className="flex items-center justify-center min-w-[24px] h-6 rounded bg-primary/20 text-primary text-xs font-bold px-1">
                      {item.qty}x
                    </span>
                    <span className="text-text-light dark:text-text-dark font-medium">{item.name}</span>
                  </div>
                  <span className="text-text-light dark:text-text-dark font-bold">{item.price * item.qty} ₪</span>
                </div>
                {item.notes && (
                  <p className="text-xs text-subtle-light dark:text-subtle-dark mr-8 bg-background-light dark:bg-background-dark p-2 rounded-lg border border-border-light dark:border-border-dark">
                    <span className="font-bold">ملاحظة:</span> {item.notes}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="border-t-2 border-dashed border-border-light dark:border-border-dark pt-3 mt-2">
            <div className="flex justify-between items-center text-lg">
              <span className="font-bold text-text-light dark:text-text-dark">المجموع النهائي</span>
              <span className="font-extrabold text-primary text-2xl">{totalAmount} ₪</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Footer for Step 2 */}
      <div className="fixed bottom-0 left-0 right-0 z-30">
        <div className="max-w-md mx-auto bg-card-light dark:bg-card-dark border-t border-border-light dark:border-border-dark shadow-[0_-8px_30px_rgba(0,0,0,0.12)] p-4 rounded-t-2xl">
          <button 
            onClick={onSubmit}
            disabled={isSubmitting}
            className={`
              w-full h-14 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg transition-all
              ${isSubmitting 
                ? 'bg-subtle-light dark:bg-subtle-dark text-white cursor-not-allowed' 
                : 'bg-[#25D366] text-white hover:bg-[#128C7E] active:scale-[0.98] shadow-[#25D366]/20'
              }
            `}
          >
            {isSubmitting ? (
              <>
                <span className="material-icons-outlined animate-spin">refresh</span>
                <span>جاري الإرسال...</span>
              </>
            ) : (
              <>
                <span className="material-icons-outlined">whatsapp</span>
                <span>تأكيد وإرسال الطلب</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
