
import { toast } from "sonner";

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export const fetchDisasterData = async <T>(
  service: 'weather' | 'nasa' | 'news' | 'gemini',
  endpoint: string,
  params: Record<string, any> = {}
): Promise<ApiResponse<T>> => {
  try {
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
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch data');
    }

    const data = await response.json();
    return { data: data as T };
  } catch (error) {
    console.error(`Error fetching ${service} data:`, error);
    toast.error(`Failed to fetch disaster data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

export const fetchWeatherAlert = async (lat: number, lon: number) => {
  return fetchDisasterData(
    'weather',
    'onecall',
    { lat, lon, exclude: 'minutely,hourly', units: 'metric' }
  );
};

export const fetchFloodData = async (location: string) => {
  return fetchDisasterData(
    'nasa',
    'earth/assets',
    { lon: -95.7129, lat: 37.0902, dim: 0.025 }
  );
};

export const fetchDisasterNews = async (query: string = 'natural disaster') => {
  return fetchDisasterData(
    'news',
    'everything',
    { q: query, sortBy: 'publishedAt', pageSize: 10 }
  );
};

export const analyzeDisasterRisk = async (location: string, data: any) => {
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

  return fetchDisasterData<any>(
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
