
import React from 'react';

const DisasterMap = () => {
  return (
    <div className="relative w-full h-[70vh] bg-muted/30 rounded-2xl overflow-hidden border shadow-sm">
      {/* Map placeholder - would be replaced with actual Google Maps API integration */}
      <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=37.0902,-95.7129&zoom=4&size=1200x800&scale=2&format=png&maptype=roadmap&style=element:geometry%7Ccolor:0x212121&style=element:labels.icon%7Cvisibility:off&style=element:labels.text.fill%7Ccolor:0x757575&style=element:labels.text.stroke%7Ccolor:0x212121&style=feature:administrative%7Celement:geometry%7Ccolor:0x757575%7Cvisibility:off&style=feature:administrative.country%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:administrative.land_parcel%7Cvisibility:off&style=feature:administrative.locality%7Celement:labels.text.fill%7Ccolor:0xbdbdbd&style=feature:administrative.neighborhood%7Cvisibility:off&style=feature:poi%7Cvisibility:off&style=feature:road%7Cvisibility:off&style=feature:transit%7Cvisibility:off&style=feature:water%7Celement:geometry%7Ccolor:0x000000&style=feature:water%7Celement:labels.text%7Cvisibility:off&key=YOUR_API_KEY')]" />
      
      {/* Map overlay with glass effect */}
      <div className="absolute inset-0 bg-background/10 backdrop-blur-[2px]" />
      
      {/* Disaster indicators */}
      <div className="absolute top-1/4 left-1/3 w-4 h-4 rounded-full bg-disaster-red animate-ping-slow" />
      <div className="absolute top-1/3 left-1/2 w-3 h-3 rounded-full bg-disaster-red animate-ping-slow" style={{ animationDelay: '0.5s' }} />
      <div className="absolute top-1/2 left-1/4 w-5 h-5 rounded-full bg-disaster-blue animate-ping-slow" style={{ animationDelay: '0.2s' }} />
      <div className="absolute top-2/3 left-2/3 w-4 h-4 rounded-full bg-disaster-blue animate-ping-slow" style={{ animationDelay: '0.7s' }} />
      
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
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-disaster-red mr-1"></span>
            <span className="text-xs">Wildfire</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-disaster-blue mr-1"></span>
            <span className="text-xs">Flood</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-amber-500 mr-1"></span>
            <span className="text-xs">Other</span>
          </div>
        </div>
      </div>
      
      {/* Loading state - would be conditional in actual implementation */}
      <div className="hidden absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center">
        <div className="flex flex-col items-center">
          <svg className="animate-spin h-8 w-8 text-primary mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-sm text-foreground">Loading map data...</span>
        </div>
      </div>
    </div>
  );
};

export default DisasterMap;
