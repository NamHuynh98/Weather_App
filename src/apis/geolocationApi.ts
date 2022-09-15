import axios from "axios";
import * as api from "../constant/api";

export type GeolocationType = {
  name: string;
  lat: number;
  lon: number;
};

interface IParams {
  nameCity: string;
}

async function geolocationApi(params: IParams) {
  const { nameCity } = params;
  const res = await axios({
    method: "GET",
    url: `${api.API_GEOLOCATION}direct?q=${nameCity}&limit=1&appid=${api.KEY}`,
  });
  const data = res.data[0];
  return {
    name: data.name,
    lat: data.lat,
    lon: data.lon,
  } as GeolocationType;
}

export default geolocationApi;
