
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Loader2 } from 'lucide-react';
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [mapInitialized, setMapInitialized] = useState(false);
  const [mapboxToken, setMapboxToken] = useState('');
  const [tokenSubmitted, setTokenSubmitted] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  const initializeMap = () => {
    if (!mapContainer.current || map.current || !mapboxToken) return;
    setMapError(null);

    try {
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [-95.7129, 37.0902], // Center on US
        zoom: 3
        // Removed the projection property that was causing the type error
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      map.current.addControl(new mapboxgl.FullscreenControl());
      map.current.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      }));

      map.current.on('load', () => {
        setMapInitialized(true);
        toast.success('Map loaded successfully');
      });

      map.current.on('error', (e) => {
        console.error('Map error:', e);
        setMapError('Error loading map. Please check your Mapbox token and try again.');
        map.current?.remove();
        map.current = null;
        setMapInitialized(false);
        setTokenSubmitted(false);
      });

    } catch (error) {
      console.error('Error initializing map:', error);
      setMapError('Failed to initialize map. Please check your Mapbox token and try again.');
      map.current?.remove();
      map.current = null;
      setMapInitialized(false);
      setTokenSubmitted(false);
    }
  };

  // Handle token submission
  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mapboxToken.trim()) {
      toast.error('Please enter a valid Mapbox token');
      return;
    }
    
    // Clean up previous map instance if exists
    if (map.current) {
      markers.current.forEach(marker => marker.remove());
      markers.current = [];
      map.current.remove();
      map.current = null;
    }
    
    setTokenSubmitted(true);
    localStorage.setItem('mapbox_token', mapboxToken); // Save token for future visits
    initializeMap();
  };

  // Load token from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('mapbox_token');
    if (savedToken) {
      setMapboxToken(savedToken);
      setTokenSubmitted(true);
    }
  }, []);

  // Initialize map when token is submitted or loaded from storage
  useEffect(() => {
    if (tokenSubmitted && mapboxToken) {
      initializeMap();
    }
    
    // Cleanup
    return () => {
      markers.current.forEach(marker => marker.remove());
      markers.current = [];
      map.current?.remove();
    };
  }, [tokenSubmitted, mapboxToken]);

  // Add disaster markers when disasters data or map changes
  useEffect(() => {
    if (!map.current || !mapInitialized || loading) return;

    // Remove existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Add new markers for each disaster
    disasters.forEach(disaster => {
      try {
        // Create marker element
        const markerEl = document.createElement('div');
        markerEl.className = `disaster-marker ${disaster.type} ${disaster.severity}`;
        
        // Style based on disaster type and severity
        const size = getMarkerSize(disaster.severity);
        const color = getMarkerColor(disaster.type);
        
        markerEl.style.width = `${size}px`;
        markerEl.style.height = `${size}px`;
        markerEl.style.backgroundColor = color;
        markerEl.style.borderRadius = '50%';
        markerEl.style.border = '2px solid rgba(255, 255, 255, 0.5)';
        markerEl.style.boxShadow = `0 0 ${size}px ${color}40`;
        
        // Add animation
        markerEl.style.animation = 'pulse 2s infinite';
        
        // Create popup
        const popup = new mapboxgl.Popup({ offset: 25 })
          .setHTML(`
            <div style="font-family: system-ui, sans-serif; padding: 4px;">
              <div style="font-weight: 600; margin-bottom: 4px;">${disaster.location}</div>
              <div style="font-size: 12px; opacity: 0.8;">${capitalizeFirstLetter(disaster.type)}</div>
              <div style="font-size: 12px; opacity: 0.8;">Severity: ${capitalizeFirstLetter(disaster.severity)}</div>
              <div style="font-size: 12px; opacity: 0.8; margin-top: 4px;">${formatDate(disaster.timestamp)}</div>
            </div>
          `);
        
        // Create and add marker
        const marker = new mapboxgl.Marker(markerEl)
          .setLngLat([disaster.coordinates.lon, disaster.coordinates.lat])
          .setPopup(popup)
          .addTo(map.current!);
        
        markers.current.push(marker);
      } catch (error) {
        console.error('Error adding marker:', error);
      }
    });
    
    // Inject CSS for marker animation
    if (!document.getElementById('marker-animation')) {
      const style = document.createElement('style');
      style.id = 'marker-animation';
      style.textContent = `
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
      `;
      document.head.appendChild(style);
    }
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
              <h3 className="text-lg font-medium">Mapbox API Token Required</h3>
              <p className="text-sm text-muted-foreground">
                To view the disaster map, please enter your Mapbox public access token.
                You can get one for free at <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mapbox.com</a>
              </p>
            </div>
            
            <form onSubmit={handleTokenSubmit} className="space-y-3">
              <Input
                type="text"
                placeholder="Enter your Mapbox public token (pk.eyJ1...)"
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="w-full"
              />
              <Button type="submit" className="w-full">
                Load Map
              </Button>
            </form>
            
            <p className="text-xs text-muted-foreground text-center">
              Your token will be stored in your browser's local storage and is only used for map display.
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
                  Try Different Token
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
            Map data from Mapbox & OpenStreetMap
          </div>
          
          {/* Token reset button */}
          <div className="absolute top-4 right-4 p-2 bg-background/80 backdrop-blur-sm rounded-lg text-xs border z-10">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-auto py-1 px-2 text-xs"
              onClick={() => {
                localStorage.removeItem('mapbox_token');
                setTokenSubmitted(false);
              }}
            >
              Change Token
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default MapboxMap;
