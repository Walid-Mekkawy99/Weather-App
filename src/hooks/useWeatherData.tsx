
import { useState, useEffect } from 'react';

interface City {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

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

export const useWeatherData = () => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [favorites, setFavorites] = useState<WeatherData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // محاكاة استدعاء API للحصول على بيانات الطقس
  const fetchWeatherData = async (city: City): Promise<WeatherData> => {
    setIsLoading(true);
    
    // محاكاة تأخير الشبكة
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // بيانات طقس تجريبية
    const mockWeatherData: WeatherData = {
      city: city.name,
      country: city.country,
      temperature: Math.floor(Math.random() * 35) + 15, // درجة حرارة عشوائية بين 15-50
      condition: ['sunny', 'cloudy', 'partly cloudy', 'rainy'][Math.floor(Math.random() * 4)],
      humidity: Math.floor(Math.random() * 40) + 40, // رطوبة بين 40-80%
      windSpeed: Math.floor(Math.random() * 30) + 5, // سرعة رياح بين 5-35 km/h
      visibility: Math.floor(Math.random() * 5) + 10, // رؤية بين 10-15 km
      description: ['مشمس', 'غائم جزئياً', 'غائم', 'ممطر'][Math.floor(Math.random() * 4)],
      lat: city.lat,
      lon: city.lon,
    };
    
    setIsLoading(false);
    return mockWeatherData;
  };

  // تحديث الطقس للمدينة المحددة
  const updateWeather = async (city: City) => {
    try {
      const weatherData = await fetchWeatherData(city);
      setCurrentWeather(weatherData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  // إضافة مدينة للمفضلة
  const addToFavorites = async (city: City) => {
    try {
      const weatherData = await fetchWeatherData(city);
      const isAlreadyFavorite = favorites.some(fav => 
        fav.city === city.name && fav.country === city.country
      );
      
      if (!isAlreadyFavorite) {
        const updatedFavorites = [...favorites, weatherData];
        setFavorites(updatedFavorites);
        localStorage.setItem('weatherFavorites', JSON.stringify(updatedFavorites));
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  // إزالة مدينة من المفضلة
  const removeFromFavorites = (cityToRemove: WeatherData) => {
    const updatedFavorites = favorites.filter(fav => 
      !(fav.city === cityToRemove.city && fav.country === cityToRemove.country)
    );
    setFavorites(updatedFavorites);
    localStorage.setItem('weatherFavorites', JSON.stringify(updatedFavorites));
  };

  // التحقق من كون المدينة في المفضلة
  const isFavorite = (city: string, country: string) => {
    return favorites.some(fav => fav.city === city && fav.country === country);
  };

  // تبديل حالة المفضلة
  const toggleFavorite = async () => {
    if (!currentWeather) return;
    
    if (isFavorite(currentWeather.city, currentWeather.country)) {
      removeFromFavorites(currentWeather);
    } else {
      await addToFavorites({
        name: currentWeather.city,
        country: currentWeather.country,
        lat: currentWeather.lat,
        lon: currentWeather.lon,
      });
    }
  };

  // تحميل المفضلة من التخزين المحلي عند التحميل
  useEffect(() => {
    const savedFavorites = localStorage.getItem('weatherFavorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error loading favorites from localStorage:', error);
      }
    }

    // تحميل طقس الرياض كافتراضي
    const defaultCity = { name: 'الرياض', country: 'السعودية', lat: 24.7136, lon: 46.6753 };
    updateWeather(defaultCity);
  }, []);

  return {
    currentWeather,
    favorites,
    isLoading,
    updateWeather,
    toggleFavorite,
    removeFromFavorites,
    isFavorite: currentWeather ? isFavorite(currentWeather.city, currentWeather.country) : false,
  };
};
