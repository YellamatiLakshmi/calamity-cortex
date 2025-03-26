
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X, AlertTriangle, LifeBuoy, Map, MessageSquare, BarChart2, Database } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: AlertTriangle },
    { name: 'Live Map', href: '/map', icon: Map },
    { name: 'AI Chat', href: '/chat', icon: MessageSquare },
    { name: 'Report', href: '/report', icon: LifeBuoy },
    { name: 'Prediction', href: '/prediction', icon: BarChart2 },
    { name: 'Resources', href: '/resources', icon: Database },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md',
        scrollPosition > 10 || isOpen 
          ? 'bg-background/80 shadow-sm' 
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:py-6">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-xl font-semibold"
            >
              <AlertTriangle className="h-6 w-6 text-disaster-red" />
              <span className="animate-fade-in">
                Disaster<span className="text-disaster-blue font-bold">Scope</span>
              </span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'animated-underline py-2 text-sm font-medium transition-colors',
                  location.pathname === item.href
                    ? 'text-foreground after:scale-x-100 after:origin-bottom-left'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          {/* Mobile navigation toggle */}
          <button
            className="md:hidden flex items-center text-muted-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open menu</span>
            {isOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div
        className={cn(
          'md:hidden absolute top-full left-0 right-0 transition-all duration-300 ease-in-out bg-background/95 backdrop-blur-md overflow-hidden border-b',
          isOpen ? 'max-h-[80vh] border-border' : 'max-h-0 border-transparent'
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8 flex flex-col space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'flex items-center space-x-2 px-3 py-4 rounded-md transition-colors',
                location.pathname === item.href
                  ? 'text-primary bg-primary/5'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
              )}
            >
              <item.icon className="h-5 w-5" aria-hidden="true" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
