import axios from "axios";
import moment from "moment";
import * as api from "../constant/api";
import { kelvinToCelsius, UNIX_TIME } from "../constant/utils";
import iconCloud from "../assets/cloud.svg";

export type WeatherType = {
  name: string;
  time: string;
  temp_min: number;
  temp_max: number;
  state: string;
  humidity: number;
  icon: string;
  coord: {
    lat: number;
    lon: number;
  };
};

interface IParams {
  nameCity: string;
}

async function weatherApi(params: IParams) {
  const { nameCity } = params;
  const res = await axios({
    method: "GET",
    url: `${api.API}weather?q=${nameCity}&appid=${api.KEY}`,
  });
  const { data } = res;
  return {
    name: data.name,
    time: `${moment(data.dt * UNIX_TIME).format("dddd, DD.MM.YY")}`,
    temp_min: Number(kelvinToCelsius(data.main.temp_min)),
    temp_max: Number(kelvinToCelsius(data.main.temp_max)),
    state: data.weather[0].main,
    humidity: data.main.humidity,
    icon:
      data.weather[0].icon !== 0
        ? `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        : iconCloud,
    coord: data.coord,
  } as WeatherType;
}

export default weatherApi;
