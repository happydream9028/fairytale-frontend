export interface IWeather {
    id: number;
    place: string;
    latitude: string;
    longitude: string;  
}

  export interface ICreateWeather {
    place: string;
    latitude: number;
    longitude: number;
  }