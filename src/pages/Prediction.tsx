
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { BarChart2, ArrowRight, AlertTriangle, CloudRain, Wind, Flame } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const PredictionPage = () => {
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
                <div className="text-3xl font-bold text-disaster-red">Medium</div>
                <p className="text-sm text-muted-foreground mt-2">
                  20% increase in risk due to dry conditions and high temperatures
                </p>
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
                <div className="text-3xl font-bold text-disaster-blue">Low</div>
                <p className="text-sm text-muted-foreground mt-2">
                  Minimal precipitation expected, river levels are normal
                </p>
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
                <div className="text-3xl font-bold text-primary">High</div>
                <p className="text-sm text-muted-foreground mt-2">
                  Potential severe thunderstorms expected within 48 hours
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Prediction Map */}
          <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Card>
              <CardHeader>
                <CardTitle>Risk Prediction Map</CardTitle>
                <CardDescription>
                  View projected disaster risks in your region for the next 7 days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Interactive prediction map will be loaded here</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* AI Insights */}
          <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-xl font-semibold mb-4">AI Analysis & Insights</h2>
            
            <div className="border rounded-xl p-5 bg-card space-y-4">
              <div className="flex items-start">
                <div className="p-2 rounded-full bg-primary/10 mr-3 mt-1">
                  <AlertTriangle className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Increasing Wildfire Risk</h3>
                  <p className="text-sm text-muted-foreground">
                    Our AI models predict a 20% increase in wildfire risk over the next week due to persistent dry conditions and above-average temperatures in your area. The most vulnerable areas include the eastern hills and northwestern forests.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="p-2 rounded-full bg-primary/10 mr-3 mt-1">
                  <Wind className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Storm System Approaching</h3>
                  <p className="text-sm text-muted-foreground">
                    A developing storm system is expected to reach your area within 48 hours, bringing potential for severe thunderstorms, lightning, and strong winds. Urban areas with poor drainage may experience temporary flooding during peak rainfall.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="p-2 rounded-full bg-primary/10 mr-3 mt-1">
                  <BarChart2 className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Historical Context</h3>
                  <p className="text-sm text-muted-foreground">
                    Compared to historical data, the current risk profile is 15% higher than the seasonal average for this time of year. This deviation is consistent with climate change projections that predict increased frequency and intensity of extreme weather events.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recommended Actions */}
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-xl font-semibold mb-4">Recommended Preparedness Actions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="font-medium mb-2 flex items-center">
                  <Flame className="h-4 w-4 mr-2 text-disaster-red" />
                  Wildfire Preparedness
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <ArrowRight className="h-3 w-3 mr-2 mt-1 flex-shrink-0" />
                    <span>Clear flammable vegetation and debris from around your home</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-3 w-3 mr-2 mt-1 flex-shrink-0" />
                    <span>Prepare an emergency evacuation plan and kit</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-3 w-3 mr-2 mt-1 flex-shrink-0" />
                    <span>Stay informed about local fire warnings and evacuations</span>
                  </li>
                </ul>
              </div>
              
              <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="font-medium mb-2 flex items-center">
                  <CloudRain className="h-4 w-4 mr-2 text-disaster-blue" />
                  Flood Preparedness
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <ArrowRight className="h-3 w-3 mr-2 mt-1 flex-shrink-0" />
                    <span>Store valuable items and documents in waterproof containers</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-3 w-3 mr-2 mt-1 flex-shrink-0" />
                    <span>Know your evacuation routes to higher ground</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-3 w-3 mr-2 mt-1 flex-shrink-0" />
                    <span>Consider flood insurance if you live in a vulnerable area</span>
                  </li>
                </ul>
              </div>
              
              <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="font-medium mb-2 flex items-center">
                  <Wind className="h-4 w-4 mr-2 text-primary" />
                  Storm Preparedness
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <ArrowRight className="h-3 w-3 mr-2 mt-1 flex-shrink-0" />
                    <span>Secure outdoor items that could become projectiles</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-3 w-3 mr-2 mt-1 flex-shrink-0" />
                    <span>Identify safe shelter locations away from windows</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-3 w-3 mr-2 mt-1 flex-shrink-0" />
                    <span>Prepare for potential power outages with batteries and supplies</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PredictionPage;
