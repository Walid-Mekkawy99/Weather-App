
import React from 'react';
import { Heart, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface FavoriteCity {
  name: string;
  country: string;
  temperature: number;
  condition: string;
  lat: number;
  lon: number;
}

interface FavoritesListProps {
  favorites: FavoriteCity[];
  onCitySelect: (city: FavoriteCity) => void;
  onRemoveFavorite: (city: FavoriteCity) => void;
}

const FavoritesList: React.FC<FavoritesListProps> = ({
  favorites,
  onCitySelect,
  onRemoveFavorite
}) => {
  if (favorites.length === 0) {
    return (
      <Card className="p-8 text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600 mb-2">
          لا توجد مدن مفضلة
        </h3>
        <p className="text-gray-400">
          أضف مدناً إلى قائمة المفضلة لسهولة الوصول إليها
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-8 max-h-80 overflow-y-auto">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <Heart className="h-5 w-5 text-red-400" />
        المدن المفضلة
      </h3>
      
      <div className="grid gap-3">
        {favorites.map((city, index) => (
          <Card 
            key={`${city.name}-${city.country}`}
            className="p-4 bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer animate-slide-in"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => onCitySelect(city)}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div>
                    <h4 className="font-medium text-gray-800">{city.name}</h4>
                    <p className="text-sm text-gray-500">{city.country}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-light text-gray-800">
                      {city.temperature}°
                    </div>
                    <div className="text-xs text-gray-500 capitalize">
                      {city.condition}
                    </div>
                  </div>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveFavorite(city);
                }}
                className="text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors duration-200"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;
