import axios from "axios";
import moment from "moment";
import * as api from "../constant/api";
import iconCloud from "../assets/cloud.svg";
import { kelvinToCelsius, UNIX_TIME } from "../constant/utils";

export type CurrentForecast = {
  time: string;
  lon: number;
  lat: number;
  main: string;
  icon: string;
  speedWind: number;
  humidity: number;
  temperature: number | string;
};
export type TimeForecast = {
  time: string;
  icon: string;
  speedWind?: number;
  humidity: number;
  temperature: number | string;
};

export type Forecast = {
  current: CurrentForecast;
  hourly: Array<TimeForecast>;
  daily: Array<TimeForecast>;
};

interface IParams {
  lat: number;
  lon: number;
}

async function forecastApi(params: IParams) {
  const { lat, lon } = params;
  const res = await axios({
    method: "GET",
    url: `${api.API}onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${api.KEY}`,
  });
  const { current, hourly, daily } = res.data;
  return {
    current: {
      time: moment(current.dt * UNIX_TIME).format("dddd, DD/MM/YYYY"),
      lon: res.data.lon,
      lat: res.data.lat,
      main: current.weather[0].main,
      icon:
        current.weather[0].icon !== 0
          ? `http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`
          : iconCloud,
      speedWind: current.wind_speed,
      humidity: current.humidity,
      temperature: kelvinToCelsius(current.temp),
    },
    hourly: hourly.map((h: any) => ({
      time: moment(h.dt * UNIX_TIME).format("HH:MM"),
      icon:
        h.weather[0].icon !== 0
          ? `http://openweathermap.org/img/wn/${h.weather[0].icon}@2x.png`
          : iconCloud,
      humidity: h.humidity,
      temperature: kelvinToCelsius(h.temp),
    })),
    daily: daily.map((d: any) => ({
      time: moment(d.dt * UNIX_TIME).format("DD/MM/YYYY"),
      icon:
        d.weather[0].icon !== 0
          ? `http://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png`
          : iconCloud,
      humidity: d.humidity,
      speedWind: d.wind_speed,
      temperature: kelvinToCelsius(d.temp.day),
    })),
  } as Forecast;
}

export default forecastApi;
