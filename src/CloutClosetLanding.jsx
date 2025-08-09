import React, { useState, useEffect, useRef } from "react";
import Logo from "./assets/Logo.png";
import LogoTCC from "./assets/Logo-TCC.png";
import img1 from "./assets/hania.jpg";
import img2 from "./assets/nimal.jpg";
import img3 from "./assets/meerub.jpg";
import img4 from "./assets/fahad.jpg";
import heroImg from "./assets/hero-img.jpg";

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
  const [featuredVisible, setFeaturedVisible] = useState(false);
  const [bottomVisible, setBottomVisible] = useState(false);

  const swipeRef = useRef(null);
  const featuredRef = useRef(null);
  const bottomRef = useRef(null);

  const featuredImages = [img1, img2, img3, img4];

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

      if (scrollY > windowHeight * 0.3) {
        setWaitlistRevealed(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id === "featured-section")
              setFeaturedVisible(true);
            if (entry.target.id === "bottom-section") setBottomVisible(true);
          }
        });
      },
      { threshold: 0.2 } // reveal when 20% visible
    );

    if (featuredRef.current) observer.observe(featuredRef.current);
    if (bottomRef.current) observer.observe(bottomRef.current);

    return () => observer.disconnect();
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
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleEmailSubmit = () => {
    if (email && !emailList.includes(email)) {
      setEmailList((prev) => [...prev, email]);
      setIsSubmitted(true);
      setEmail("");

      // Mock Google Sheets submission (keeping original functionality)
      fetch(
        "https://script.google.com/macros/s/AKfycbxOY8N6ugpwxkm_chfyeXdDYi8NmwFyplH01Nh865SYkcVgW7f5VY1J4HE6oscetiX1/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  // Logo component (placeholder for actual images)
  // const LogoComponent = ({ type, className }) => (
  //   <div className={`flex items-center ${className}`}>
  //     <div className="flex items-center">
  //       <div className="w-8 h-8 sm:w-10 sm:h-10 mr-2">
  //         <img src={LogoTCC} alt="" />
  //       </div>
  //     </div>
  //   </div>
  // );

  const FlipNumber = ({ number, label, className }) => (
    <div
      className={`${className} backdrop-blur-sm sm:rounded-xl rounded-lg py-3 px-2 sm:py-4 sm:px-3 text-center min-w-[70px] sm:min-w-[90px] shadow-sm `}
    >
      <div className="text-5xl sm:text-7xl  mb-1">
        {number < 10 ? `0${number}` : number}
      </div>
      <div className={`text-xs uppercase tracking-wider font-medium `}>
        {label}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F5F2EF] text-[#2E2D2C] overflow-hidden">
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

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        /* Gradient background */
        .hero-gradient {
          background: linear-gradient(135deg, #f5f2ef 0%, #e8e3df 100%);
        }

        .card-shadow {
          box-shadow: 0 4px 20px rgba(46, 45, 44, 0.1);
        }
      `}</style>

      {/* Hero Section with centered logo and content */}
      <div className="hero-gradient" style={{ fontFamily: "inter" }}>
        {/* Header - minimized */}
        {/* <div className="flex justify-between items-center p-4 sm:p-6">
          <div className="text-xs sm:text-sm text-gray-500">Coming Soon</div>
          <div className="text-xs sm:text-sm text-gray-500">Pakistan</div>
        </div>
 */}
        {/* Logo */}

        {/* <div
          className={`my-3 sm:my-6 transition-all duration-800 flex justify-center items-center w-full ${
            heroLoaded ? "animate-fadeInUp" : "opacity-0 translate-y-4"
          }`}
        >
          <img className="sm:w-34 w-24" src={LogoTCC} alt="" />{" "}
        </div> */}

        {/* Main heading */}
        <div className="relative w-full">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center blur-xs overflow-hidden"
            style={{
              backgroundImage: `url(${heroImg})`, // replace with your image
            }}
          ></div>

          {/* Top Logo Section (no overlay) */}
          <div className="relative flex justify-center items-center sm:py-4 py-3 bg-[#F5F2EF]/50 ">
            <img
              src={LogoTCC}
              alt="The Clout Closet"
              className="w-[106px] sm:w-40"
            />
          </div>

          {/* Dark Overlay Section for Text */}
          <div className="relative bg-[#2E2D2C]/90 py-12 flex flex-col items-center text-center px-2">
            <h1
              className="text-4xl sm:text-6xl font-serif text-[#ED9449] mb-2"
              style={{ fontFamily: "Playfair Display" }}
            >
              COMING SOON!
            </h1>
            <p className="text-sm sm:text-xl text-[#F5F2EF] max-w-3xl mx-auto">
              Shop your favourite influencer's closets — pre-loved fashion at
              your fingertips.
            </p>
          </div>
        </div>
        {/* Main centered content */}

        <div className=" py-4 sm:py-8 text-center mx-auto max-w-6xl">
          {/* Countdown */}
          <div
            className={`mb-12 sm:mb-16 transition-all duration-800 delay-400 px-3 sm:px-6 ${
              heroLoaded ? "animate-fadeInUp" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="bg-[F5F2EF] backdrop-blur-sm rounded-[14px] sm:rounded-3xl px-2 sm:px-3 py-6 sm:py-8 border border-gray-300">
              <h2
                className="text-xl sm:text-2xl font-serif mb-6 text-[#2E2D2C]"
                style={{ fontFamily: "Playfair Display" }}
              >
                Launching in:
              </h2>
              <div className="flex justify-center gap-3 sm:gap-4">
                <FlipNumber
                  className={`bg-[#F5F2EF] text-[#2E2D2C] border border-gray-700`}
                  number={countdown.days}
                  label="Days"
                />
                <FlipNumber
                  className={`bg-[#2E2D2C] text-[#ED9449]`}
                  number={countdown.hours}
                  label="Hrs"
                  theme="dark"
                />
                <FlipNumber
                  className={`bg-[#ED9449] text-[#F5F2EF]`}
                  number={countdown.minutes}
                  label="Mins"
                />
              </div>
              <div className="mt-6">
                <p className="text-[#2E2D2C] text-lg mb-2">
                  Be the first to shop the drop!
                </p>
                <p className="text-sm text-gray-600 leading-relaxed ">
                  An exclusive platform where you can snag the pre-loved fits of
                  top influencers — dresses, shoes, bags & more.
                </p>
              </div>
            </div>
          </div>

          {/* Waitlist Section */}
          <div
            className={`transition-all duration-800 px-6 sm:px-10 md:px-16 lg:px-20 ${
              waitlistRevealed
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="bg-[#2E2D2c] rounded-[14px] md:rounded-3xl py-5 px-6 md:py-9 md:px-12 text-center relative overflow-hidden shadow-[8px_8px_15px_rgba(0,0,0,0.7)]">
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
                <h2 className="text-xl sm:text-3xl font-light mb-1 sm:mb-2 text-[#F5F2EF]">
                  Join the Waitlist
                </h2>
                <p className="text-[#c7c4c1] mb-6 sm:mb-8 text-sm sm:text-lg font-light px-2 sm:px-3">
                  Get early access + be notified when we go live.
                </p>

                <div className="max-w-sm sm:max-w-md mx-auto">
                  <div className="flex flex-col gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-lg bg-[#2E2D2c] border border-white/20 text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent text-sm sm:text-base backdrop-blur-sm"
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

          {/* Featured Creators */}
          <div
            id="featured-section"
            ref={featuredRef}
            className={`mt-12 sm:mt-16 transition-all duration-800  ${
              featuredVisible ? "animate-fadeInUp" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="flex flex-col items-center">
              <img className="sm:w-24 w-20" src={Logo} alt="" />
              <h3 className="text-lg sm:text-xl font-bold text-[#2E2D2C] mb-6">
                Featured Creators
              </h3>

              {/* Creators List */}
              <div className="flex justify-center space-x-3 sm:space-x-4 mb-4">
                {featuredImages.map((image, index) => (
                  <div
                    key={index}
                    className={`shadow-[5px_5px_10px_rgba(0,0,0,0.6)] relative w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden transition-all duration-500 ${
                      index === currentInfluencer
                        ? "scale-110 opacity-100 "
                        : "scale-100 opacity-80"
                    }`}
                  >
                    {/* Blurred Image */}
                    <img
                      src={image} // replace with your actual image paths
                      alt={`Creator ${index + 1}`}
                      className="w-full h-full object-cover blur-xs"
                      draggable="false"
                      onContextMenu={(e) => e.preventDefault()}
                    />
                  </div>
                ))}
              </div>

              <p className="text-gray-500 text-sm sm:text-base">
                And many more coming soon...
              </p>
            </div>
          </div>

          {/* Bottom section */}
          <div
            id="bottom-section"
            ref={bottomRef}
            className={`mt-16 sm:mt-20 pb-8 transition-all duration-800 delay-400 px-3 sm:px-6 ${
              bottomVisible ? "animate-fadeInUp" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="bg-[F5F2EF] backdrop-blur-sm rounded-[14px] sm:rounded-3xl p-6 sm:p-8 border border-gray-300">
              <h2
                className="text-2xl sm:text-3xl font-serif text-[#2E2D2C] mb-5"
                style={{ fontFamily: "Playfair Display" }}
              >
                Going Live in September 2025!
              </h2>
              <p className="text-[#2E2D2C] mb-3">
                Got a question? Get in touch:
              </p>

              <div className="flex gap-3 justify-center items-center">
                <a
                  href="mailto:hello.cloutcloset@gmail.com"
                  className="inline-flex items-center justify-center gap-2 w-8 h-8  bg-[#2E2D2C] text-[#F5F2EF] rounded-full font-medium hover:opacity-90 transition-all duration-300 text-sm"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/cloutcloset.official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-8 h-8  bg-[#2E2D2C] text-[#F5F2EF] rounded-full font-medium hover:opacity-90 transition-all duration-300 text-sm"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="#"
                  onClick={() => {
                    const message = encodeURIComponent(
                      "Hi! I'm interested in The Clout Closet launch."
                    );
                    window.open(
                      `https://wa.me/923343873622?text=${message}`,
                      "_blank"
                    );
                  }}
                  className="inline-flex items-center justify-center gap-2 w-8 h-8 bg-[#2E2D2C] text-[#F5F2EF] rounded-full font-medium hover:opacity-90 transition-all duration-300 text-sm"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.567-.01-.197 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-[#2E2D2C] text-center py-6 sm:py-8 border-t border-stone-200">
        <div className="text-[#f5f2ef]  text-xs sm:text-sm px-4">
          © 2025 The Clout Closet. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default CloutClosetLanding;
