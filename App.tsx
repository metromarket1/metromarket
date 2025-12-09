
import React, { useState, useEffect, useMemo } from 'react';
import { ThemeToggle } from './components/ThemeToggle';
import { Step1MealSelection } from './components/Step1MealSelection';
import { Step2DetailsReview } from './components/Step2DetailsReview';
import { Cart, MenuItem, UserDetails, OrderData, CartItem } from './types';
import { submitOrderToFirebase } from './services/firebase';
import { WHATSAPP_NUMBER } from './constants';

const App: React.FC = () => {
  // Theme State
  const [isDark, setIsDark] = useState(false);

  // App Step State
  const [step, setStep] = useState<1 | 2>(1);

  // Data State
  const [cart, setCart] = useState<Cart>({});
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: '',
    phone: '',
    company: '',
    deliveryTime: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize Theme
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  // Handlers
  const handleUpdateCart = (item: MenuItem, change: number) => {
    setCart(prev => {
      const current = prev[item.name];
      const newQty = (current?.qty || 0) + change;
      
      if (newQty <= 0) {
        const { [item.name]: _, ...rest } = prev;
        return rest;
      }
      
      return {
        ...prev,
        [item.name]: {
          ...item,
          qty: newQty,
          notes: current?.notes || ''
        }
      };
    });
  };

  const handleUpdateNotes = (itemName: string, notes: string) => {
    setCart(prev => ({
      ...prev,
      [itemName]: { ...prev[itemName], notes }
    }));
  };

  const handleUserDetailsChange = (key: keyof UserDetails, value: string) => {
    setUserDetails(prev => ({ ...prev, [key]: value }));
  };

  const totalAmount = useMemo(() => {
    return (Object.values(cart) as CartItem[]).reduce((sum, item) => sum + (item.price * item.qty), 0);
  }, [cart]);

  const goToNextStep = () => {
    if (Object.keys(cart).length === 0) {
      alert('يرجى اختيار وجبة واحدة على الأقل للمتابعة');
      return;
    }
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPrevStep = () => {
    setStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    // Validation
    if (!userDetails.name || !userDetails.phone || !userDetails.company || !userDetails.deliveryTime) {
      alert('يرجى تعبئة جميع بيانات الموظف في النموذج.');
      return;
    }

    const orderItems = Object.values(cart) as CartItem[];
    if (orderItems.length === 0) {
      alert('السلة فارغة!');
      return;
    }

    setIsSubmitting(true);

    const orderData: OrderData = {
      ...userDetails,
      orders: orderItems.map(i => ({ order: i.name, qty: i.qty, notes: i.notes || 'لا توجد' })),
      total: totalAmount,
      createdAt: new Date().toISOString()
    };

    try {
      // 1. Save to Firebase
      await submitOrderToFirebase(orderData);

      // 2. Prepare WhatsApp Message
      let orderMsg = "";
      orderData.orders.forEach((item, index) => {
        orderMsg += `%0A--- الطلب رقم ${index + 1} ---` +
          `%0Aالطلب: ${encodeURIComponent(item.order)}` +
          `%0Aالعدد: ${encodeURIComponent(item.qty)}` +
          `%0Aملاحظات: ${encodeURIComponent(item.notes)}%0A`;
      });

      const msg =
        "وجبة جديدة: " +
        `%0Aالاسم: ${encodeURIComponent(userDetails.name)}` +
        `%0Aالهاتف: ${encodeURIComponent(userDetails.phone)}` +
        `%0Aالشركة: ${encodeURIComponent(userDetails.company)}` +
        `%0Aوقت التوصيل: ${encodeURIComponent(userDetails.deliveryTime)}` +
        `%0Aإجمالي السعر: ${totalAmount} شيكل` +
        `%0A${orderMsg}`;

      // 3. Redirect
      window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;

    } catch (error) {
      console.error(error);
      alert('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="max-w-md mx-auto min-h-screen bg-background-light dark:bg-background-dark relative shadow-2xl shadow-black/20">
        
        {/* Header */}
        <header className="sticky top-0 z-40 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-border-light dark:border-border-dark px-4 py-3 flex items-center justify-between transition-colors">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full overflow-hidden border border-border-light dark:border-border-dark bg-card-dark">
                <img src="./resources/images/metrologo.jpeg" alt="Logo" className="w-full h-full object-cover" />
             </div>
             <div>
               <h1 className="font-bold text-lg leading-tight text-text-light dark:text-text-dark">طلبات الموظفين</h1>
               <p className="text-xs text-subtle-light dark:text-subtle-dark font-medium">Metro Sandwiches</p>
             </div>
          </div>
          <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
        </header>

        {/* Main Content Area */}
        <main>
          {step === 1 ? (
            <Step1MealSelection 
              cart={cart}
              onUpdateCart={handleUpdateCart}
              onUpdateNotes={handleUpdateNotes}
              onNext={goToNextStep}
              totalAmount={totalAmount}
            />
          ) : (
            <Step2DetailsReview 
              cart={cart}
              userDetails={userDetails}
              onUserDetailsChange={handleUserDetailsChange}
              onSubmit={handleSubmit}
              onBack={goToPrevStep}
              isSubmitting={isSubmitting}
              totalAmount={totalAmount}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
