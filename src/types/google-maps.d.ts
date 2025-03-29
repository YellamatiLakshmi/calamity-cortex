
// Type definitions for Google Maps JavaScript API
declare namespace google {
  namespace maps {
    class Map {
      constructor(mapDiv: Element, opts?: MapOptions);
      setCenter(latLng: LatLng | LatLngLiteral): void;
      setZoom(zoom: number): void;
      setOptions(options: MapOptions): void;
    }
    
    class Marker {
      constructor(opts?: MarkerOptions);
      setMap(map: Map | null): void;
      setPosition(latLng: LatLng | LatLngLiteral): void;
      setTitle(title: string): void;
      setIcon(icon: Icon | Symbol | string | null): void;
      addListener(eventName: string, handler: Function): MapsEventListener;
    }
    
    class InfoWindow {
      constructor(opts?: InfoWindowOptions);
      open(map: Map, anchor?: Marker): void;
      setContent(content: string | Node): void;
      close(): void;
    }
    
    interface MapOptions {
      center?: LatLng | LatLngLiteral;
      zoom?: number;
      styles?: any[];
      [key: string]: any;
    }
    
    interface MarkerOptions {
      position?: LatLng | LatLngLiteral;
      map?: Map;
      title?: string;
      icon?: Icon | Symbol | string;
      animation?: Animation;
      [key: string]: any;
    }
    
    interface InfoWindowOptions {
      content?: string | Node;
      position?: LatLng | LatLngLiteral;
      [key: string]: any;
    }
    
    interface LatLng {
      lat(): number;
      lng(): number;
    }
    
    interface LatLngLiteral {
      lat: number;
      lng: number;
    }
    
    interface Icon {
      url?: string;
      scaledSize?: Size;
      size?: Size;
      origin?: Point;
      anchor?: Point;
      path?: string;
      fillColor?: string;
      fillOpacity?: number;
      strokeWeight?: number;
      strokeColor?: string;
      scale?: number;
      [key: string]: any;
    }
    
    interface Symbol {
      path: SymbolPath | string;
      fillColor?: string;
      fillOpacity?: number;
      strokeColor?: string;
      strokeOpacity?: number;
      strokeWeight?: number;
      scale?: number;
      [key: string]: any;
    }
    
    class Size {
      constructor(width: number, height: number, widthUnit?: string, heightUnit?: string);
      width: number;
      height: number;
    }
    
    class Point {
      constructor(x: number, y: number);
      x: number;
      y: number;
    }
    
    interface MapsEventListener {
      remove(): void;
    }
    
    enum Animation {
      BOUNCE,
      DROP
    }
    
    enum SymbolPath {
      CIRCLE,
      FORWARD_CLOSED_ARROW,
      FORWARD_OPEN_ARROW,
      BACKWARD_CLOSED_ARROW,
      BACKWARD_OPEN_ARROW
    }
  }
}

declare global {
  interface Window {
    initGoogleMap: () => void;
  }
}
