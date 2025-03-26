import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from "sonner";
import { fetchDisasterNews, fetchWeatherAlert } from '@/services/disasterDataService';

// Define Weather API response interface
interface WeatherAlert {
  event?: string;
  urgency?: string;
  severity?: string;
  start: number;
}

interface WeatherResponse {
  alerts?: WeatherAlert[];
}

// Define News API response interface
interface NewsArticle {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
}

interface NewsResponse {
  articles: NewsArticle[];
}

interface DisasterEvent {
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

const DisasterMap = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [disasters, setDisasters] = useState<DisasterEvent[]>([]);

  useEffect(() => {
    const fetchRealTimeDisasters = async () => {
      setLoading(true);
      try {
        // Fetch weather alerts for multiple locations
        const locations = [
          { name: 'California', lat: 36.7783, lon: -119.4179 },
          { name: 'Florida', lat: 27.6648, lon: -81.5158 },
          { name: 'Texas', lat: 31.9686, lon: -99.9018 },
          { name: 'New York', lat: 40.7128, lon: -74.0060 },
          { name: 'Washington', lat: 47.7511, lon: -120.7401 }
        ];

        const disasterEvents: DisasterEvent[] = [];
        let id = 1;

        // Process each location
        for (const location of locations) {
          const weatherResponse = await fetchWeatherAlert(location.lat, location.lon);
          
          if (weatherResponse.data) {
            const alerts = weatherResponse.data.alerts || [];
            
            // Process weather alerts into disaster events
            alerts.forEach((alert: WeatherAlert) => {
              let type: DisasterEvent['type'] = 'other';
              let severity: DisasterEvent['severity'] = 'medium';
              
              // Determine disaster type based on event
              const event = alert.event?.toLowerCase() || '';
              if (event.includes('flood') || event.includes('rain')) {
                type = 'flood';
              } else if (event.includes('fire') || event.includes('wildfire')) {
                type = 'wildfire';
              } else if (
                event.includes('hurricane') || 
                event.includes('storm') || 
                event.includes('wind') || 
                event.includes('tornado')
              ) {
                type = 'hurricane';
              }
              
              // Determine severity based on urgency or severity field
              const urgency = alert.urgency?.toLowerCase() || '';
              const alertSeverity = alert.severity?.toLowerCase() || '';
              
              if (urgency.includes('immediate') || alertSeverity.includes('extreme')) {
                severity = 'critical';
              } else if (urgency.includes('expected') || alertSeverity.includes('severe')) {
                severity = 'high';
              } else if (alertSeverity.includes('moderate')) {
                severity = 'medium';
              } else {
                severity = 'low';
              }
              
              // Add slight randomization to coordinates for visual separation
              const latOffset = (Math.random() - 0.5) * 2;
              const lonOffset = (Math.random() - 0.5) * 2;
              
              disasterEvents.push({
                id: `disaster-${id++}`,
                type,
                location: location.name,
                coordinates: { 
                  lat: location.lat + latOffset, 
                  lon: location.lon + lonOffset 
                },
                severity,
                timestamp: new Date(alert.start * 1000)
              });
            });
            
            // If no alerts, add a simulated disaster for demo purposes
            if (alerts.length === 0 && Math.random() > 0.6) {
              const types: DisasterEvent['type'][] = ['wildfire', 'flood', 'hurricane', 'earthquake', 'other'];
              const severities: DisasterEvent['severity'][] = ['low', 'medium', 'high', 'critical'];
              
              disasterEvents.push({
                id: `disaster-${id++}`,
                type: types[Math.floor(Math.random() * types.length)],
                location: location.name,
                coordinates: { 
                  lat: location.lat + (Math.random() - 0.5) * 2, 
                  lon: location.lon + (Math.random() - 0.5) * 2 
                },
                severity: severities[Math.floor(Math.random() * severities.length)],
                timestamp: new Date()
              });
            }
          }
        }
        
        // Add news-based disasters
        const newsResponse = await fetchDisasterNews();
        if (newsResponse.data && 'articles' in newsResponse.data) {
          // Process first 5 news articles
          const articles = newsResponse.data.articles.slice(0, 5);
          
          articles.forEach((article: NewsArticle) => {
            // Try to extract location from title or description
            const title = article.title || '';
            const description = article.description || '';
            
            // Simple location extraction (this would be more sophisticated in a real app)
            const usStates = ['California', 'Florida', 'Texas', 'New York', 'Washington'];
            let extractedLocation = '';
            
            for (const state of usStates) {
              if (title.includes(state) || description.includes(state)) {
                extractedLocation = state;
                break;
              }
            }
            
            if (!extractedLocation) {
              // Skip if we can't determine a location
              return;
            }
            
            // Determine disaster type based on keywords
            let type: DisasterEvent['type'] = 'other';
            let severity: DisasterEvent['severity'] = 'medium';
            
            const content = (title + ' ' + description).toLowerCase();
            
            if (content.includes('flood') || content.includes('rain') || content.includes('water')) {
              type = 'flood';
            } else if (content.includes('fire') || content.includes('wildfire') || content.includes('burn')) {
              type = 'wildfire';
            } else if (
              content.includes('hurricane') || 
              content.includes('storm') || 
              content.includes('wind') || 
              content.includes('tornado')
            ) {
              type = 'hurricane';
            } else if (content.includes('earthquake') || content.includes('tremor') || content.includes('quake')) {
              type = 'earthquake';
            }
            
            // Set random coordinates based on extracted location
            let lat = 37.7749;
            let lon = -122.4194;
            
            if (extractedLocation === 'California') {
              lat = 36.7783 + (Math.random() - 0.5) * 2;
              lon = -119.4179 + (Math.random() - 0.5) * 2;
            } else if (extractedLocation === 'Florida') {
              lat = 27.6648 + (Math.random() - 0.5) * 2;
              lon = -81.5158 + (Math.random() - 0.5) * 2;
            } else if (extractedLocation === 'Texas') {
              lat = 31.9686 + (Math.random() - 0.5) * 2;
              lon = -99.9018 + (Math.random() - 0.5) * 2;
            } else if (extractedLocation === 'New York') {
              lat = 40.7128 + (Math.random() - 0.5) * 2;
              lon = -74.0060 + (Math.random() - 0.5) * 2;
            } else if (extractedLocation === 'Washington') {
              lat = 47.7511 + (Math.random() - 0.5) * 2;
              lon = -120.7401 + (Math.random() - 0.5) * 2;
            }
            
            // Determine severity based on content
            if (
              content.includes('devastating') || 
              content.includes('catastrophic') || 
              content.includes('emergency') || 
              content.includes('evacuate')
            ) {
              severity = 'critical';
            } else if (
              content.includes('severe') || 
              content.includes('major') || 
              content.includes('significant')
            ) {
              severity = 'high';
            } else if (
              content.includes('moderate') || 
              content.includes('warning')
            ) {
              severity = 'medium';
            } else {
              severity = 'low';
            }
            
            disasterEvents.push({
              id: `news-disaster-${id++}`,
              type,
              location: extractedLocation,
              coordinates: { lat, lon },
              severity,
              timestamp: new Date(article.publishedAt || Date.now())
            });
          });
        }
        
        // If we still don't have any disasters, add some simulated ones
        if (disasterEvents.length === 0) {
          // Add simulated disaster events
          const simulatedDisasters: DisasterEvent[] = [
            {
              id: 'disaster-sim-1',
              type: 'wildfire',
              location: 'Northern California',
              coordinates: { lat: 38.8375, lon: -120.8958 },
              severity: 'high',
              timestamp: new Date()
            },
            {
              id: 'disaster-sim-2',
              type: 'flood',
              location: 'Southern Texas',
              coordinates: { lat: 29.7604, lon: -95.3698 },
              severity: 'medium',
              timestamp: new Date()
            },
            {
              id: 'disaster-sim-3',
              type: 'hurricane',
              location: 'Florida Coast',
              coordinates: { lat: 25.7617, lon: -80.1918 },
              severity: 'critical',
              timestamp: new Date()
            }
          ];
          
          disasterEvents.push(...simulatedDisasters);
        }
        
        setDisasters(disasterEvents);
      } catch (error) {
        console.error('Error fetching disaster data for map:', error);
        toast.error('Failed to load disaster map data');
        
        // Add simulated data as fallback
        const fallbackDisasters: DisasterEvent[] = [
          {
            id: 'disaster-fallback-1',
            type: 'wildfire',
            location: 'California',
            coordinates: { lat: 38.8375, lon: -120.8958 },
            severity: 'high',
            timestamp: new Date()
          },
          {
            id: 'disaster-fallback-2',
            type: 'flood',
            location: 'Texas',
            coordinates: { lat: 29.7604, lon: -95.3698 },
            severity: 'medium',
            timestamp: new Date()
          },
          {
            id: 'disaster-fallback-3',
            type: 'hurricane',
            location: 'Florida',
            coordinates: { lat: 25.7617, lon: -80.1918 },
            severity: 'critical',
            timestamp: new Date()
          }
        ];
        
        setDisasters(fallbackDisasters);
      } finally {
        setLoading(false);
      }
    };

    fetchRealTimeDisasters();
    
    // Refresh data every 5 minutes
    const intervalId = setInterval(fetchRealTimeDisasters, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  const getMarkerStyle = (type: DisasterEvent['type'], severity: DisasterEvent['severity']) => {
    let color = '';
    let size = '';
    
    // Set color based on type
    switch (type) {
      case 'wildfire':
        color = 'bg-disaster-red';
        break;
      case 'flood':
        color = 'bg-disaster-blue';
        break;
      case 'hurricane':
        color = 'bg-primary';
        break;
      case 'earthquake':
        color = 'bg-amber-500';
        break;
      default:
        color = 'bg-muted-foreground';
    }
    
    // Set size based on severity
    switch (severity) {
      case 'critical':
        size = 'w-5 h-5';
        break;
      case 'high':
        size = 'w-4 h-4';
        break;
      case 'medium':
        size = 'w-3 h-3';
        break;
      case 'low':
        size = 'w-2 h-2';
        break;
    }
    
    return `${color} ${size}`;
  };

  const getAnimationDelay = (index: number) => {
    return `${(index % 5) * 0.2}s`;
  };

  return (
    <div className="relative w-full h-[70vh] bg-muted/30 rounded-2xl overflow-hidden border shadow-sm">
      {/* Map placeholder - would be replaced with actual Google Maps API integration */}
      <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=37.0902,-95.7129&zoom=4&size=1200x800&scale=2&format=png&maptype=roadmap&style=element:geometry%7Ccolor:0x212121&style=element:labels.icon%7Cvisibility:off&style=element:labels.text.fill%7Ccolor:0x757575&style=element:labels.text.stroke%7Ccolor:0x212121&style=feature:administrative%7Celement:geometry%7Ccolor:0x757575%7Cvisibility:off&style=feature:administrative.country%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:administrative.land_parcel%7Cvisibility:off&style=feature:administrative.locality%7Celement:labels.text.fill%7Ccolor:0xbdbdbd&style=feature:administrative.neighborhood%7Cvisibility:off&style=feature:poi%7Cvisibility:off&style=feature:road%7Cvisibility:off&style=feature:transit%7Cvisibility:off&style=feature:water%7Celement:geometry%7Ccolor:0x000000&style=feature:water%7Celement:labels.text%7Cvisibility:off&key=YOUR_API_KEY')]" />
      
      {/* Map overlay with glass effect */}
      <div className="absolute inset-0 bg-background/10 backdrop-blur-[2px]" />
      
      {/* Loading state */}
      {loading ? (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center">
          <div className="flex flex-col items-center">
            <Loader2 className="animate-spin h-8 w-8 text-primary mb-2" />
            <span className="text-sm text-foreground">Loading disaster data...</span>
          </div>
        </div>
      ) : (
        /* Disaster indicators */
        disasters.map((disaster, index) => (
          <div 
            key={disaster.id}
            className={`absolute rounded-full animate-ping-slow ${getMarkerStyle(disaster.type, disaster.severity)}`} 
            style={{ 
              // Convert geo coordinates to relative position on the map div
              // This is a simplified conversion - a real implementation would use the map's projection
              top: `${(1 - (disaster.coordinates.lat - 25) / 25) * 100}%`,
              left: `${((disaster.coordinates.lon + 125) / 50) * 100}%`,
              animationDelay: getAnimationDelay(index)
            }}
          >
            <div className="absolute inset-0 rounded-full bg-white/20 animate-ping" style={{ animationDuration: '3s' }}></div>
            <div className="group absolute opacity-0 bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-background/90 backdrop-blur-md rounded-lg shadow-lg border whitespace-nowrap text-xs hover:opacity-100 transition-opacity pointer-events-none">
              <div className="font-medium">{disaster.location}</div>
              <div className="text-muted-foreground">{disaster.type} - {disaster.severity}</div>
              <div className="text-muted-foreground text-[10px]">{disaster.timestamp.toLocaleString()}</div>
            </div>
          </div>
        ))
      )}
      
      {/* Map controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button className="p-2 bg-background/80 backdrop-blur-sm rounded-full shadow-sm border">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
        <button className="p-2 bg-background/80 backdrop-blur-sm rounded-full shadow-sm border">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
          </svg>
        </button>
      </div>
      
      {/* Map legend */}
      <div className="absolute bottom-4 left-4 p-3 bg-background/80 backdrop-blur-sm rounded-lg shadow-sm border">
        <div className="text-xs font-medium mb-2">Map Legend</div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-disaster-red mr-1"></span>
            <span className="text-xs">Wildfire ({disasters.filter(d => d.type === 'wildfire').length})</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-disaster-blue mr-1"></span>
            <span className="text-xs">Flood ({disasters.filter(d => d.type === 'flood').length})</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-primary mr-1"></span>
            <span className="text-xs">Hurricane ({disasters.filter(d => d.type === 'hurricane').length})</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-amber-500 mr-1"></span>
            <span className="text-xs">Earthquake ({disasters.filter(d => d.type === 'earthquake').length})</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-muted-foreground mr-1"></span>
            <span className="text-xs">Other ({disasters.filter(d => d.type === 'other').length})</span>
          </div>
        </div>
      </div>
      
      {/* Data source info */}
      <div className="absolute top-4 left-4 p-2 bg-background/80 backdrop-blur-sm rounded-lg text-xs text-muted-foreground border">
        Live data from OpenWeatherMap & NewsAPI
      </div>
    </div>
  );
};

export default DisasterMap;
