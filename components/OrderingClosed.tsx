import React from 'react';
import { ORDER_CUTOFF_TIME } from '../constants';

export const OrderingClosed: React.FC = () => {
  const formattedTime = `${ORDER_CUTOFF_TIME.hour}:${ORDER_CUTOFF_TIME.minute.toString().padStart(2, '0')}`;

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center animate-fade-in">
      <div className="bg-card-light dark:bg-card-dark p-8 rounded-3xl shadow-xl max-w-sm w-full border border-border-light dark:border-border-dark">
        <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500 dark:text-red-400">
          <span className="material-icons-outlined text-4xl">schedule</span>
        </div>

        <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-3">
          الطلب مغلق حاليًّا
        </h2>

        <p className="text-subtle-light dark:text-subtle-dark mb-6 leading-relaxed">
          نعتذر، انتهى وقت استقبال الطلبات لهذا اليوم. يرجى الطلب غدًا بين الساعة 07:00 صباحًا و {formattedTime} صباحًا.
        </p>

        <div className="bg-background-light dark:bg-background-dark p-4 rounded-xl border border-border-light dark:border-border-dark flex items-center gap-3 text-left dir-ltr">
          <span className="material-icons-outlined text-primary">info</span>
          <div className="flex flex-col items-start">
            <span className="text-xs text-subtle-light dark:text-subtle-dark font-medium">Next Order Time</span>
            <span className="text-sm font-bold text-text-light dark:text-text-dark">Tomorrow, 07:00 AM - {formattedTime} AM</span>
          </div>
        </div>
      </div>
    </div>
  );
};
