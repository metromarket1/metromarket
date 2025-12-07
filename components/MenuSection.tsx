
import React, { useState, useMemo } from 'react';
import { MenuItem, Category, Cart } from '../types';
import { CATEGORIES, MENU_DATA } from '../constants';

interface MenuSectionProps {
  cart: Cart;
  onUpdateCart: (item: MenuItem, change: number) => void;
  onUpdateNotes: (itemName: string, notes: string) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ cart, onUpdateCart, onUpdateNotes }) => {
  const [activeCategory, setActiveCategory] = useState<Category>('sandwiches');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedNotes, setExpandedNotes] = useState<Record<string, boolean>>({});

  const toggleNote = (itemName: string) => {
    setExpandedNotes(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  const filteredItems = useMemo(() => {
    let items = MENU_DATA;
    
    // Search filter
    if (searchQuery) {
      items = items.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      // Category filter (only applies if no search)
      items = items.filter(item => item.category === activeCategory);
    }
    
    return items;
  }, [activeCategory, searchQuery]);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
           <span className="material-icons-outlined text-primary">restaurant_menu</span>
           <h2 className="text-lg font-bold text-text-light dark:text-text-dark">القائمة</h2>
        </div>
      </div>

      {/* Search */}
      <div className="relative group">
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ابحث عن وجبتك المفضلة..." 
          className="w-full bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl py-3 pr-10 pl-4 text-text-light dark:text-text-dark placeholder-subtle-light/50 dark:placeholder-subtle-dark/50 focus:ring-2 focus:ring-primary focus:border-primary transition shadow-sm"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-subtle-light dark:text-subtle-dark pointer-events-none material-icons-outlined group-focus-within:text-primary transition-colors">
          search
        </span>
      </div>

      {/* Filter Pills (Hide if searching) */}
      {!searchQuery && (
        <div className="flex space-x-2 space-x-reverse overflow-x-auto pb-2 no-scrollbar">
          {CATEGORIES.map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`
                  px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-300
                  ${isActive 
                    ? 'bg-gradient-to-r from-primary to-[#ffd700] text-black shadow-lg shadow-primary/20 scale-105' 
                    : 'bg-card-light dark:bg-card-dark text-subtle-light dark:text-subtle-dark border border-border-light dark:border-border-dark hover:border-primary/50'
                  }
                `}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Items List */}
      <div className="space-y-3 min-h-[300px]">
        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-subtle-light dark:text-subtle-dark opacity-50">
             <span className="material-icons-outlined text-4xl mb-2">no_food</span>
             <p>لا توجد نتائج مطابقة</p>
          </div>
        ) : (
          filteredItems.map(item => {
            const inCart = cart[item.name];
            const qty = inCart?.qty || 0;
            const notes = inCart?.notes || '';
            const isNoteExpanded = expandedNotes[item.name];

            return (
              <div 
                key={item.name}
                className={`
                  relative overflow-hidden rounded-xl p-4 transition-all duration-300
                  bg-card-light dark:bg-card-dark border
                  ${qty > 0 ? 'border-primary shadow-md shadow-primary/10 ring-1 ring-primary/20' : 'border-border-light dark:border-border-dark hover:border-primary/30'}
                `}
              >
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-text-light dark:text-text-dark text-lg">{item.name}</h3>
                    {item.description && (
                      <p className="text-sm text-subtle-light dark:text-subtle-dark mt-1 leading-relaxed line-clamp-2">{item.description}</p>
                    )}
                    <p className="font-bold text-primary text-xl mt-2">{item.price} ₪</p>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    {qty === 0 ? (
                      <button 
                        onClick={() => onUpdateCart(item, 1)}
                        className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-black shadow-md hover:bg-primary-hover active:scale-95 transition-all"
                        aria-label="Add to cart"
                      >
                        <span className="material-icons-outlined">add</span>
                      </button>
                    ) : (
                      <div className="flex items-center bg-background-light dark:bg-background-dark rounded-lg p-1 border border-border-light dark:border-border-dark shadow-inner">
                        <button 
                          onClick={() => onUpdateCart(item, 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-md bg-primary text-black hover:bg-primary-hover active:scale-95 transition"
                        >
                           <span className="material-icons-outlined text-sm">add</span>
                        </button>
                        <span className="w-8 text-center font-bold text-text-light dark:text-text-dark">{qty}</span>
                        <button 
                          onClick={() => onUpdateCart(item, -1)}
                          className="w-8 h-8 flex items-center justify-center rounded-md bg-subtle-light/20 dark:bg-subtle-dark/20 text-text-light dark:text-text-dark hover:bg-subtle-light/30 dark:hover:bg-subtle-dark/30 active:scale-95 transition"
                        >
                           <span className="material-icons-outlined text-sm">remove</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {qty > 0 && (
                  <div className="mt-3 pt-2 border-t border-dashed border-border-light dark:border-border-dark animate-fade-in">
                    <button 
                      onClick={() => toggleNote(item.name)}
                      className="flex items-center gap-1 text-xs text-primary font-bold hover:text-primary-hover transition-colors mb-2"
                    >
                      <span className="material-icons-outlined text-sm">
                        {notes || isNoteExpanded ? 'edit_note' : 'add_comment'}
                      </span>
                      <span>{notes || isNoteExpanded ? 'تعديل الملاحظات' : 'إضافة ملاحظات'}</span>
                    </button>

                    {isNoteExpanded && (
                      <div className="relative animate-fade-in">
                        <input 
                          type="text" 
                          value={notes}
                          onChange={(e) => onUpdateNotes(item.name, e.target.value)}
                          placeholder="مثال: بدون بصل، زيادة صوص..." 
                          autoFocus
                          className="w-full bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg py-2 pr-4 pl-3 text-sm text-text-light dark:text-text-dark focus:ring-1 focus:ring-primary focus:border-primary transition"
                        />
                      </div>
                    )}
                    
                    {!isNoteExpanded && notes && (
                      <div 
                        onClick={() => toggleNote(item.name)}
                        className="cursor-pointer bg-background-light dark:bg-background-dark p-2 rounded-lg border border-border-light dark:border-border-dark text-xs text-subtle-light dark:text-subtle-dark hover:border-primary/30 transition-colors"
                      >
                         <span className="font-bold text-primary">ملاحظة:</span> {notes}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};
