
import React from 'react';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden px-4 pt-20 pb-10">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
      
      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center animate-fade-in">
        <div className="inline-flex items-center justify-center p-1 px-3 mb-6 border rounded-full bg-muted/30 text-sm font-medium text-muted-foreground backdrop-blur-sm">
          <AlertTriangle className="h-3.5 w-3.5 mr-2 text-disaster-red" />
          <span>AI-powered disaster management platform</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Real-time disaster intelligence for a 
          <span className="text-disaster-blue block mt-2">safer tomorrow</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
          DisasterScope combines AI, real-time data, and advanced analytics to 
          provide critical disaster information, risk prediction, and emergency assistance.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/map"
            className="inline-flex items-center justify-center px-6 py-3 bg-disaster-blue text-white rounded-lg font-medium hover:bg-disaster-blue/90 transition-all shadow-button"
          >
            View Live Map
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          
          <Link
            to="/chat"
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-foreground border rounded-lg font-medium hover:bg-muted/10 transition-all shadow-button"
          >
            Emergency AI Chat
          </Link>
        </div>
      </div>
      
      {/* Stats section */}
      <div className="w-full max-w-5xl mx-auto mt-24 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        <div className="relative p-6 rounded-2xl backdrop-blur-sm bg-white/5 border border-white/10 overflow-hidden animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-disaster-red/5 rounded-full blur-3xl"></div>
          <h3 className="text-3xl md:text-4xl font-bold mb-1">73+</h3>
          <p className="text-muted-foreground">Active disaster zones monitored</p>
        </div>
        
        <div className="relative p-6 rounded-2xl backdrop-blur-sm bg-white/5 border border-white/10 overflow-hidden animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-disaster-blue/5 rounded-full blur-3xl"></div>
          <h3 className="text-3xl md:text-4xl font-bold mb-1">99.8%</h3>
          <p className="text-muted-foreground">Alert accuracy rate</p>
        </div>
        
        <div className="relative p-6 rounded-2xl backdrop-blur-sm bg-white/5 border border-white/10 overflow-hidden animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
          <h3 className="text-3xl md:text-4xl font-bold mb-1">500K+</h3>
          <p className="text-muted-foreground">People received timely alerts</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
