import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AcademicCapIcon, HomeIcon } from '@heroicons/react/24/outline';

export default function AuthLayout() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const location = useLocation();
  
  const slides = [
    {
      image: '/img/2.jpg',
      title: 'A better Future',
      description: 'Transform your educational journey with our comprehensive learning platform'
    },
    {
      image: '/img/3.jpg', 
      title: 'Unlock boundless Opportunities',
      description: 'Discover new possibilities and expand your horizons with quality education'
    },
    {
      image: '/img/4.jpg',
      title: 'Discover our courses',
      description: 'Explore diverse programs designed to enhance your skills and knowledge'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)' }}>
      {/* Global Navigation Header */}
      <nav className="w-full bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand */}
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/favicon.ico" 
                alt="JDI Logo"
                className="w-12 h-12 object-contain bg-white/25 rounded-full p-1.5 shadow-sm"
              />
              <span className="text-white font-bold text-xl">JDI</span>
            </Link>
            
            {/* Navigation Links */}
            <div className="flex items-center space-x-6">
              <Link 
                to="/" 
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  location.pathname === '/' 
                    ? 'bg-white/20 text-white' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <HomeIcon className="w-4 h-4" />
                <span>Home</span>
              </Link>
              
              <Link 
                to="/admissions" 
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  location.pathname === '/admissions'
                    ? 'bg-white text-red-600 shadow-sm' 
                    : 'bg-white/20 text-white hover:bg-white hover:text-red-600'
                }`}
              >
                <AcademicCapIcon className="w-4 h-4" />
                <span>Apply Now</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex items-center justify-center p-4 min-h-[calc(100vh-4rem)]">
        <div className="w-full max-w-6xl grid md:grid-cols-[45%_55%] bg-white rounded-[3.3rem] shadow-[0_60px_40px_-30px_rgba(178,31,56,0.4)] overflow-hidden min-h-[600px]">
          <div className="flex items-center justify-center p-8 lg:p-12 bg-white">
            <div className="w-full max-w-sm">
              <Outlet />
            </div>
          </div>
          <div className="hidden md:flex flex-col relative overflow-hidden rounded-r-[3.3rem] p-8">
            {/* Carousel Card Container */}
            <div className="flex flex-col bg-white rounded-[1.5rem] shadow-xl overflow-hidden h-full">
              {/* Top Image Section */}
              <div className="relative h-1/2 overflow-hidden rounded-t-[1.5rem]">
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                      index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img 
                      src={slide.image} 
                      alt={slide.title}
                      className="w-full h-full object-cover rounded-t-[1.5rem]"
                    />
                  </div>
                ))}
                
                {/* Logo positioned on image */}
                <div className="absolute bottom-4 right-4">
                  <img 
                    src="/logo.png" 
                    alt="Joadah Design Institute"
                    className="w-12 h-12 object-contain bg-white/95 rounded-lg p-1.5 shadow-sm"
                  />
                </div>
              </div>
            
              {/* Bottom Colored Section */}
              <div className="h-1/2 flex flex-col justify-center items-center py-8 px-6 text-center" style={{ background: 'linear-gradient(135deg, #fce7f3 0%, #f3e8ff 50%, #fef3cd 100%)' }}>
                {/* Sliding Text Content */}
                <div className="mb-6">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 transition-all duration-500">
                    {slides[currentSlide].title}
                  </h2>
                </div>
                
                {/* Navigation Bullets */}
                <div className="flex justify-center space-x-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        index === currentSlide 
                          ? 'bg-gray-900' 
                          : 'bg-gray-400 hover:bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
