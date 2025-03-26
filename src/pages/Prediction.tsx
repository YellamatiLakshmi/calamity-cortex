
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { BarChart2, ArrowRight, AlertTriangle, CloudRain, Wind, Flame, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from "sonner";
import { fetchWeatherAlert, fetchDisasterNews, analyzeDisasterRisk, getRiskColor } from '@/services/disasterDataService';

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

// Define Gemini API response interface
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

interface DisasterRisk {
  riskLevel: string;
  disasterTypes: Array<{
    type: string;
    probability: string;
    severity: string;
  }>;
  areasOfConcern: string[];
  recommendations: string[];
}

const PredictionPage = () => {
  const [location, setLocation] = useState<string>('San Francisco, CA');
  const [coordinates, setCoordinates] = useState({ lat: 37.7749, lon: -122.4194 });
  const [loading, setLoading] = useState<boolean>(false);
  const [riskData, setRiskData] = useState<DisasterRisk | null>(null);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [newsData, setNewsData] = useState<any[]>([]);

  const fetchDisasterData = async () => {
    setLoading(true);
    try {
      // Fetch weather data
      const weatherResponse = await fetchWeatherAlert(coordinates.lat, coordinates.lon);
      if (weatherResponse.data) {
        setWeatherData(weatherResponse.data);
        
        // Analyze disaster risk using Gemini
        const riskResponse = await analyzeDisasterRisk(location, weatherResponse.data);
        if (riskResponse.data && 'candidates' in riskResponse.data && riskResponse.data.candidates?.[0]) {
          try {
            // Parse the JSON response from Gemini
            const content = riskResponse.data.candidates[0].content.parts[0].text;
            const jsonStartIndex = content.indexOf('{');
            const jsonEndIndex = content.lastIndexOf('}') + 1;
            
            if (jsonStartIndex >= 0 && jsonEndIndex > jsonStartIndex) {
              const jsonStr = content.substring(jsonStartIndex, jsonEndIndex);
              const parsedData = JSON.parse(jsonStr);
              setRiskData(parsedData);
            } else {
              throw new Error('Invalid JSON format in response');
            }
          } catch (parseError) {
            console.error('Error parsing Gemini response:', parseError);
            toast.error('Failed to analyze disaster risk data');
          }
        }
      }

      // Fetch news about disasters in the area
      const newsResponse = await fetchDisasterNews(location + " disaster");
      if (newsResponse.data && 'articles' in newsResponse.data) {
        setNewsData(newsResponse.data.articles.slice(0, 3));
      }
    } catch (error) {
      console.error('Error fetching disaster data:', error);
      toast.error('Failed to fetch disaster prediction data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDisasterData();
    // This will run once on component mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchDisasterData();
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-20 pb-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center mb-2">
              <BarChart2 className="h-5 w-5 mr-2 text-disaster-blue" />
              <h1 className="text-2xl font-bold">Disaster Prediction</h1>
            </div>
            <p className="text-muted-foreground">
              AI-powered disaster prediction and risk assessment for your location
            </p>
          </div>
          
          {/* Location Input */}
          <div className="mb-8 animate-fade-in">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                type="text"
                value={location}
                onChange={handleLocationChange}
                placeholder="Enter your location"
                className="max-w-md"
              />
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing
                  </>
                ) : (
                  'Analyze Risk'
                )}
              </Button>
            </form>
          </div>
          
          {/* Prediction Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Flame className="h-4 w-4 mr-2 text-disaster-red" />
                  Wildfire Risk
                </CardTitle>
                <CardDescription>Next 7 days forecast</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <>
                    <div className={`text-3xl font-bold ${
                      riskData?.disasterTypes?.find(d => d.type === 'wildfire') 
                        ? getRiskColor(riskData.disasterTypes.find(d => d.type === 'wildfire')!.severity)
                        : 'text-muted-foreground'
                    }`}>
                      {riskData?.disasterTypes?.find(d => d.type === 'wildfire')?.severity || 'Unknown'}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {riskData?.disasterTypes?.find(d => d.type === 'wildfire')
                        ? `${riskData.disasterTypes.find(d => d.type === 'wildfire')!.probability} probability based on current conditions`
                        : 'Insufficient data to determine risk'}
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <CloudRain className="h-4 w-4 mr-2 text-disaster-blue" />
                  Flood Risk
                </CardTitle>
                <CardDescription>Next 7 days forecast</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <>
                    <div className={`text-3xl font-bold ${
                      riskData?.disasterTypes?.find(d => d.type === 'flood') 
                        ? getRiskColor(riskData.disasterTypes.find(d => d.type === 'flood')!.severity)
                        : 'text-muted-foreground'
                    }`}>
                      {riskData?.disasterTypes?.find(d => d.type === 'flood')?.severity || 'Unknown'}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {riskData?.disasterTypes?.find(d => d.type === 'flood')
                        ? `${riskData.disasterTypes.find(d => d.type === 'flood')!.probability} probability based on precipitation forecast`
                        : 'Insufficient data to determine risk'}
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Wind className="h-4 w-4 mr-2 text-primary" />
                  Storm Risk
                </CardTitle>
                <CardDescription>Next 7 days forecast</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <>
                    <div className={`text-3xl font-bold ${
                      riskData?.disasterTypes?.find(d => d.type === 'hurricane') 
                        ? getRiskColor(riskData.disasterTypes.find(d => d.type === 'hurricane')!.severity)
                        : 'text-muted-foreground'
                    }`}>
                      {riskData?.disasterTypes?.find(d => d.type === 'hurricane')?.severity || 'Unknown'}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {riskData?.disasterTypes?.find(d => d.type === 'hurricane')
                        ? `${riskData.disasterTypes.find(d => d.type === 'hurricane')!.probability} probability based on weather patterns`
                        : 'Insufficient data to determine risk'}
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Overall Risk Assessment */}
          <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Card>
              <CardHeader>
                <CardTitle>Overall Risk Assessment</CardTitle>
                <CardDescription>
                  AI-generated disaster risk prediction for {location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : riskData ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-medium">Overall Risk:</span>
                      <span className={`text-lg font-bold ${getRiskColor(riskData.riskLevel)}`}>
                        {riskData.riskLevel.toUpperCase()}
                      </span>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Areas of Concern:</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {riskData.areasOfConcern.map((area, index) => (
                          <li key={index} className="text-sm text-muted-foreground">{area}</li>
                        ))}
                      </ul>
                    </div>
                    
                    {weatherData && weatherData.current && (
                      <div className="pt-3 border-t">
                        <h3 className="font-medium mb-2">Current Weather Conditions:</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Temperature:</span>
                            <div>{weatherData.current.temp}°C</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Humidity:</span>
                            <div>{weatherData.current.humidity}%</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Wind Speed:</span>
                            <div>{weatherData.current.wind_speed} m/s</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No risk data available. Please try analyzing a different location.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* AI Insights */}
          <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-xl font-semibold mb-4">AI Analysis & Insights</h2>
            
            {loading ? (
              <div className="flex items-center justify-center py-12 border rounded-xl">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : riskData ? (
              <div className="border rounded-xl p-5 bg-card space-y-4">
                {riskData.disasterTypes.map((disaster, index) => (
                  <div key={index} className="flex items-start">
                    <div className="p-2 rounded-full bg-primary/10 mr-3 mt-1">
                      {disaster.type === 'wildfire' ? (
                        <Flame className="h-4 w-4 text-disaster-red" />
                      ) : disaster.type === 'flood' ? (
                        <CloudRain className="h-4 w-4 text-disaster-blue" />
                      ) : disaster.type === 'hurricane' ? (
                        <Wind className="h-4 w-4 text-primary" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">
                        {disaster.type.charAt(0).toUpperCase() + disaster.type.slice(1)} Risk: {disaster.severity.toUpperCase()}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {disaster.probability} probability based on current conditions and historical data.
                      </p>
                    </div>
                  </div>
                ))}
                
                <div className="flex items-start">
                  <div className="p-2 rounded-full bg-primary/10 mr-3 mt-1">
                    <BarChart2 className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Historical Context</h3>
                    <p className="text-sm text-muted-foreground">
                      Compared to historical data, the current risk profile is consistent with seasonal patterns
                      but shows increased intensity, likely due to changing climate conditions.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 border rounded-xl text-muted-foreground">
                No insights available. Please analyze a location to see AI-generated disaster analysis.
              </div>
            )}
          </div>
          
          {/* Recommended Actions */}
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-xl font-semibold mb-4">Recommended Preparedness Actions</h2>
            
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : riskData && riskData.recommendations ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {riskData.disasterTypes.map((disaster, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="font-medium mb-2 flex items-center">
                      {disaster.type === 'wildfire' ? (
                        <Flame className="h-4 w-4 mr-2 text-disaster-red" />
                      ) : disaster.type === 'flood' ? (
                        <CloudRain className="h-4 w-4 mr-2 text-disaster-blue" />
                      ) : disaster.type === 'hurricane' ? (
                        <Wind className="h-4 w-4 mr-2 text-primary" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 mr-2 text-muted-foreground" />
                      )}
                      {disaster.type.charAt(0).toUpperCase() + disaster.type.slice(1)} Preparedness
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {riskData.recommendations.slice(0, 3).map((recommendation, i) => (
                        <li key={i} className="flex items-start">
                          <ArrowRight className="h-3 w-3 mr-2 mt-1 flex-shrink-0" />
                          <span>{recommendation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border rounded-xl text-muted-foreground">
                No recommendations available. Please analyze a location to see preparedness actions.
              </div>
            )}
          </div>

          {/* Latest Disaster News */}
          {newsData.length > 0 && (
            <div className="mt-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <h2 className="text-xl font-semibold mb-4">Latest Disaster News</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {newsData.map((article, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{article.title}</CardTitle>
                      <CardDescription>{new Date(article.publishedAt).toLocaleDateString()}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-3">
                        {article.description}
                      </p>
                      <a 
                        href={article.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        Read full article
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PredictionPage;
