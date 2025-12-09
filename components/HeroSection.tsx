import React, { useState } from "react";
import { MENU_IMAGE_PATH } from "../constants";

export const HeroSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="cursor-pointer rounded-2xl overflow-hidden shadow-xl shadow-black/10 dark:shadow-black/50 border border-border-light dark:border-border-dark relative group transition-transform hover:scale-[1.01]"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
        <img
          src={MENU_IMAGE_PATH}
          alt="Metro Menu"
          className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute bottom-0 right-0 p-4 z-20">
          <p className="text-xs text-gray-200 mt-1 flex items-center gap-1">
            <span className="material-icons-outlined text-sm">visibility</span>
            <span>اضغط لعرض القائمة الكاملة</span>
          </p>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div className="relative max-w-2xl w-full max-h-[90vh] overflow-hidden rounded-xl bg-card-dark border border-border-dark shadow-2xl">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-primary hover:text-black transition z-10"
            >
              <span className="material-icons-outlined">close</span>
            </button>
            <div className="overflow-auto h-full max-h-[90vh]">
              <img
                src={MENU_IMAGE_PATH}
                alt="Metro Menu Full"
                className="w-full h-auto block"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
