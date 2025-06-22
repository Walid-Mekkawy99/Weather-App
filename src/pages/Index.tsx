
import React from 'react';
import CitySearch from '@/components/CitySearch';
import WeatherCard from '@/components/WeatherCard';
import FavoritesList from '@/components/FavoritesList';
import ThemeToggle from '@/components/ThemeToggle';
import { useWeatherData } from '@/hooks/useWeatherData';
import { Loader2, CloudSun } from 'lucide-react';

const Index = () => {
  const {
    currentWeather,
    favorites,
    isLoading,
    updateWeather,
    toggleFavorite,
    removeFromFavorites,
    isFavorite,
  } = useWeatherData();

  const handleCitySelect = (city: any) => {
    updateWeather(city);
  };

  const handleFavoriteSelect = (favorite: any) => {
    updateWeather({
      name: favorite.city,
      country: favorite.country,
      lat: favorite.lat,
      lon: favorite.lon,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <CloudSun className="h-8 w-8 text-white" />
              <h1 className="text-2xl font-bold text-white">
                تطبيق الطقس
              </h1>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <CitySearch onCitySelect={handleCitySelect} />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Weather Display */}
          <div className="lg:col-span-2">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-96 bg-white/20 backdrop-blur-sm rounded-2xl">
                <Loader2 className="h-12 w-12 text-white animate-spin mb-4" />
                <p className="text-white text-lg">جاري تحميل بيانات الطقس...</p>
              </div>
            ) : currentWeather ? (
              <WeatherCard
                weatherData={currentWeather}
                isFavorite={isFavorite}
                onToggleFavorite={toggleFavorite}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-96 bg-white/20 backdrop-blur-sm rounded-2xl">
                <CloudSun className="h-16 w-16 text-white/60 mb-4" />
                <p className="text-white text-lg">ابحث عن مدينة لعرض بيانات الطقس</p>
              </div>
            )}
          </div>

          {/* Favorites Sidebar */}
          <div className="lg:col-span-1">
            <FavoritesList
              favorites={favorites}
              onCitySelect={handleFavoriteSelect}
              onRemoveFavorite={removeFromFavorites}
            />
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-center">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CloudSun className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-white font-semibold mb-2">بيانات دقيقة</h3>
            <p className="text-white/80 text-sm">
              احصل على أحدث بيانات الطقس لأي مدينة في العالم
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-center">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CloudSun className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-white font-semibold mb-2">مدن مفضلة</h3>
            <p className="text-white/80 text-sm">
              احفظ مدنك المفضلة للوصول السريع إليها
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-center">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CloudSun className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-white font-semibold mb-2">واجهة حديثة</h3>
            <p className="text-white/80 text-sm">
              تصميم متجاوب وجميل يعمل على جميع الأجهزة
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
