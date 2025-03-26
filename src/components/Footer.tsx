
import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Twitter, Facebook, Instagram, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-disaster-red" />
              <span className="text-lg font-semibold">
                Disaster<span className="text-disaster-blue font-bold">Scope</span>
              </span>
            </Link>
            
            <p className="text-sm text-muted-foreground">
              AI-powered disaster management platform providing real-time alerts, risk prediction, and emergency assistance.
            </p>
            
            <div className="flex space-x-3 pt-2">
              <a href="#" className="p-2 rounded-full bg-muted/50 text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-muted/50 text-muted-foreground hover:text-foreground transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-muted/50 text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/map" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Live Disaster Map
                </Link>
              </li>
              <li>
                <Link to="/chat" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Emergency Assistance
                </Link>
              </li>
              <li>
                <Link to="/report" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Report Disaster
                </Link>
              </li>
              <li>
                <Link to="/prediction" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Risk Prediction
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Resources
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="font-medium mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-disaster-blue" />
                <span>support@disasterscope.ai</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-disaster-blue" />
                <span>Emergency: +1 (800) 555-0123</span>
              </li>
              <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-disaster-blue flex-shrink-0 mt-0.5" />
                <span>123 Safety Avenue, Resilience City, CA 94103, USA</span>
              </li>
            </ul>
          </div>
          
          {/* Emergency Resources */}
          <div>
            <h3 className="font-medium mb-4">Emergency Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <span>FEMA Disaster Assistance</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <span>Red Cross Emergency App</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <span>National Weather Service</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <span>CDC Emergency Preparedness</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} DisasterScope AI. All rights reserved.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Data Usage
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
