
import { toast } from "sonner";

// Generic API response interface
interface ApiResponse<T> {
  data?: T;
  error?: string;
}

// Gemini API response interfaces
interface GeminiCandidate {
  content: {
    parts: Array<{
      text: string;
    }>;
  };
}

interface GeminiResponse {
  candidates: GeminiCandidate[];
}

// Weather API response interfaces
interface WeatherAlert {
  event?: string;
  urgency?: string;
  severity?: string;
  start: number;
}

interface WeatherResponse {
  alerts?: WeatherAlert[];
  current?: {
    temp: number;
    humidity: number;
    wind_speed: number;
  };
}

// News API response interface
interface NewsArticle {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
}

interface NewsResponse {
  articles: NewsArticle[];
}

// NASA API response interface
interface NasaResponse {
  // Define NASA response structure as needed
}

export const fetchDisasterData = async <T>(
  service: 'weather' | 'nasa' | 'news' | 'gemini',
  endpoint: string,
  params: Record<string, any> = {}
): Promise<ApiResponse<T>> => {
  try {
    console.log(`Fetching ${service} data for endpoint ${endpoint}`, params);
    
    const response = await fetch('/api/api-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service,
        endpoint,
        params,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error response from ${service}:`, errorText);
      throw new Error(`HTTP error ${response.status}: ${errorText}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error(`Non-JSON response from ${service}:`, text);
      throw new Error(`Expected JSON response but got ${contentType}`);
    }

    const data = await response.json();
    
    // Log successful response
    console.log(`Successful ${service} data response:`, data);
    
    return { data: data as T };
  } catch (error) {
    console.error(`Error fetching ${service} data:`, error);
    toast.error(`Failed to fetch disaster data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

export const fetchWeatherAlert = async (lat: number, lon: number): Promise<ApiResponse<WeatherResponse>> => {
  return fetchDisasterData<WeatherResponse>(
    'weather',
    'onecall',
    { lat, lon, exclude: 'minutely,hourly', units: 'metric' }
  );
};

export const fetchFloodData = async (location: string): Promise<ApiResponse<NasaResponse>> => {
  return fetchDisasterData<NasaResponse>(
    'nasa',
    'earth/assets',
    { lon: -95.7129, lat: 37.0902, dim: 0.025 }
  );
};

export const fetchDisasterNews = async (query: string = 'natural disaster'): Promise<ApiResponse<NewsResponse>> => {
  return fetchDisasterData<NewsResponse>(
    'news',
    'everything',
    { q: query, sortBy: 'publishedAt', pageSize: 10 }
  );
};

export const analyzeDisasterRisk = async (location: string, data: any): Promise<ApiResponse<GeminiResponse>> => {
  const prompt = `
    Analyze the disaster risk for ${location} based on the following data:
    ${JSON.stringify(data)}
    
    Provide a risk assessment with the following information:
    1. Overall risk level (low, medium, high, critical)
    2. Most likely disaster types in the next 7 days
    3. Specific areas of concern
    4. Recommended preparedness actions
    
    Format the response as a JSON object with the following structure:
    {
      "riskLevel": "low|medium|high|critical",
      "disasterTypes": [{"type": "flood|wildfire|hurricane|earthquake", "probability": "percentage", "severity": "low|medium|high|critical"}],
      "areasOfConcern": ["area1", "area2"],
      "recommendations": ["recommendation1", "recommendation2"]
    }
  `;

  return fetchDisasterData<GeminiResponse>(
    'gemini',
    'generateContent',
    {
      contents: [{
        parts: [{
          text: prompt
        }]
      }]
    }
  );
};

// Helper function to determine risk color
export const getRiskColor = (risk: string): string => {
  switch (risk.toLowerCase()) {
    case 'low':
      return 'text-green-500';
    case 'medium':
      return 'text-amber-500';
    case 'high':
      return 'text-orange-500';
    case 'critical':
      return 'text-disaster-red';
    default:
      return 'text-muted-foreground';
  }
};
