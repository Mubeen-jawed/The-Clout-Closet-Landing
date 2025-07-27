import React from "react";

const ClosetAnimation = () => {
  return (
    <div
      ref={swipeRef}
      className="relative w-48 h-60 sm:w-64 sm:h-80 mx-auto cursor-pointer group mb-16 sm:mb-20"
      onClick={() => {
        setClosetOpen(true);
        setTimeout(() => setClosetOpen(false), 4000);
      }}
    >
      {/* Clean Closet Design */}
      <div className="relative w-full h-full">
        <div
          className={`absolute inset-0 bg-white rounded-xl sm:rounded-2xl border-2 border-stone-200 shadow-lg transition-all duration-600 ${
            closetOpen ? "animate-slideLeft" : ""
          }`}
        >
          <div className="absolute top-1/2 right-3 sm:right-4 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-stone-400 rounded-full transform -translate-y-1/2"></div>
        </div>

        {/* Minimalist Fashion Items */}
        {[1, 2, 3, 4].map((_, index) => (
          <FashionItem
            key={index}
            item=""
            index={index}
            isVisible={closetOpen}
          />
        ))}

        {/* Clean Interaction Hint */}
        <div className="absolute -bottom-10 sm:-bottom-12 left-1/2 transform -translate-x-1/2 text-center">
          <div className="flex items-center justify-center space-x-2 text-stone-500">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            <span className="text-xs sm:text-sm font-medium">
              Swipe to preview
            </span>
          </div>
        </div>

        {/* Reveal Text */}
        <div
          className={`absolute -bottom-16 sm:-bottom-20 left-1/2 transform -translate-x-1/2 text-center transition-all duration-500 ${
            closetOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <p className="text-stone-600 font-medium text-xs sm:text-sm">
            Exclusive collections await
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClosetAnimation;
