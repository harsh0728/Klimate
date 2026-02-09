import CurrentWeather from '@/components/current-weather'
import { FavoriteCities } from '@/components/favorite-cities'
import HourlyTemperature from '@/components/hourly-temperature'
import WeatherSkeleton from '@/components/loading-skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import WeatherDetails from '@/components/weather-details'
import WeatherForecast from '@/components/weather-forecast'
import { useGeolocation } from '@/hooks/use-geolocation'
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from '@/hooks/use-weather'
import { AlertCircleIcon, MapPin, RefreshCw } from 'lucide-react'
import React from 'react'

const WeatherDashboard = () => {
  const {coordinates,error:locationError,getLocation,isLoading:loactionLoading}=useGeolocation();

  const weatherQuery=useWeatherQuery(coordinates);
  const forecastQuery=useForecastQuery(coordinates);
  const locationQuery=useReverseGeocodeQuery(coordinates);
  const locationName = locationQuery.data?.[0];
  console.log("forecastQuery",forecastQuery.data);
  


  //console.log("weatherquery:",weatherQuery.data,"forecastQuery",forecastQuery,"locationQuery",locationQuery);

  const handleRefresh=()=>{
    getLocation();
    if (coordinates){
      // reload weather data
      weatherQuery.refetch();
      forecastQuery.refetch();
      locationQuery.refetch();
    }
  }

  if (loactionLoading){
      return <WeatherSkeleton/>
    }

    if (locationError) {
      return (
        <Alert variant="destructive" className="max-w-md">
          <AlertCircleIcon className='h-4 w-4'/>
          <AlertTitle>Location Error</AlertTitle>
          <AlertDescription className='flex flex-col gap-4'>
            <p>{locationError}</p>
            <Button onClick={getLocation} variant={"outline"} className='w-fit'>
              <MapPin className='mr-2 h-4 w-4'/>Enable Location
            </Button>
          </AlertDescription>
        </Alert>
      );
    }
    if (!coordinates) {
      return (
        <Alert variant="destructive" className="max-w-md">
          <AlertTitle>Location Required</AlertTitle>
          <AlertDescription className='flex flex-col gap-4'>
            <p>Please Enable location access to see your local weather</p>
            <Button onClick={getLocation} variant={"outline"} className='w-fit'>
              <MapPin className='mr-2 h-4 w-4'/>Enable Location
            </Button>
          </AlertDescription>
        </Alert>
      );
    }
  
  return (
    <div className='space-y-4'>
      {/* Favourite Cities */}
      <FavoriteCities/>
      <div className="flex items-center justify-between ">
          <h1 className='text-xl font-bold tracking-tight'>My Location</h1>
          <Button variant={"outline"} size={"icon"} 
          onClick={handleRefresh} 
          disabled={weatherQuery.isFetching || forecastQuery.isFetching}
          >
            <RefreshCw className={`h-4 w-4 ${weatherQuery.isFetching?"animate-spin":""}`}/>
          </Button>
      </div>

      {/* Current and Hourly weather */}
      <div className="grid gap-6">
        {/* current weather */}
        <div className="flex flex-col lg:flex flex-row gap-4 ">
          {weatherQuery.data && (<CurrentWeather data={weatherQuery.data} locationName={locationName}/>)}
          {/* hourly temperature */}
          {forecastQuery.data && <HourlyTemperature data={forecastQuery.data}/>}
        </div>
        <div className="grid gap-6 md:grid-cols-2 items-start">
          {/* details */}
          {weatherQuery.data && <WeatherDetails data={weatherQuery.data}/>}
          {/* forecast */}
          {forecastQuery.data && <WeatherForecast data={forecastQuery.data}/>}
        </div>
      </div>
    </div>
  )
}

export default WeatherDashboard