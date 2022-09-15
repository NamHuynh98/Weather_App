import React from "react";
import styles from "./DetailWeather.module.scss";
import { useHistory } from "react-router-dom";
import * as path from "../../constant/router";
import { WeatherType } from "../../apis/weatherApi";

type Props = {
  weather: WeatherType;
  onClearItem: (nameCity: string) => void;
};

const DetailWeather: React.FC<Props> = ({ weather, onClearItem }) => {
  const history = useHistory();
  return (
    <div className={styles.container}>
      <button
        className={styles.btnClear}
        onClick={() => onClearItem(weather.name)}
      >
        &#x2718;
      </button>
      <div
        onClick={() =>
          history.push({
            pathname: `${path.DASHBOARD}${path.DETAIL}`,
            search: `lon=${weather.coord.lon}&lat=${weather.coord.lat}`,
          })
        }
      >
        <h4>{weather.name}</h4>
        <div className="d-flex">
          <img src={weather.icon} alt="icon-weather" />
          <div className={styles.content}>
            <p>{weather.time}</p>
            <p>
              {weather.temp_min}&#8451;/{weather.temp_max}&#8451;
            </p>
            <p>{weather.state}</p>
            <p>{weather.humidity}% Rain</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailWeather;
