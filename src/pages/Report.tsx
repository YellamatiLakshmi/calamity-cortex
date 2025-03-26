
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ReportDisaster from '@/components/ReportDisaster';
import { Upload, AlertTriangle, Shield, Map, ChevronRight } from 'lucide-react';

const ReportPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-20 pb-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center mb-2">
              <Upload className="h-5 w-5 mr-2 text-disaster-red" />
              <h1 className="text-2xl font-bold">Report a Disaster</h1>
            </div>
            <p className="text-muted-foreground">
              Help us maintain accurate disaster information by reporting events in your area
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Report Form */}
            <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <ReportDisaster />
            </div>
            
            {/* Sidebar with information */}
            <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {/* About Reporting */}
              <div className="p-5 rounded-xl border bg-card">
                <h3 className="font-medium mb-3 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-disaster-red" />
                  About Disaster Reporting
                </h3>
                
                <p className="text-sm text-muted-foreground mb-4">
                  Your reports are crucial in helping emergency services respond effectively to disaster situations. All reports are verified using AI and cross-referenced with official sources.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center p-3 rounded-lg bg-muted/50">
                    <div className="p-1.5 rounded-full bg-primary/10 mr-3">
                      <Shield className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-xs">Reports are anonymous and your data is protected</span>
                  </div>
                  
                  <div className="flex items-center p-3 rounded-lg bg-muted/50">
                    <div className="p-1.5 rounded-full bg-primary/10 mr-3">
                      <Map className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-xs">Location sharing helps us pinpoint disaster areas accurately</span>
                  </div>
                </div>
              </div>
              
              {/* Reporting Guidelines */}
              <div className="p-5 rounded-xl border bg-card">
                <h3 className="font-medium mb-3">Reporting Guidelines</h3>
                
                <ul className="space-y-2.5">
                  {[
                    'Include clear photos when possible',
                    'Be specific about the location',
                    'Note the disaster type and severity',
                    'Mention if there are people in immediate danger',
                    'Report any infrastructure damage',
                    'Include time when you first observed the event',
                  ].map((guideline, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <ChevronRight className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{guideline}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* What Happens Next */}
              <div className="p-5 rounded-xl border bg-card">
                <h3 className="font-medium mb-3">What Happens Next</h3>
                
                <div className="space-y-4">
                  <div className="relative pl-6 pb-6 border-l border-dashed">
                    <div className="absolute top-0 left-0 -translate-x-1/2 h-4 w-4 rounded-full bg-disaster-blue flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-background"></div>
                    </div>
                    <h4 className="text-sm font-medium mb-1">Verification</h4>
                    <p className="text-xs text-muted-foreground">
                      Our AI system verifies your report by cross-referencing with satellite data and other reports.
                    </p>
                  </div>
                  
                  <div className="relative pl-6 pb-6 border-l border-dashed">
                    <div className="absolute top-0 left-0 -translate-x-1/2 h-4 w-4 rounded-full bg-disaster-blue flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-background"></div>
                    </div>
                    <h4 className="text-sm font-medium mb-1">Alert Generation</h4>
                    <p className="text-xs text-muted-foreground">
                      If verified, the system generates alerts for people in the affected area and emergency services.
                    </p>
                  </div>
                  
                  <div className="relative pl-6">
                    <div className="absolute top-0 left-0 -translate-x-1/2 h-4 w-4 rounded-full bg-disaster-blue flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-background"></div>
                    </div>
                    <h4 className="text-sm font-medium mb-1">Response Coordination</h4>
                    <p className="text-xs text-muted-foreground">
                      Emergency responders use this information to coordinate effective rescue and relief operations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ReportPage;
