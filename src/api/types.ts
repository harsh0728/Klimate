/* =======================
   Shared Base Interfaces
======================= */

export interface Coordinates {
  lat: number
  lon: number
}

export interface WeatherCondition {
  id: number
  main: string
  description: string
  icon: string
}

export interface Clouds {
  all: number
}

export interface Wind {
  speed: number
  deg: number
  gust?: number
}

export interface Rain {
  "1h": number
}

/* =======================
   Main Blocks
======================= */

export interface WeatherMain {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
  sea_level?: number
  grnd_level?: number
}

export interface ForecastMain extends WeatherMain {
  temp_kf: number
}
export interface WeatherData {
  coord: Coordinates
  weather: WeatherCondition[]
  base: string

  main: WeatherMain

  visibility: number
  wind: Wind
  rain?: Rain
  clouds: Clouds

  dt: number

  sys: {
    type?: number
    id?: number
    country: string
    sunrise: number
    sunset: number
  }

  timezone: number
  id: number
  name: string
  cod: number
}
export interface ForecastData {
  cod: string
  message: number
  cnt: number

  list: {
    dt: number
    main: ForecastMain
    weather: WeatherCondition[]
    clouds: Clouds
    wind: Wind
    visibility: number
    pop: number
    rain?: Rain
    sys: {
      pod: "d" | "n"
    }
    dt_txt: string
  }[]

  city: {
    id: number
    name: string
    coord: Coordinates
    country: string
    population: number
    timezone: number
    sunrise: number
    sunset: number
  }
}

export interface GeocodingResponse{
    name:string,
    local_names?:Record<string,string>,
    lat:number,
    lon:number,
    country:string,
    state?:string

}