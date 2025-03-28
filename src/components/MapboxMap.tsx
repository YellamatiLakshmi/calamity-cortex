
import React, { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// Explicitly import the type definitions - this helps TypeScript find them
import '../types/google-maps.d.ts';

// Define disaster event interface
export interface DisasterEvent {
  id: string;
  type: 'wildfire' | 'flood' | 'hurricane' | 'earthquake' | 'other';
  location: string;
  coordinates: {
    lat: number;
    lon: number;
  };
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
}

interface MapboxMapProps {
  disasters: DisasterEvent[];
  loading?: boolean;
}

const MapboxMap: React.FC<MapboxMapProps> = ({ disasters, loading = false }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);
  const markers = useRef<google.maps.Marker[]>([]);
  const [mapInitialized, setMapInitialized] = useState(false);
  const [googleMapsApiKey, setGoogleMapsApiKey] = useState('');
  const [tokenSubmitted, setTokenSubmitted] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  const initializeMap = () => {
    if (!mapContainer.current || map.current || !googleMapsApiKey) return;
    setMapError(null);

    try {
      // Load Google Maps script dynamically
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&callback=initGoogleMap`;
      script.async = true;
      script.defer = true;
      
      // Define the callback function
      window.initGoogleMap = () => {
        try {
          if (!mapContainer.current) return;
          
          map.current = new google.maps.Map(mapContainer.current, {
            center: { lat: 37.0902, lng: -95.7129 }, // Center on US
            zoom: 4,
            styles: [
              { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
              { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
              { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
              {
                featureType: "administrative.locality",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
              },
              {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#17263c" }],
              },
              {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [{ color: "#515c6d" }],
              },
              {
                featureType: "water",
                elementType: "labels.text.stroke",
                stylers: [{ color: "#17263c" }],
              },
            ],
          });

          setMapInitialized(true);
          toast.success('Map loaded successfully');
          
          // Add disaster markers after map is initialized
          addDisasterMarkers();
        } catch (error) {
          console.error('Error initializing Google Map:', error);
          setMapError('Failed to initialize map. Please check your API key and try again.');
          setMapInitialized(false);
          setTokenSubmitted(false);
        }
      };
      
      // Handle script loading error
      script.onerror = () => {
        console.error('Error loading Google Maps script');
        setMapError('Failed to load Google Maps. Please check your API key and try again.');
        setMapInitialized(false);
        setTokenSubmitted(false);
      };
      
      document.head.appendChild(script);

    } catch (error) {
      console.error('Error initializing map:', error);
      setMapError('Failed to initialize map. Please check your Google Maps API key and try again.');
      map.current = null;
      setMapInitialized(false);
      setTokenSubmitted(false);
    }
  };

  // Add disaster markers
  const addDisasterMarkers = () => {
    if (!map.current || !mapInitialized || loading) return;

    // Remove existing markers
    markers.current.forEach(marker => marker.setMap(null));
    markers.current = [];

    // Add new markers for each disaster
    disasters.forEach(disaster => {
      try {
        // Create marker
        const markerSize = getMarkerSize(disaster.severity);
        const markerColor = getMarkerColor(disaster.type);
        
        const marker = new google.maps.Marker({
          position: { lat: disaster.coordinates.lat, lng: disaster.coordinates.lon },
          map: map.current,
          title: disaster.location,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: markerColor,
            fillOpacity: 0.8,
            strokeWeight: 2,
            strokeColor: '#ffffff',
            scale: markerSize / 5, // Scale to appropriate size
          },
          animation: google.maps.Animation.DROP,
        });
        
        // Create info window
        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="font-family: system-ui, sans-serif; padding: 4px;">
              <div style="font-weight: 600; margin-bottom: 4px;">${disaster.location}</div>
              <div style="font-size: 12px; opacity: 0.8;">${capitalizeFirstLetter(disaster.type)}</div>
              <div style="font-size: 12px; opacity: 0.8;">Severity: ${capitalizeFirstLetter(disaster.severity)}</div>
              <div style="font-size: 12px; opacity: 0.8; margin-top: 4px;">${formatDate(disaster.timestamp)}</div>
            </div>
          `
        });
        
        // Add click listener to show info window
        marker.addListener('click', () => {
          infoWindow.open(map.current!, marker);
        });
        
        markers.current.push(marker);
      } catch (error) {
        console.error('Error adding marker:', error);
      }
    });
  };

  // Handle token submission
  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!googleMapsApiKey.trim()) {
      toast.error('Please enter a valid Google Maps API key');
      return;
    }
    
    // Clean up previous map instance if exists
    if (map.current) {
      markers.current.forEach(marker => marker.setMap(null));
      markers.current = [];
      map.current = null;
    }
    
    setTokenSubmitted(true);
    localStorage.setItem('google_maps_api_key', googleMapsApiKey); // Save token for future visits
    initializeMap();
  };

  // Load token from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('google_maps_api_key');
    if (savedToken) {
      setGoogleMapsApiKey(savedToken);
      setTokenSubmitted(true);
    }
  }, []);

  // Initialize map when token is submitted or loaded from storage
  useEffect(() => {
    if (tokenSubmitted && googleMapsApiKey) {
      // Clean up any existing Google Maps script tags
      const existingScripts = document.querySelectorAll('script[src*="maps.googleapis.com/maps/api/js"]');
      existingScripts.forEach(script => script.remove());
      
      initializeMap();
    }
    
    // Cleanup
    return () => {
      markers.current.forEach(marker => marker.setMap(null));
      markers.current = [];
      // Explicitly check if the property exists before deleting it
      if ('initGoogleMap' in window) {
        // Use type assertion to tell TypeScript this property exists
        delete (window as any).initGoogleMap;
      }
    };
  }, [tokenSubmitted, googleMapsApiKey]);

  // Add disaster markers when disasters data or map changes
  useEffect(() => {
    addDisasterMarkers();
  }, [disasters, mapInitialized, loading]);

  // Helper functions
  const getMarkerSize = (severity: DisasterEvent['severity']): number => {
    switch (severity) {
      case 'critical': return 24;
      case 'high': return 20;
      case 'medium': return 16;
      case 'low': return 12;
      default: return 16;
    }
  };

  const getMarkerColor = (type: DisasterEvent['type']): string => {
    switch (type) {
      case 'wildfire': return '#ef4444'; // red
      case 'flood': return '#3b82f6'; // blue
      case 'hurricane': return '#8b5cf6'; // purple
      case 'earthquake': return '#f59e0b'; // amber
      case 'other': return '#6b7280'; // gray
      default: return '#6b7280';
    }
  };

  const capitalizeFirstLetter = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="relative w-full h-[70vh] bg-muted/30 rounded-2xl overflow-hidden border shadow-sm">
      {!tokenSubmitted ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-card">
          <div className="w-full max-w-md space-y-4">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-medium">Google Maps API Key Required</h3>
              <p className="text-sm text-muted-foreground">
                To view the disaster map, please enter your Google Maps API key.
                You can get one from the <a href="https://console.cloud.google.com/google/maps-apis/credentials" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Cloud Console</a>
              </p>
            </div>
            
            <form onSubmit={handleTokenSubmit} className="space-y-3">
              <Input
                type="text"
                placeholder="Enter your Google Maps API key (AIza...)"
                value={googleMapsApiKey}
                onChange={(e) => setGoogleMapsApiKey(e.target.value)}
                className="w-full"
              />
              <Button type="submit" className="w-full">
                Load Map
              </Button>
            </form>
            
            <p className="text-xs text-muted-foreground text-center">
              Your API key will be stored in your browser's local storage and is only used for map display.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div ref={mapContainer} className="absolute inset-0" />
          
          {/* Loading state */}
          {loading && (
            <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-10">
              <div className="flex flex-col items-center">
                <Loader2 className="animate-spin h-8 w-8 text-primary mb-2" />
                <span className="text-sm text-foreground">Loading disaster data...</span>
              </div>
            </div>
          )}
          
          {/* Map error state */}
          {mapError && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-10 p-6">
              <div className="max-w-md bg-card p-6 rounded-lg border shadow-lg space-y-4">
                <h3 className="text-lg font-medium text-destructive">Map Error</h3>
                <p className="text-sm">{mapError}</p>
                <Button onClick={() => setTokenSubmitted(false)} className="w-full">
                  Try Different API Key
                </Button>
              </div>
            </div>
          )}
          
          {/* Map legend */}
          <div className="absolute bottom-4 left-4 p-3 bg-background/80 backdrop-blur-sm rounded-lg shadow-sm border z-10">
            <div className="text-xs font-medium mb-2">Map Legend</div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2">
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 rounded-full bg-[#ef4444] mr-1.5"></span>
                <span className="text-xs">Wildfire</span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 rounded-full bg-[#3b82f6] mr-1.5"></span>
                <span className="text-xs">Flood</span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 rounded-full bg-[#8b5cf6] mr-1.5"></span>
                <span className="text-xs">Hurricane</span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 rounded-full bg-[#f59e0b] mr-1.5"></span>
                <span className="text-xs">Earthquake</span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 rounded-full bg-[#6b7280] mr-1.5"></span>
                <span className="text-xs">Other</span>
              </div>
            </div>
          </div>
          
          {/* Data source info */}
          <div className="absolute top-4 left-4 p-2 bg-background/80 backdrop-blur-sm rounded-lg text-xs text-muted-foreground border z-10">
            Map data from Google Maps
          </div>
          
          {/* Token reset button */}
          <div className="absolute top-4 right-4 p-2 bg-background/80 backdrop-blur-sm rounded-lg text-xs border z-10">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-auto py-1 px-2 text-xs"
              onClick={() => {
                localStorage.removeItem('google_maps_api_key');
                setTokenSubmitted(false);
              }}
            >
              Change API Key
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default MapboxMap;
