
import React from 'react';
import Hero from '@/components/Hero';
import DisasterCard from '@/components/DisasterCard';
import DisasterMap from '@/components/DisasterMap';
import ChatInterface from '@/components/ChatInterface';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowRight, AlertTriangle, Shield, Radio, BarChart2, CloudLightning, MapIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  // Sample data for disaster cards
  const disasters = [
    {
      id: 1,
      type: 'wildfire' as const,
      title: 'Sierra Nevada Wildfire',
      location: 'Fresno County, California',
      severity: 'high' as const,
      time: '2 hours ago',
    },
    {
      id: 2,
      type: 'flood' as const,
      title: 'Mississippi River Flooding',
      location: 'St. Louis, Missouri',
      severity: 'critical' as const,
      time: '5 hours ago',
    },
    {
      id: 3,
      type: 'hurricane' as const,
      title: 'Hurricane Eleanor',
      location: 'Gulf Coast, Louisiana',
      severity: 'medium' as const,
      time: '1 day ago',
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Current Disasters Section */}
      <section className="py-24 px-4 md:px-6 lg:px-8 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10 animate-fade-in">
            <div>
              <div className="flex items-center mb-2">
                <AlertTriangle className="h-5 w-5 mr-2 text-disaster-red" />
                <h2 className="text-2xl font-bold">Active Disasters</h2>
              </div>
              <p className="text-muted-foreground">Real-time monitoring of current disaster events worldwide</p>
            </div>
            
            <Link to="/map" className="flex items-center text-sm font-medium text-primary">
              View all
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {disasters.map((disaster, index) => (
              <DisasterCard
                key={disaster.id}
                {...disaster}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Live Map Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center justify-center p-1 px-3 mb-4 border rounded-full bg-muted/30 text-sm font-medium text-muted-foreground">
                <MapIcon className="h-3.5 w-3.5 mr-2 text-disaster-blue" />
                <span>Interactive visualization</span>
              </div>
              
              <h2 className="text-3xl font-bold mb-4">Live Disaster Mapping</h2>
              
              <p className="text-muted-foreground mb-6">
                Our interactive map provides real-time visualization of active disaster zones, affected areas, and severity levels. Data is continuously updated from NASA, USGS, and other reliable sources.
              </p>
              
              <ul className="space-y-3 mb-8">
                {[
                  'Heat map visualization of affected areas',
                  'Filter by disaster type, severity, and timeframe',
                  'Real-time updates from official sources',
                  'Interactive legends and data layers',
                ].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary/10 text-primary mr-2 mt-0.5">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link
                to="/map"
                className="inline-flex items-center justify-center px-6 py-3 bg-disaster-blue text-white rounded-lg font-medium hover:bg-disaster-blue/90 transition-all shadow-button"
              >
                Explore Disaster Map
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <DisasterMap />
            </div>
          </div>
        </div>
      </section>
      
      {/* Emergency Assistance Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="lg:order-2 animate-fade-in">
              <div className="inline-flex items-center justify-center p-1 px-3 mb-4 border rounded-full bg-muted/30 text-sm font-medium text-muted-foreground">
                <Radio className="h-3.5 w-3.5 mr-2 text-disaster-red" />
                <span>24/7 Emergency support</span>
              </div>
              
              <h2 className="text-3xl font-bold mb-4">AI-Powered Assistance</h2>
              
              <p className="text-muted-foreground mb-6">
                Our advanced AI chatbot provides immediate emergency guidance, evacuation routes, shelter information, and critical resources during disaster situations.
              </p>
              
              <ul className="space-y-3 mb-8">
                {[
                  'Real-time emergency response guidance',
                  'Location-based evacuation routes and shelter information',
                  'Medical and first aid instructions',
                  'Direct connection to local emergency services',
                ].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary/10 text-primary mr-2 mt-0.5">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link
                to="/chat"
                className="inline-flex items-center justify-center px-6 py-3 bg-disaster-red text-white rounded-lg font-medium hover:bg-disaster-red/90 transition-all shadow-button"
              >
                Get Emergency Help
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            <div className="lg:order-1 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="h-[550px]">
                <ChatInterface />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Grid */}
      <section className="py-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center mb-16 animate-fade-in">
          <h2 className="text-3xl font-bold mb-4">Comprehensive Disaster Management</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            DisasterScope combines cutting-edge AI technology with real-time data to provide a complete disaster management solution.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[
            {
              icon: <Shield className="h-6 w-6 text-disaster-blue" />,
              title: 'Early Warning System',
              description: 'Receive timely alerts about potential disasters before they occur, giving you precious time to prepare and evacuate if necessary.',
            },
            {
              icon: <BarChart2 className="h-6 w-6 text-disaster-blue" />,
              title: 'Risk Assessment',
              description: 'AI-powered risk prediction identifies vulnerable areas and forecasts potential disaster impacts based on historical and real-time data.',
            },
            {
              icon: <CloudLightning className="h-6 w-6 text-disaster-blue" />,
              title: 'Weather Intelligence',
              description: 'Advanced weather monitoring and analysis to predict storms, floods, and other weather-related disasters with high accuracy.',
            },
            {
              icon: <Radio className="h-6 w-6 text-disaster-red" />,
              title: 'Emergency Communications',
              description: 'Maintain critical communications during disasters with our resilient messaging system and emergency broadcast channels.',
            },
            {
              icon: <AlertTriangle className="h-6 w-6 text-disaster-red" />,
              title: 'Community Reporting',
              description: 'Crowdsourced disaster reporting with AI verification ensures accurate, real-time situation awareness from those on the ground.',
            },
            {
              icon: <MapIcon className="h-6 w-6 text-disaster-red" />,
              title: 'Resource Allocation',
              description: 'Optimize the distribution of emergency resources like food, water, and medical supplies to maximize impact and save lives.',
            },
          ].map((feature, index) => (
            <div 
              key={index} 
              className="p-6 rounded-2xl border bg-card hover:shadow-lg transition-all animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4 mx-auto">
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium mb-2 text-center">{feature.title}</h3>
              <p className="text-muted-foreground text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-1 px-3 mb-4 border rounded-full bg-muted/50 text-sm font-medium text-muted-foreground">
            <AlertTriangle className="h-3.5 w-3.5 mr-2 text-disaster-red" />
            <span>Be prepared, stay safe</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to enhance your disaster readiness?</h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Join thousands of communities and emergency management professionals using DisasterScope to save lives and minimize disaster impacts.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/chat"
              className="inline-flex items-center justify-center px-6 py-3 bg-disaster-blue text-white rounded-lg font-medium hover:bg-disaster-blue/90 transition-all shadow-button"
            >
              Get Emergency Assistance
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            
            <Link
              to="/report"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-foreground border rounded-lg font-medium hover:bg-muted/10 transition-all shadow-button"
            >
              Report a Disaster
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
