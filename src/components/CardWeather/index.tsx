import React from "react";
import styles from "./CardWeather.module.scss";

import { Forecast } from "../../apis/forecastApi";
import { Nav } from "react-bootstrap";
import WeatherTime from "../WeatherTime";

type Props = {
  forecast: Forecast;
  isSearching?: boolean;
};

const CardWeather: React.FC<Props> = ({ forecast, isSearching = false }) => {
  const [selectedTab, setSelectedTab] = React.useState<string>("tab-hourly");

  return (
    <div className={styles.detailContainer}>
      {isSearching && (
        <div className={styles.loading}>
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      )}
      <h2>Longitude: {forecast.current.lon}</h2>
      <h2>Latitude: {forecast.current.lat}</h2>
      <div className={styles.detailInfo}>
        <div>
          <p>{forecast.current.time}</p>
          <p>{forecast.current.main}</p>
        </div>
        <div>
          <p className="d-flex align-items-center">
            Humidity: {forecast.current.humidity}%{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="ms-2"
              viewBox="0 0 16 16"
            >
              <path d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6ZM6.646 4.646l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448c.82-1.641 1.717-2.753 2.093-3.13Z" />
            </svg>
          </p>
          <p className="d-flex align-items-center">
            Wind: {forecast.current.speedWind}km/h{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="ms-2"
              viewBox="0 0 16 16"
            >
              <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5zm-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2zM0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5z" />
            </svg>
          </p>
        </div>
      </div>
      <div className={`${styles.degrees} mb-5`}>
        <img src={forecast.current.icon} alt="weather" />
        <span>{forecast.current.temperature}&#8451;</span>
      </div>
      <Nav
        variant="tabs"
        defaultActiveKey="tab-hourly"
        onSelect={(selectedKey) => selectedKey && setSelectedTab(selectedKey)}
      >
        <Nav.Item>
          <Nav.Link eventKey="tab-hourly">Hourly</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="tab-daily">Daily</Nav.Link>
        </Nav.Item>
      </Nav>
      <div className="d-flex w-100 px-2 py-3 overflow-auto">
        {selectedTab === "tab-hourly" && (
          <>
            {forecast.hourly.map((weatherHour, index) => (
              <WeatherTime key={index} weather={weatherHour} />
            ))}
          </>
        )}
        {selectedTab === "tab-daily" && (
          <>
            {forecast.daily.map((weatherDay, index) => (
              <WeatherTime key={index} weather={weatherDay} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default CardWeather;
