import React from 'react';
import { UserDetails } from '../types';
import { COMPANIES, DELIVERY_TIMES } from '../constants';

interface EmployeeFormProps {
  details: UserDetails;
  onChange: (key: keyof UserDetails, value: string) => void;
}

export const EmployeeForm: React.FC<EmployeeFormProps> = ({ details, onChange }) => {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="material-icons-outlined text-primary">person</span>
        <h2 className="text-lg font-bold text-text-light dark:text-text-dark">بيانات الموظف</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="flex flex-col space-y-1">
          <span className="text-xs font-medium text-subtle-light dark:text-subtle-dark mr-1">الشركة</span>
          <div className="relative">
             <select
              value={details.company}
              onChange={(e) => onChange('company', e.target.value)}
              className="w-full bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl p-3 text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary focus:border-primary transition appearance-none cursor-pointer"
            >
              <option value="">اختر الشركة</option>
              {COMPANIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <span className="material-icons-outlined absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-subtle-light dark:text-subtle-dark">expand_more</span>
          </div>
        </label>

        <label className="flex flex-col space-y-1">
          <span className="text-xs font-medium text-subtle-light dark:text-subtle-dark mr-1">وقت التوصيل</span>
          <div className="relative">
             <select
              value={details.deliveryTime}
              onChange={(e) => onChange('deliveryTime', e.target.value)}
              className="w-full bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl p-3 text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary focus:border-primary transition appearance-none cursor-pointer"
            >
              <option value="">اختر الوقت</option>
              {DELIVERY_TIMES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
             <span className="material-icons-outlined absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-subtle-light dark:text-subtle-dark">schedule</span>
          </div>
        </label>

        <label className="flex flex-col space-y-1">
          <span className="text-xs font-medium text-subtle-light dark:text-subtle-dark mr-1">الاسم الكامل</span>
          <input
            type="text"
            value={details.name}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="أدخل اسمك الكامل"
            className="w-full bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl p-3 text-text-light dark:text-text-dark placeholder-subtle-light/50 dark:placeholder-subtle-dark/50 focus:ring-2 focus:ring-primary focus:border-primary transition"
          />
        </label>

        <label className="flex flex-col space-y-1">
          <span className="text-xs font-medium text-subtle-light dark:text-subtle-dark mr-1">رقم الهاتف</span>
          <input
            type="tel"
            value={details.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            placeholder="05x-xxxxxxx"
            className="w-full bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl p-3 text-text-light dark:text-text-dark placeholder-subtle-light/50 dark:placeholder-subtle-dark/50 focus:ring-2 focus:ring-primary focus:border-primary transition text-right"
            dir="ltr"
          />
        </label>
      </div>
    </section>
  );
};