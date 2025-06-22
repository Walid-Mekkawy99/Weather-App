
import React from 'react';
import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer, Eye, Star, StarOff } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  description: string;
  lat: number;
  lon: number;
}

interface WeatherCardProps {
  weatherData: WeatherData;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ 
  weatherData, 
  isFavorite, 
  onToggleFavorite 
}) => {
  const getWeatherIcon = (condition: string) => {
    const iconClass = "h-16 w-16 text-white drop-shadow-lg";
    
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return <Sun className={iconClass} />;
      case 'cloudy':
      case 'partly cloudy':
        return <Cloud className={iconClass} />;
      case 'rainy':
      case 'rain':
        return <CloudRain className={iconClass} />;
      default:
        return <Sun className={iconClass} />;
    }
  };

  const getGradientClass = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return 'bg-sunset-gradient';
      case 'cloudy':
      case 'partly cloudy':
        return 'bg-weather-gradient';
      case 'rainy':
      case 'rain':
        return 'bg-night-gradient';
      default:
        return 'bg-weather-gradient';
    }
  };

  return (
    <Card className={`overflow-hidden shadow-2xl border-0 animate-fade-in ${getGradientClass(weatherData.condition)}`}>
      {/* Header with city name and favorite button */}
      <div className="p-6 pb-4">
        <div className="flex justify-between items-start mb-4">
          <div className="text-white">
            <h2 className="text-2xl font-bold">{weatherData.city}</h2>
            <p className="text-white/80">{weatherData.country}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleFavorite}
            className="text-white hover:bg-white/20 transition-colors duration-200"
          >
            {isFavorite ? (
              <Star className="h-5 w-5 fill-current" />
            ) : (
              <StarOff className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Main weather display */}
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="text-5xl font-light text-white mb-2">
              {weatherData.temperature}°
            </div>
            <div className="text-white/90 text-lg capitalize">
              {weatherData.description}
            </div>
          </div>
          <div className="flex-shrink-0">
            {getWeatherIcon(weatherData.condition)}
          </div>
        </div>
      </div>

      {/* Weather details */}
      <div className="bg-white/10 backdrop-blur-sm p-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <Wind className="h-5 w-5 text-white/80 mx-auto mb-2" />
            <div className="text-xs text-white/60 mb-1">الرياح</div>
            <div className="text-sm font-medium text-white">
              {weatherData.windSpeed} km/h
            </div>
          </div>
          
          <div className="text-center">
            <Droplets className="h-5 w-5 text-white/80 mx-auto mb-2" />
            <div className="text-xs text-white/60 mb-1">الرطوبة</div>
            <div className="text-sm font-medium text-white">
              {weatherData.humidity}%
            </div>
          </div>
          
          <div className="text-center">
            <Eye className="h-5 w-5 text-white/80 mx-auto mb-2" />
            <div className="text-xs text-white/60 mb-1">الرؤية</div>
            <div className="text-sm font-medium text-white">
              {weatherData.visibility} km
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WeatherCard;
