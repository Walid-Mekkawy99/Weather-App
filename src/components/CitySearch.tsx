
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface City {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

interface CitySearchProps {
  onCitySelect: (city: City) => void;
}

const CitySearch: React.FC<CitySearchProps> = ({ onCitySelect }) => {
  const [query, setQuery] = useState('');
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // محاكاة البحث عن المدن
  const searchCities = async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setCities([]);
      return;
    }

    setIsLoading(true);
    
    // محاكاة استجابة API مع مدن حقيقية
    const mockCities = [
      { name: 'الرياض', country: 'السعودية', lat: 24.7136, lon: 46.6753 },
      { name: 'جدة', country: 'السعودية', lat: 21.5428, lon: 39.1728 },
      { name: 'دبي', country: 'الإمارات', lat: 25.2048, lon: 55.2708 },
      { name: 'القاهرة', country: 'مصر', lat: 30.0444, lon: 31.2357 },
      { name: 'لندن', country: 'المملكة المتحدة', lat: 51.5074, lon: -0.1278 },
      { name: 'نيويورك', country: 'الولايات المتحدة', lat: 40.7128, lon: -74.0060 },
      { name: 'طوكيو', country: 'اليابان', lat: 35.6762, lon: 139.6503 },
      { name: 'باريس', country: 'فرنسا', lat: 48.8566, lon: 2.3522 },
    ];

    // تصفية المدن بناءً على البحث
    const filteredCities = mockCities.filter(city => 
      city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.country.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setTimeout(() => {
      setCities(filteredCities);
      setIsLoading(false);
    }, 300);
  };

  useEffect(() => {
    searchCities(query);
  }, [query]);

  const handleCitySelect = (city: City) => {
    onCitySelect(city);
    setQuery(city.name);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="ابحث عن مدينة..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="pl-10 pr-4 py-3 text-lg bg-white/90 backdrop-blur-sm border-2 border-white/20 rounded-xl focus:border-blue-400 transition-all duration-300"
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-blue-500" />
        )}
      </div>
      
      {isOpen && cities.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm border border-white/20 rounded-xl shadow-2xl overflow-hidden z-50 animate-fade-in">
          {cities.map((city, index) => (
            <button
              key={`${city.name}-${city.country}`}
              onClick={() => handleCitySelect(city)}
              className="w-full flex items-center gap-3 p-4 hover:bg-blue-50 transition-colors duration-200 border-b border-gray-100/50 last:border-b-0"
            >
              <MapPin className="h-4 w-4 text-blue-500" />
              <div className="text-right flex-1">
                <div className="font-medium text-gray-800">{city.name}</div>
                <div className="text-sm text-gray-500">{city.country}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CitySearch;
