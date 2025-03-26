
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ChatInterface from '@/components/ChatInterface';
import { MessageSquare, AlertTriangle, LifeBuoy, Map, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ChatPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-20 pb-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center mb-2">
              <MessageSquare className="h-5 w-5 mr-2 text-disaster-red" />
              <h1 className="text-2xl font-bold">Emergency AI Assistant</h1>
            </div>
            <p className="text-muted-foreground">
              Get immediate disaster information and emergency guidance from our AI-powered chatbot
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chat Interface */}
            <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="h-[calc(100vh-240px)] min-h-[500px]">
                <ChatInterface />
              </div>
            </div>
            
            {/* Sidebar with additional resources */}
            <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {/* Emergency Actions */}
              <div className="p-5 rounded-xl border bg-card">
                <h3 className="font-medium mb-3 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-disaster-red" />
                  Emergency Actions
                </h3>
                
                <div className="space-y-3">
                  <Link
                    to="/report"
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="p-1.5 rounded-full bg-disaster-red/10 mr-3">
                        <AlertTriangle className="h-4 w-4 text-disaster-red" />
                      </div>
                      <span className="text-sm font-medium">Report a Disaster</span>
                    </div>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  
                  <Link
                    to="/map"
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="p-1.5 rounded-full bg-disaster-blue/10 mr-3">
                        <Map className="h-4 w-4 text-disaster-blue" />
                      </div>
                      <span className="text-sm font-medium">View Disaster Map</span>
                    </div>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  
                  <a
                    href="tel:911"
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="p-1.5 rounded-full bg-green-500/10 mr-3">
                        <LifeBuoy className="h-4 w-4 text-green-500" />
                      </div>
                      <span className="text-sm font-medium">Call Emergency Services</span>
                    </div>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
              
              {/* AI Assistant Capabilities */}
              <div className="p-5 rounded-xl border bg-card">
                <h3 className="font-medium mb-3">AI Assistant Capabilities</h3>
                
                <ul className="space-y-2.5">
                  {[
                    'Provide real-time disaster updates and alerts',
                    'Guide you through emergency procedures',
                    'Locate nearby shelters and emergency services',
                    'Offer first aid and survival instructions',
                    'Connect you with local authorities',
                    'Help find missing persons information',
                  ].map((capability, index) => (
                    <li key={index} className="flex text-sm">
                      <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary/10 text-primary mr-2 flex-shrink-0">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      <span className="text-muted-foreground">{capability}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Sample Questions */}
              <div className="p-5 rounded-xl border bg-card">
                <h3 className="font-medium mb-3">Sample Questions</h3>
                
                <div className="space-y-2">
                  {[
                    "What should I do during a wildfire?",
                    "Where is the nearest emergency shelter?",
                    "How do I prepare for a hurricane?",
                    "Is there flooding in my area?",
                    "First aid for burn injuries",
                    "Emergency evacuation routes",
                  ].map((question, index) => (
                    <button
                      key={index}
                      className="w-full text-left p-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded transition-colors"
                    >
                      {question}
                    </button>
                  ))}
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

export default ChatPage;
