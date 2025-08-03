import React, { useState, useEffect, useRef } from "react";
import Logo from "./assets/Logo.png";
import LogoTCC from "./assets/Logo-TCC.png";

const CloutClosetLanding = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0 });
  const [closetOpen, setClosetOpen] = useState(false);
  const [emailList, setEmailList] = useState([]);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [swipeRevealed, setSwipeRevealed] = useState(false);
  const [waitlistRevealed, setWaitlistRevealed] = useState(false);
  const [currentInfluencer, setCurrentInfluencer] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const swipeRef = useRef(null);

  // Hero entrance animation on load
  useEffect(() => {
    setTimeout(() => setHeroLoaded(true), 300);
  }, []);

  // Countdown timer
  useEffect(() => {
    const updateCountdown = () => {
      const launchDate = new Date("2025-09-01T00:00:00").getTime();
      const now = new Date().getTime();
      const distance = launchDate - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        setCountdown({ days, hours, minutes });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, []);

  // Scroll-triggered animations - adjusted for mobile
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      if (scrollY > windowHeight * 0.1) {
        setSwipeRevealed(true);
      }

      if (scrollY > windowHeight * 0.25) {
        setWaitlistRevealed(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Touch/swipe handling
  useEffect(() => {
    let startX = 0;
    let startY = 0;

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const diffX = Math.abs(endX - startX);
      const diffY = Math.abs(endY - startY);

      if (diffX > diffY && diffX > 50) {
        setClosetOpen(true);
        setTimeout(() => setClosetOpen(false), 4000);
      }
    };

    if (swipeRef.current) {
      swipeRef.current.addEventListener("touchstart", handleTouchStart);
      swipeRef.current.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      if (swipeRef.current) {
        swipeRef.current.removeEventListener("touchstart", handleTouchStart);
        swipeRef.current.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, []);

  // Influencer carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInfluencer((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Navbar Logo change

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0); // if user has scrolled down at all
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleEmailSubmit = () => {
    if (email && !emailList.includes(email)) {
      // Save to local state
      setEmailList((prev) => [...prev, email]);
      setIsSubmitted(true);
      setEmail("");

      // Save to Google Sheets
      fetch(
        "https://script.google.com/macros/s/AKfycbxOY8N6ugpwxkm_chfyeXdDYi8NmwFyplH01Nh865SYkcVgW7f5VY1J4HE6oscetiX1/exec",
        {
          method: "POST",
          mode: "no-cors", // Prevents CORS errors
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  {
    /* F5F2EF
              ED9449
              2E2D2c */
  }

  const FlipNumber = ({ number, label }) => (
    <div className="bg-[#F5F2EF] backdrop-blur-sm rounded-xl p-3 sm:p-6 text-center min-w-[70px] sm:min-w-[90px] shadow-sm border border-stone-200">
      <div className="text-xl sm:text-3xl font-bold text-[#2E2D2c] mb-1">
        {number}
      </div>
      <div className="text-xs text-stone-500 uppercase tracking-wider font-medium">
        {label}
      </div>
    </div>
  );

  const FashionItem = ({ item, index, isVisible }) => (
    <div
      className={`absolute transition-all duration-500 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{
        animationDelay: `${index * 100}ms`,
        left: `${20 + index * 15}%`,
        top: `${35 + (index % 2) * 15}%`,
      }}
    >
      <div className="w-8 h-12 sm:w-12 sm:h-16 bg-stone-200 rounded-lg flex items-center justify-center shadow-sm">
        <div className="w-6 h-9 sm:w-8 sm:h-12 bg-stone-300 rounded opacity-60"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F5F2EF] text-stone-800 relative">
      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideLeft {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-slideLeft {
          animation: slideLeft 0.6s ease-out forwards;
        }

        /* Custom mobile scrollbar */
        @media (max-width: 640px) {
          ::-webkit-scrollbar {
            width: 2px;
          }
        }
      `}</style>

      <div className="container mx-auto px-3 sm:px-6 py-4 sm:py-8">
        {/* Clean Header - Mobile Optimized */}
        <div className="fixed left-0 right-0 top-0 z-50">
          <nav
            className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-3 sm:p-6 
        bg-[#F5F2EF] backdrop-blur-md border-b border-white/20 ${
          isScrolled ? "py-1 sm:py-1" : "py-2 sm:py-2"
        }`}
          >
            <a href="/">
              <img
                className={`${
                  isScrolled ? "sm:w-16 w-14" : "sm:w-24 w-20"
                } transition-all duration-200`}
                src={isScrolled ? Logo : LogoTCC}
                alt="Logo"
              />
            </a>
            <div className="text-xs sm:text-sm text-stone-500">Coming Soon</div>
          </nav>
        </div>
        {/* Hero Section - Mobile Optimized */}
        <header className="text-center sm:mt-40 mt-32 mb-16 sm:mb-24 min-h-[60vh] sm:min-h-[70vh] flex flex-col justify-center">
          <div
            className={`transition-all duration-800 ${
              heroLoaded ? "animate-fadeInUp" : "opacity-0 translate-y-4"
            }`}
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-light text-stone-800 mb-6 sm:mb-8 leading-tight px-4">
              Curated Fashion
              <br />
              <span className="font-medium text-[#ED9449]">
                From Influencers
              </span>
            </h1>

            <div
              className={`transition-all duration-800 delay-300 ${
                heroLoaded ? "animate-fadeInUp" : "opacity-0 translate-y-4"
              }`}
            >
              <p className="text-base sm:text-xl text-stone-600 max-w-xl sm:max-w-2xl mx-auto leading-relaxed mb-12 sm:mb-16 font-light px-1">
                Shop pre-loved fashion from your favorite creators. Authentic
                pieces, affordable prices, exclusive access.
              </p>
            </div>

            {/* Clean Countdown - Mobile First */}
            <div
              className={`bg-[#F5F2EF] rounded-xl sm:rounded-2xl p-6 sm:p-10 mb-12 sm:mb-20 border border-stone-200 shadow-sm transition-all duration-800  ${
                swipeRevealed
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <h2 className="text-lg sm:text-2xl font-light text-center mb-6 sm:mb-8 text-stone-700">
                Launch Countdown
              </h2>
              <div className="flex justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                <FlipNumber number={countdown.days} label="Days" />
                <FlipNumber number={countdown.hours} label="Hours" />
                <FlipNumber number={countdown.minutes} label="Minutes" />
              </div>
              <p className="text-center text-stone-500 text-xs sm:text-sm px-4">
                Be among the first to access exclusive collections
              </p>
            </div>

            {/* Premium Waitlist - Mobile Optimized */}
            <div
              className={`transition-all duration-800 ${
                waitlistRevealed
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="bg-[#2E2D2c] rounded-xl sm:rounded-2xl p-6 sm:p-12 text-center shadow-lg relative overflow-hidden">
                {/* Floating Fashion Icons Background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {/* Top Row Icons */}
                  <div
                    className="absolute top-4 left-4 opacity-10 "
                    style={{ animationDelay: "0s" }}
                  >
                    <svg
                      className="w-6 h-6 sm:w-8 sm:h-8 text-[#ED9449] animate-pulse"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>

                  <div
                    className="absolute top-6 right-8 opacity-15 rotate-12"
                    style={{ animationDelay: "1s" }}
                  >
                    <svg
                      className="w-5 h-5 sm:w-7 sm:h-7 text-[#ED9449] animate-pulse"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>

                  {/* Middle Icons */}
                  <div
                    className="absolute top-16 left-16 sm:left-24 opacity-12 -rotate-6"
                    style={{ animationDelay: "2s" }}
                  >
                    <svg
                      className="w-7 h-7 sm:w-10 sm:h-10 text-[#ED9449] animate-pulse"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  </div>

                  <div
                    className="absolute top-12 right-4 opacity-8 rotate-45"
                    style={{ animationDelay: "3s" }}
                  >
                    <svg
                      className="w-4 h-4 sm:w-6 sm:h-6 text-[#ED9449] animate-pulse"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                    </svg>
                  </div>

                  {/* Dress Icon */}
                  <div
                    className="absolute bottom-20 left-6 opacity-10 rotate-12"
                    style={{ animationDelay: "4s" }}
                  >
                    <svg
                      className="w-6 h-6 sm:w-8 sm:h-8 text-[#ED9449] animate-pulse"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10l2 4v14a1 1 0 01-1 1H6a1 1 0 01-1-1V8l2-4z"
                      />
                    </svg>
                  </div>

                  {/* Shoe Icon */}
                  <div
                    className="absolute bottom-16 right-8 opacity-12 -rotate-12"
                    style={{ animationDelay: "5s" }}
                  >
                    <svg
                      className="w-8 h-8 sm:w-10 sm:h-10 text-[#ED9449] animate-pulse"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M2 18h20l-2-6H8l-2-6H4l-2 6v6z"
                      />
                    </svg>
                  </div>

                  {/* T-shirt Icon */}
                  <div
                    className="absolute bottom-32 left-20 sm:left-32 opacity-8 rotate-6"
                    style={{ animationDelay: "6s" }}
                  >
                    <svg
                      className="w-5 h-5 sm:w-7 sm:h-7 text-[#ED9449] animate-pulse"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 2h8l4 4v2l-2 2v12H6V10L4 8V6l4-4z"
                      />
                    </svg>
                  </div>

                  {/* Hat Icon */}
                  <div
                    className="absolute bottom-24 right-16 sm:right-24 opacity-10 -rotate-6"
                    style={{ animationDelay: "7s" }}
                  >
                    <svg
                      className="w-6 h-6 sm:w-8 sm:h-8 text-[#ED9449] animate-pulse"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M6 18h12c1.1 0 2-.9 2-2v-2c0-4.42-3.58-8-8-8s-8 3.58-8 8v2c0 1.1.9 2 2 2z"
                      />
                    </svg>
                  </div>

                  {/* Sunglasses Icon */}
                  <div
                    className="absolute top-24 left-8 opacity-12 rotate-45"
                    style={{ animationDelay: "8s" }}
                  >
                    <svg
                      className="w-5 h-5 sm:w-7 sm:h-7 text-[#ED9449] animate-pulse"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 12a4 4 0 018 0m0 0a4 4 0 018 0m-8 0V8"
                      />
                    </svg>
                  </div>

                  {/* Watch Icon */}
                  <div
                    className="absolute top-20 right-20 sm:right-28 opacity-8 -rotate-12"
                    style={{ animationDelay: "9s" }}
                  >
                    <svg
                      className="w-4 h-4 sm:w-6 sm:h-6 text-[#ED9449] animate-pulse"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>

                {/* Content with higher z-index */}
                <div className="relative z-10">
                  <h2 className="text-xl sm:text-3xl font-light mb-2 sm:mb-4 text-[#F5F2EF]">
                    Join the Waitlist
                  </h2>
                  <p className="text-[#c7c4c1] mb-6 sm:mb-8 text-sm sm:text-lg font-light px-2">
                    Get early access when we launch in September
                  </p>

                  <div className="max-w-sm sm:max-w-md mx-auto">
                    <div className="flex flex-col gap-3">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-lg bg-[#2E2D2c] border border-white/20 text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-300 text-sm sm:text-base backdrop-blur-sm"
                        onKeyDown={(e) =>
                          e.key === "Enter" && handleEmailSubmit()
                        }
                      />
                      <button
                        onClick={handleEmailSubmit}
                        className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-[#ED9449] text-stone-800 rounded-lg font-medium hover:bg-[#F5F2EF] active:bg-[#c9c7c4] transform hover:scale-[1.02] transition-all duration-300 text-sm sm:text-base shadow-lg"
                      >
                        Join Waitlist
                      </button>
                    </div>
                  </div>

                  {isSubmitted && (
                    <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-green-500/20 border border-green-400/30 rounded-lg mx-2 backdrop-blur-sm">
                      <p className="text-green-300 font-medium text-sm">
                        Welcome to the waitlist! We'll notify you at launch.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Launch Information - Mobile Optimized */}
            <div className="text-center my-10 sm:my-20">
              <div className="inline-block bg-stone-700 text-[#F5F2EF] px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium">
                Launching September 2025 • Pakistan
              </div>
            </div>

            {/* Minimal Scroll Indicator */}
            <div className="mt-12 sm:mt-20">
              <div className="w-px h-6 sm:h-8 bg-gradient-to-b from-stone-300 to-transparent mx-auto"></div>
            </div>
          </div>
        </header>

        {/* Trust Building Section - Mobile Optimized */}
        <div
          className={`text-center mb-16 sm:mb-20 transition-all duration-800 mx-2 ${
            swipeRevealed
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-light text-stone-700 mb-6 sm:mb-8 px-4">
              Why The Clout Closet?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              <div className="p-4 sm:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-stone-200 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-stone-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-medium text-[#ED9449] mb-2 text-sm sm:text-base">
                  Authenticated
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm">
                  Every piece verified for authenticity
                </p>
              </div>
              <div className="p-4 sm:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-stone-200 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-stone-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="font-medium text-[#ED9449] mb-2 text-sm sm:text-base">
                  Exclusive
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm">
                  Limited access, curated selection
                </p>
              </div>
              <div className="p-4 sm:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-stone-200 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-stone-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="font-medium text-[#ED9449] mb-2 text-sm sm:text-base">
                  Sustainable
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm">
                  Pre-loved fashion, reduced waste
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Influencer Preview - Mobile Optimized */}
        <div
          className={`mb-16 sm:mb-20 transition-all duration-800 mx-2 ${
            swipeRevealed
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <div className="bg-[#F5F2EF] rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm">
            <h3 className="text-lg sm:text-xl font-medium text-center mb-4 sm:mb-6 text-stone-700">
              Featured Creators
            </h3>
            <div className="flex justify-center space-x-3 sm:space-x-4">
              {[1, 2, 3, 4].map((_, index) => (
                <div
                  key={index}
                  className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-stone-200 to-stone-300 transition-all duration-500 ${
                    index === currentInfluencer
                      ? "scale-110 opacity-100"
                      : "scale-100 opacity-60"
                  }`}
                ></div>
              ))}
            </div>
            <p className="text-center text-stone-500 text-sm sm:text-base mt-3 sm:mt-4">
              And many more coming soon...
            </p>
          </div>
        </div>

        {/* Minimalist Closet Interaction - Mobile Optimized */}

        {/* Professional Social Links - Mobile Optimized */}
        <div className="text-center mb-12 sm:mb-16 mx-2">
          <div className="flex flex-col gap-3 sm:gap-4">
            <a
              href="https://instagram.com/thecloutcloset"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-4 sm:px-6 py-3 bg-stone-100 text-stone-700 rounded-lg font-medium hover:bg-stone-200 transition-all duration-300 border border-stone-200 text-sm sm:text-base"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.404-5.946 1.404-5.946s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.015-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.017.001z" />
              </svg>
              Follow @thecloutcloset
            </a>
            <a
              href="#"
              onClick={() => {
                const message = encodeURIComponent(
                  "Hi! I'm interested in The Clout Closet launch."
                );
                window.open(`https://wa.me/?text=${message}`, "_blank");
              }}
              className="inline-flex items-center justify-center gap-3 px-4 sm:px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all duration-300 text-sm sm:text-base"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.567-.01-.197 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
              </svg>
              Contact Us
            </a>
          </div>
        </div>
      </div>

      {/* Clean Footer */}
      <footer className="text-center py-6 sm:py-8 border-t border-stone-200">
        <div className="text-stone-400 text-xs sm:text-sm px-4">
          © 2025 The Clout Closet. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default CloutClosetLanding;
