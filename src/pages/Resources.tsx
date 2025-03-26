
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Database, Link2, ExternalLink, FileText, AlertTriangle, CloudRain, Wind, Flame } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const ResourcesPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-20 pb-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center mb-2">
              <Database className="h-5 w-5 mr-2 text-disaster-blue" />
              <h1 className="text-2xl font-bold">Disaster Resources</h1>
            </div>
            <p className="text-muted-foreground">
              Essential information, guides, and resources for disaster preparedness and response
            </p>
          </div>
          
          {/* Resource Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <Card className="bg-disaster-red/10 border-disaster-red/20">
              <CardHeader className="pb-2">
                <Flame className="h-5 w-5 text-disaster-red mb-2" />
                <CardTitle className="text-lg">Wildfire</CardTitle>
                <CardDescription>Preparedness & response</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground">
                  Essential information on wildfire prevention, evacuation planning, and safety measures
                </p>
              </CardContent>
              <CardFooter>
                <button className="text-disaster-red text-sm flex items-center">
                  View Resources <ExternalLink className="h-3 w-3 ml-1" />
                </button>
              </CardFooter>
            </Card>
            
            <Card className="bg-disaster-blue/10 border-disaster-blue/20">
              <CardHeader className="pb-2">
                <CloudRain className="h-5 w-5 text-disaster-blue mb-2" />
                <CardTitle className="text-lg">Flooding</CardTitle>
                <CardDescription>Preparedness & response</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground">
                  Guides on flood safety, property protection, and evacuation procedures
                </p>
              </CardContent>
              <CardFooter>
                <button className="text-disaster-blue text-sm flex items-center">
                  View Resources <ExternalLink className="h-3 w-3 ml-1" />
                </button>
              </CardFooter>
            </Card>
            
            <Card className="bg-primary/10 border-primary/20">
              <CardHeader className="pb-2">
                <Wind className="h-5 w-5 text-primary mb-2" />
                <CardTitle className="text-lg">Storms</CardTitle>
                <CardDescription>Preparedness & response</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground">
                  Information on preparing for hurricanes, severe thunderstorms, and tornadoes
                </p>
              </CardContent>
              <CardFooter>
                <button className="text-primary text-sm flex items-center">
                  View Resources <ExternalLink className="h-3 w-3 ml-1" />
                </button>
              </CardFooter>
            </Card>
            
            <Card className="bg-muted border">
              <CardHeader className="pb-2">
                <AlertTriangle className="h-5 w-5 text-muted-foreground mb-2" />
                <CardTitle className="text-lg">General</CardTitle>
                <CardDescription>All-hazards preparedness</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground">
                  General emergency preparedness, kits, family planning, and safety tips
                </p>
              </CardContent>
              <CardFooter>
                <button className="text-muted-foreground text-sm flex items-center">
                  View Resources <ExternalLink className="h-3 w-3 ml-1" />
                </button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Educational Materials */}
          <div className="mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-xl font-semibold mb-4">Educational Materials</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="border rounded-lg overflow-hidden group hover:shadow-md transition-shadow">
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <FileText className="h-10 w-10 text-muted-foreground" />
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">Wildfire Safety Guide</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Comprehensive guide to wildfire prevention, evacuation, and recovery.
                  </p>
                  <button className="text-xs text-primary flex items-center">
                    Download PDF <ExternalLink className="h-3 w-3 ml-1" />
                  </button>
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden group hover:shadow-md transition-shadow">
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <FileText className="h-10 w-10 text-muted-foreground" />
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">Flood Preparedness Handbook</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Learn how to prepare your home and family for potential flooding events.
                  </p>
                  <button className="text-xs text-primary flex items-center">
                    Download PDF <ExternalLink className="h-3 w-3 ml-1" />
                  </button>
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden group hover:shadow-md transition-shadow">
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <FileText className="h-10 w-10 text-muted-foreground" />
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">Emergency Kit Checklist</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Essential items to include in your family's emergency preparedness kit.
                  </p>
                  <button className="text-xs text-primary flex items-center">
                    Download PDF <ExternalLink className="h-3 w-3 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* External Resources */}
          <div className="mb-10 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-xl font-semibold mb-4">Official Resources</h2>
            
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Link2 className="h-4 w-4 mr-2" />
                    Government Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center justify-between p-2 rounded hover:bg-muted transition-colors">
                      <span className="text-sm">Federal Emergency Management Agency (FEMA)</span>
                      <a href="https://www.fema.gov/" target="_blank" rel="noreferrer" className="text-primary text-xs flex items-center">
                        Visit <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </li>
                    <li className="flex items-center justify-between p-2 rounded hover:bg-muted transition-colors">
                      <span className="text-sm">National Weather Service</span>
                      <a href="https://www.weather.gov/" target="_blank" rel="noreferrer" className="text-primary text-xs flex items-center">
                        Visit <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </li>
                    <li className="flex items-center justify-between p-2 rounded hover:bg-muted transition-colors">
                      <span className="text-sm">Ready.gov</span>
                      <a href="https://www.ready.gov/" target="_blank" rel="noreferrer" className="text-primary text-xs flex items-center">
                        Visit <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Link2 className="h-4 w-4 mr-2" />
                    Non-Profit Organizations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center justify-between p-2 rounded hover:bg-muted transition-colors">
                      <span className="text-sm">American Red Cross</span>
                      <a href="https://www.redcross.org/" target="_blank" rel="noreferrer" className="text-primary text-xs flex items-center">
                        Visit <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </li>
                    <li className="flex items-center justify-between p-2 rounded hover:bg-muted transition-colors">
                      <span className="text-sm">National Voluntary Organizations Active in Disaster</span>
                      <a href="https://www.nvoad.org/" target="_blank" rel="noreferrer" className="text-primary text-xs flex items-center">
                        Visit <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </li>
                    <li className="flex items-center justify-between p-2 rounded hover:bg-muted transition-colors">
                      <span className="text-sm">Salvation Army Emergency Disaster Services</span>
                      <a href="https://disaster.salvationarmyusa.org/" target="_blank" rel="noreferrer" className="text-primary text-xs flex items-center">
                        Visit <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Local Resources */}
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-xl font-semibold mb-4">Local Resources</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>Find Local Emergency Services</CardTitle>
                <CardDescription>
                  Enter your location to find emergency services, evacuation centers, and local disaster information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Enter your city or zip code" 
                    className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                  <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium">
                    Search
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ResourcesPage;
