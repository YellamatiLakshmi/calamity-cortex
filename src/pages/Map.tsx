
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import MapboxMap, { DisasterEvent } from '@/components/MapboxMap';
import { Filter, MapIcon, Layers, Search, AlertTriangle, CloudRain, Wind, Flame } from 'lucide-react';
import { toast } from "sonner";

const MapPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [disasters, setDisasters] = useState<DisasterEvent[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [selectedFilters, setSelectedFilters] = useState<{
    types: string[];
    timeframe: string;
  }>({
    types: [],
    timeframe: 'all'
  });

  // Simulated disaster data
  useEffect(() => {
    const fetchDisasters = async () => {
      setLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Generate simulated disaster data
        const mockDisasters: DisasterEvent[] = [
          {
            id: '1',
            type: 'wildfire',
            location: 'Sierra Nevada, California',
            coordinates: { lat: 37.8651, lon: -119.5383 },
            severity: 'high',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
          },
          {
            id: '2',
            type: 'wildfire',
            location: 'San Bernardino, California',
            coordinates: { lat: 34.1083, lon: -117.2898 },
            severity: 'medium',
            timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000) // 6 hours ago
          },
          {
            id: '3',
            type: 'flood',
            location: 'New Orleans, Louisiana',
            coordinates: { lat: 29.9511, lon: -90.0715 },
            severity: 'critical',
            timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000) // 3 hours ago
          },
          {
            id: '4',
            type: 'flood',
            location: 'Houston, Texas',
            coordinates: { lat: 29.7604, lon: -95.3698 },
            severity: 'medium',
            timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000) // 10 hours ago
          },
          {
            id: '5',
            type: 'hurricane',
            location: 'Miami, Florida',
            coordinates: { lat: 25.7617, lon: -80.1918 },
            severity: 'critical',
            timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000) // 5 hours ago
          },
          {
            id: '6',
            type: 'hurricane',
            location: 'Jacksonville, Florida',
            coordinates: { lat: 30.3322, lon: -81.6557 },
            severity: 'high',
            timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000) // 8 hours ago
          },
          {
            id: '7',
            type: 'earthquake',
            location: 'San Francisco, California',
            coordinates: { lat: 37.7749, lon: -122.4194 },
            severity: 'medium',
            timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000) // 12 hours ago
          },
          {
            id: '8',
            type: 'earthquake',
            location: 'Seattle, Washington',
            coordinates: { lat: 47.6062, lon: -122.3321 },
            severity: 'low',
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000) // 24 hours ago
          },
          {
            id: '9',
            type: 'other',
            location: 'Phoenix, Arizona',
            coordinates: { lat: 33.4484, lon: -112.0740 },
            severity: 'medium',
            timestamp: new Date(Date.now() - 15 * 60 * 60 * 1000) // 15 hours ago
          }
        ];
        
        setDisasters(mockDisasters);
        toast.success('Disaster data loaded successfully');
      } catch (error) {
        console.error('Error fetching disaster data:', error);
        toast.error('Failed to load disaster data');
        
        // Set empty array in case of error
        setDisasters([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDisasters();
  }, []);

  // Filter disasters based on search text and selected filters
  const filteredDisasters = disasters.filter(disaster => {
    // Filter by search text
    if (searchText && !disaster.location.toLowerCase().includes(searchText.toLowerCase())) {
      return false;
    }
    
    // Filter by disaster type
    if (selectedFilters.types.length > 0 && !selectedFilters.types.includes(disaster.type)) {
      return false;
    }
    
    // Filter by timeframe
    if (selectedFilters.timeframe === '24h') {
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      if (disaster.timestamp < twentyFourHoursAgo) {
        return false;
      }
    }
    
    return true;
  });

  // Count disasters by type
  const disasterCounts = {
    wildfire: disasters.filter(d => d.type === 'wildfire').length,
    flood: disasters.filter(d => d.type === 'flood').length,
    hurricane: disasters.filter(d => d.type === 'hurricane').length,
    other: disasters.filter(d => d.type === 'other' || d.type === 'earthquake').length
  };

  // Handle filter toggles
  const toggleTypeFilter = (type: string) => {
    setSelectedFilters(prev => {
      const types = prev.types.includes(type) 
        ? prev.types.filter(t => t !== type) 
        : [...prev.types, type];
      return { ...prev, types };
    });
  };

  const setTimeframeFilter = (timeframe: string) => {
    setSelectedFilters(prev => ({ ...prev, timeframe }));
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedFilters({ types: [], timeframe: 'all' });
    setSearchText('');
  };

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
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            
            {/* Filter Controls */}
            <div className="flex space-x-2">
              <button 
                className="inline-flex items-center px-3 py-2 bg-muted/50 hover:bg-muted/70 transition-colors rounded-lg text-sm font-medium"
                onClick={clearFilters}
              >
                <Filter className="h-4 w-4 mr-2" />
                Clear Filters
              </button>
              
              <button className="inline-flex items-center px-3 py-2 bg-muted/50 hover:bg-muted/70 transition-colors rounded-lg text-sm font-medium">
                <Layers className="h-4 w-4 mr-2" />
                Layers
              </button>
            </div>
          </div>
          
          {/* Filter Pills */}
          <div className="mb-6 flex flex-wrap gap-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <button 
              className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${
                selectedFilters.types.includes('wildfire') 
                  ? 'bg-disaster-red text-white' 
                  : 'bg-disaster-red/10 text-disaster-red'
              }`}
              onClick={() => toggleTypeFilter('wildfire')}
            >
              <Flame className="h-3 w-3 mr-1.5" />
              Wildfires
              <span className="ml-1.5 rounded-full bg-white/20 text-white w-4 h-4 flex items-center justify-center text-[10px]">
                {disasterCounts.wildfire}
              </span>
            </button>
            
            <button 
              className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${
                selectedFilters.types.includes('flood') 
                  ? 'bg-disaster-blue text-white' 
                  : 'bg-disaster-blue/10 text-disaster-blue'
              }`}
              onClick={() => toggleTypeFilter('flood')}
            >
              <CloudRain className="h-3 w-3 mr-1.5" />
              Floods
              <span className="ml-1.5 rounded-full bg-white/20 text-white w-4 h-4 flex items-center justify-center text-[10px]">
                {disasterCounts.flood}
              </span>
            </button>
            
            <button 
              className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${
                selectedFilters.types.includes('hurricane') 
                  ? 'bg-primary text-white' 
                  : 'bg-primary/10 text-primary'
              }`}
              onClick={() => toggleTypeFilter('hurricane')}
            >
              <Wind className="h-3 w-3 mr-1.5" />
              Hurricanes
              <span className="ml-1.5 rounded-full bg-white/20 text-white w-4 h-4 flex items-center justify-center text-[10px]">
                {disasterCounts.hurricane}
              </span>
            </button>
            
            <button 
              className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${
                selectedFilters.types.includes('earthquake') || selectedFilters.types.includes('other')
                  ? 'bg-muted-foreground text-white' 
                  : 'bg-muted'
              }`}
              onClick={() => {
                toggleTypeFilter('earthquake');
                toggleTypeFilter('other');
              }}
            >
              <AlertTriangle className="h-3 w-3 mr-1.5" />
              Other
              <span className="ml-1.5 rounded-full bg-white/20 text-white w-4 h-4 flex items-center justify-center text-[10px]">
                {disasterCounts.other}
              </span>
            </button>
            
            <button 
              className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${
                selectedFilters.timeframe === 'all' 
                  ? 'bg-muted-foreground/70 text-white' 
                  : 'bg-muted/50 text-muted-foreground'
              }`}
              onClick={() => setTimeframeFilter('all')}
            >
              All Disasters
            </button>
            
            <button 
              className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${
                selectedFilters.timeframe === '24h' 
                  ? 'bg-muted-foreground/70 text-white' 
                  : 'bg-muted/50 text-muted-foreground'
              }`}
              onClick={() => setTimeframeFilter('24h')}
            >
              Last 24 hours
            </button>
          </div>
          
          {/* Main Map */}
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <MapboxMap disasters={filteredDisasters} loading={loading} />
          </div>
          
          {/* Map Legend and Info Panel */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            {/* Stats Cards */}
            <div className="col-span-1 lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border bg-card">
                <div className="text-lg font-bold text-disaster-red">{disasterCounts.wildfire}</div>
                <div className="text-sm text-muted-foreground">Active wildfires</div>
              </div>
              
              <div className="p-4 rounded-xl border bg-card">
                <div className="text-lg font-bold text-disaster-blue">{disasterCounts.flood}</div>
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
