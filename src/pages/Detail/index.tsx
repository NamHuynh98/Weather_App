import React from "react";
import { Link, useLocation } from "react-router-dom";
import { DASHBOARD } from "../../constant/router";
import forecastApi, { Forecast } from "../../apis/forecastApi";
import ScreenLoading from "../../components/ScreenLoading";
import { parseQueryParams } from "../../constant/utils";
import CardWeather from "../../components/CardWeather";
import { Button } from "react-bootstrap";

const Detail = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [forecast, setForecast] = React.useState<Forecast>({
    current: {
      time: "",
      main: "",
      lat: 0,
      lon: 0,
      speedWind: 0,
      humidity: 0,
      temperature: 0,
      icon: "",
    },
    hourly: [],
    daily: [],
  });

  React.useEffect(() => {
    setIsLoading(true);
    const lon: number = parseQueryParams()["lon"];
    const lat: number = parseQueryParams()["lat"];
    forecastApi({ lon, lat })
      .then((data) => setForecast(data))
      .catch(console.log)
      .finally(() => setIsLoading(false));
  }, [location.search]);

  return (
    <>
      <ScreenLoading isLoading={isLoading} />
      <CardWeather forecast={forecast} />
      <Link to={DASHBOARD}>
        <Button className="btn btn-primary ms-4">
          <span>&#10094;</span> Dashboard
        </Button>
      </Link>
    </>
  );
};

export default Detail;
