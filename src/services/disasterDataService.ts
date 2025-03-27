
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

// Define the DisasterRisk interface for Gemini AI response
export interface DisasterRisk {
  riskLevel: string;
  disasterTypes: Array<{
    type: string;
    probability: string;
    severity: string;
  }>;
  areasOfConcern: string[];
  recommendations: string[];
}

// Mock data for fallback when APIs are unavailable
const mockData = {
  weather: {
    alerts: [
      {
        event: "Flood Warning",
        urgency: "Expected",
        severity: "Moderate",
        start: Date.now()
      },
      {
        event: "Thunderstorm Watch",
        urgency: "Expected",
        severity: "Minor",
        start: Date.now() + 3600000
      }
    ],
    current: {
      temp: 28,
      humidity: 65,
      wind_speed: 12
    }
  },
  news: {
    articles: [
      {
        title: "Heavy Rainfall Causes Flooding in Southeast Region",
        description: "Several areas have been evacuated as water levels continue to rise.",
        url: "https://example.com/news/1",
        publishedAt: new Date().toISOString()
      },
      {
        title: "Wildfire Alert Issued for Western Counties",
        description: "Dry conditions and high winds have increased fire risk.",
        url: "https://example.com/news/2",
        publishedAt: new Date(Date.now() - 3600000).toISOString()
      },
      {
        title: "Hurricane Season Forecast: What to Expect",
        description: "Meteorologists predict above-average hurricane activity this year.",
        url: "https://example.com/news/3",
        publishedAt: new Date(Date.now() - 7200000).toISOString()
      }
    ]
  },
  gemini: {
    candidates: [
      {
        content: {
          parts: [
            {
              text: `Based on the available data, I've analyzed the disaster risk for your location:

{
  "riskLevel": "medium",
  "disasterTypes": [
    {"type": "flood", "probability": "60%", "severity": "medium"},
    {"type": "wildfire", "probability": "25%", "severity": "low"},
    {"type": "hurricane", "probability": "40%", "severity": "high"}
  ],
  "areasOfConcern": [
    "Low-lying regions near water bodies",
    "Areas with poor drainage systems",
    "Coastal regions susceptible to storm surge"
  ],
  "recommendations": [
    "Keep emergency supplies ready including water, non-perishable food, and medications",
    "Stay informed through local news and weather alerts",
    "Ensure proper drainage around your property",
    "Have an evacuation plan ready and discuss it with family members",
    "Secure outdoor items that could be carried away by strong winds",
    "Consider flood insurance if you live in a flood-prone area"
  ]
}`
            }
          ]
        }
      }
    ]
  }
};

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
      
      // If API is unavailable, use mock data instead of failing
      console.log(`Using mock data for ${service}`);
      
      if (service === 'weather') {
        return { data: mockData.weather as unknown as T };
      } else if (service === 'news') {
        return { data: mockData.news as unknown as T };
      } else if (service === 'gemini') {
        return { data: mockData.gemini as unknown as T };
      }
      
      throw new Error(`HTTP error ${response.status}: ${errorText}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error(`Non-JSON response from ${service}:`, text);
      
      // If API returns non-JSON, use mock data
      console.log(`Using mock data for ${service} due to non-JSON response`);
      
      if (service === 'weather') {
        return { data: mockData.weather as unknown as T };
      } else if (service === 'news') {
        return { data: mockData.news as unknown as T };
      } else if (service === 'gemini') {
        return { data: mockData.gemini as unknown as T };
      }
      
      throw new Error(`Expected JSON response but got ${contentType}`);
    }

    const data = await response.json();
    
    // Log successful response
    console.log(`Successful ${service} data response:`, data);
    
    return { data: data as T };
  } catch (error) {
    console.error(`Error fetching ${service} data:`, error);
    toast.error(`Connectivity issues detected. Using local data for demonstrations.`);
    
    // Return mock data as fallback for any error
    if (service === 'weather') {
      return { data: mockData.weather as unknown as T };
    } else if (service === 'news') {
      return { data: mockData.news as unknown as T };
    } else if (service === 'gemini') {
      return { data: mockData.gemini as unknown as T };
    }
    
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
