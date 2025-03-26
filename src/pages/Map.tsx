
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import DisasterMap from '@/components/DisasterMap';
import { Filter, MapIcon, Layers, Search, AlertTriangle, CloudRain, Wind, Flame } from 'lucide-react';

const MapPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-20 pb-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center mb-2">
              <MapIcon className="h-5 w-5 mr-2 text-disaster-blue" />
              <h1 className="text-2xl font-bold">Live Disaster Map</h1>
            </div>
            <p className="text-muted-foreground">
              Real-time visualization of active disasters and affected areas worldwide
            </p>
          </div>
          
          {/* Map Controls */}
          <div className="mb-6 flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            {/* Search */}
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for location or disaster"
                className="w-full rounded-lg border bg-background pl-10 pr-3 py-2.5 text-sm"
              />
            </div>
            
            {/* Filter Controls */}
            <div className="flex space-x-2">
              <button className="inline-flex items-center px-3 py-2 bg-muted/50 hover:bg-muted/70 transition-colors rounded-lg text-sm font-medium">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </button>
              
              <button className="inline-flex items-center px-3 py-2 bg-muted/50 hover:bg-muted/70 transition-colors rounded-lg text-sm font-medium">
                <Layers className="h-4 w-4 mr-2" />
                Layers
              </button>
            </div>
          </div>
          
          {/* Filter Pills */}
          <div className="mb-6 flex flex-wrap gap-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <button className="inline-flex items-center px-3 py-1.5 bg-disaster-red/10 text-disaster-red rounded-full text-xs font-medium">
              <Flame className="h-3 w-3 mr-1.5" />
              Wildfires
              <span className="ml-1.5 rounded-full bg-disaster-red text-white w-4 h-4 flex items-center justify-center text-[10px]">
                9
              </span>
            </button>
            
            <button className="inline-flex items-center px-3 py-1.5 bg-disaster-blue/10 text-disaster-blue rounded-full text-xs font-medium">
              <CloudRain className="h-3 w-3 mr-1.5" />
              Floods
              <span className="ml-1.5 rounded-full bg-disaster-blue text-white w-4 h-4 flex items-center justify-center text-[10px]">
                5
              </span>
            </button>
            
            <button className="inline-flex items-center px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-medium">
              <Wind className="h-3 w-3 mr-1.5" />
              Hurricanes
              <span className="ml-1.5 rounded-full bg-primary text-white w-4 h-4 flex items-center justify-center text-[10px]">
                3
              </span>
            </button>
            
            <button className="inline-flex items-center px-3 py-1.5 bg-muted rounded-full text-muted-foreground text-xs font-medium">
              <AlertTriangle className="h-3 w-3 mr-1.5" />
              Other
              <span className="ml-1.5 rounded-full bg-muted-foreground/70 text-white w-4 h-4 flex items-center justify-center text-[10px]">
                7
              </span>
            </button>
            
            <button className="inline-flex items-center px-3 py-1.5 bg-muted/50 text-muted-foreground rounded-full text-xs font-medium">
              All Disasters
            </button>
            
            <button className="inline-flex items-center px-3 py-1.5 bg-muted/50 text-muted-foreground rounded-full text-xs font-medium">
              Last 24 hours
            </button>
          </div>
          
          {/* Main Map */}
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <DisasterMap />
          </div>
          
          {/* Map Legend and Info Panel */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            {/* Stats Cards */}
            <div className="col-span-1 lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border bg-card">
                <div className="text-lg font-bold text-disaster-red">24</div>
                <div className="text-sm text-muted-foreground">Active wildfires</div>
              </div>
              
              <div className="p-4 rounded-xl border bg-card">
                <div className="text-lg font-bold text-disaster-blue">12</div>
                <div className="text-sm text-muted-foreground">Flood zones</div>
              </div>
              
              <div className="p-4 rounded-xl border bg-card">
                <div className="text-lg font-bold">2.3M</div>
                <div className="text-sm text-muted-foreground">People in affected areas</div>
              </div>
            </div>
            
            {/* Information Panel */}
            <div className="col-span-1 p-4 rounded-xl border bg-card space-y-3">
              <h3 className="font-medium">About This Data</h3>
              <p className="text-xs text-muted-foreground">
                Disaster data is sourced from NASA FIRMS, USGS, OpenWeatherMap, and FEMA. Updates occur every 15 minutes.
              </p>
              <div className="pt-2">
                <button className="text-xs text-primary hover:underline">
                  Learn more about our data sources
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MapPage;
