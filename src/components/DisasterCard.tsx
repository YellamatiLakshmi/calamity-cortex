
import React from 'react';
import { cn } from '@/lib/utils';
import { Flame, CloudRain, Wind, AlertCircle } from 'lucide-react';

export type DisasterType = 'wildfire' | 'flood' | 'earthquake' | 'hurricane' | 'other';

interface DisasterCardProps {
  type: DisasterType;
  title: string;
  location: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  time: string;
  className?: string;
}

const DisasterCard: React.FC<DisasterCardProps> = ({
  type,
  title,
  location,
  severity,
  time,
  className,
}) => {
  const getIcon = () => {
    switch (type) {
      case 'wildfire':
        return <Flame className="h-5 w-5 text-disaster-red" />;
      case 'flood':
        return <CloudRain className="h-5 w-5 text-disaster-blue" />;
      case 'hurricane':
        return <Wind className="h-5 w-5 text-primary" />;
      default:
        return <AlertCircle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getSeverityClass = () => {
    switch (severity) {
      case 'low':
        return 'bg-green-500/10 text-green-600';
      case 'medium':
        return 'bg-amber-500/10 text-amber-600';
      case 'high':
        return 'bg-orange-500/10 text-orange-600';
      case 'critical':
        return 'bg-disaster-red/10 text-disaster-red';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div 
      className={cn(
        'relative group p-5 rounded-2xl border bg-card transition-all duration-300 hover:shadow-lg overflow-hidden',
        className
      )}
    >
      <div className="absolute top-0 left-0 w-1 h-full" style={{
        backgroundColor: type === 'wildfire' ? '#e11d48' : 
                         type === 'flood' ? '#1e40af' : 
                         type === 'hurricane' ? '#0284c7' : '#6b7280'
      }} />
      
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-full bg-card shadow-sm border">
            {getIcon()}
          </div>
          <div>
            <span className="text-xs font-medium uppercase text-muted-foreground">
              {type}
            </span>
            <h3 className="font-semibold text-lg leading-tight">{title}</h3>
          </div>
        </div>
        <span className={cn('px-2.5 py-0.5 rounded-full text-xs font-medium', getSeverityClass())}>
          {severity}
        </span>
      </div>
      
      <div className="text-sm text-muted-foreground mb-4">
        <div className="flex justify-between items-center">
          <span>{location}</span>
          <span className="text-xs">{time}</span>
        </div>
      </div>
      
      <div className="pt-3 mt-auto border-t flex justify-between items-center">
        <div className="pulse-dot">
          <span className="animate-pulse bg-disaster-red rounded-full h-3 w-3"></span>
        </div>
        <button className="text-sm font-medium text-primary hover:underline focus:outline-none">
          View details
        </button>
      </div>

      {/* Hover effect */}
      <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none" style={{
        background: type === 'wildfire' ? 'linear-gradient(135deg, rgba(225, 29, 72, 0.1), transparent)' : 
                   type === 'flood' ? 'linear-gradient(135deg, rgba(30, 64, 175, 0.1), transparent)' : 
                   type === 'hurricane' ? 'linear-gradient(135deg, rgba(2, 132, 199, 0.1), transparent)' : 
                   'linear-gradient(135deg, rgba(107, 114, 128, 0.1), transparent)'
      }} />
    </div>
  );
};

export default DisasterCard;
