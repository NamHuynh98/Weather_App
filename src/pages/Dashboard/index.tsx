import React from "react";
import DetailWeather from "../../components/DetailWeather";
import styles from "./Dashboard.module.scss";
import iconPlus from "../../assets/add.svg";
import ModalAddCity from "../../components/ModalAddCity";
import weatherApi, { WeatherType } from "../../apis/weatherApi";
import ScreenLoading from "../../components/ScreenLoading";
import ToastComponent, { TYPE_TOAST } from "../../components/ToastComponent";
import CardWeather from "../../components/CardWeather";
import forecastApi, { Forecast } from "../../apis/forecastApi";
import geolocationApi from "../../apis/geolocationApi";
import { NAME_CITY_DEFAULT } from "../../constant/utils";
import { Button, Form, InputGroup } from "react-bootstrap";

const Dashboard = () => {
  const [searchNameCity, setSearchNameCity] = React.useState<string>("");
  const [isSearching, setIsSearching] = React.useState<boolean>(false);
  const [isShowModal, setIsShowModal] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [toastDetail, setToastDetail] = React.useState<{
    msg: string;
    type: string;
  } | null>(null);
  const [listWeatherCities, setListWeatherCities] = React.useState<
    Array<WeatherType>
  >([]);
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

  const onSearchCity = (nameCity: string) => {
    setIsSearching(true);
    geolocationApi({ nameCity: nameCity })
      .then((data) => {
        forecastApi({ lat: data.lat, lon: data.lon })
          .then((data) => {
            setForecast(data);
          })
          .finally(() => {
            setIsSearching(false);
          });
      })
      .catch(() => {
        setToastDetail({
          type: TYPE_TOAST.DANGER,
          msg: "city not found",
        });
        setIsSearching(false);
      });
  };

  const handleLoadCity = (nameCity: string) => {
    setIsLoading(true);
    weatherApi({ nameCity })
      .then((data) => {
        const listData: Array<WeatherType> = [...listWeatherCities, data];
        const listCitiesName: Array<string> = listData.map((data) => data.name);
        setIsShowModal(false);
        setToastDetail(null);
        setListWeatherCities(listData);
        localStorage.setItem("store_weathers", JSON.stringify(listCitiesName));
      })
      .catch((error) => {
        setToastDetail({
          type: TYPE_TOAST.DANGER,
          msg: error.response.data.message,
        });
      })
      .finally(() => setIsLoading(false));
  };

  const loadData = async (
    listCitiesParam: string[],
    location: { lon: number; lat: number }
  ) => {
    const promises = listCitiesParam.map((item: string) =>
      weatherApi({ nameCity: item })
    );
    setIsLoading(true);
    await Promise.all(promises)
      .then((result) => {
        localStorage.setItem("store_weathers", JSON.stringify(listCitiesParam));
        setIsShowModal(false);
        setListWeatherCities([...result] as Array<WeatherType>);
      })
      .then(() => {
        forecastApi({ lon: location.lon, lat: location.lat })
          .then((data) => setForecast(data))
          .catch(console.log);
      })
      .finally(() => setIsLoading(false));
  };

  const onClearItem = (nameCity: string) => {
    const listCities: Array<WeatherType> = listWeatherCities.filter(
      (city: WeatherType) => city.name !== nameCity
    );
    localStorage.setItem(
      "store_weathers",
      JSON.stringify([...listCities.map((city) => city.name)])
    );
    setListWeatherCities([...listCities]);
  };

  React.useEffect(() => {
    const store: string[] = JSON.parse(localStorage.getItem("store_weathers")!);
    geolocationApi({ nameCity: NAME_CITY_DEFAULT }).then((data) => {
      loadData(store || [], { lat: data.lat, lon: data.lon });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {toastDetail && (
        <ToastComponent
          msg={toastDetail!.msg}
          show={!!toastDetail}
          onClose={() => setToastDetail(null)}
          type={toastDetail!.type}
        />
      )}
      <InputGroup size="lg" className="mb-1 w-50 ms-4">
        <InputGroup.Text id="inputGroup-sizing-sm">
          Search Name City
        </InputGroup.Text>
        <Form.Control
          disabled={isLoading}
          onChange={(e) => setSearchNameCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSearchCity(searchNameCity);
          }}
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
        />
        <Button
          disabled={isSearching}
          onClick={() => onSearchCity(searchNameCity)}
        >
          Search
        </Button>
      </InputGroup>
      <ScreenLoading isLoading={isLoading} />
      <CardWeather forecast={forecast} isSearching={isSearching} />
      <p className="ms-4 fw-bolder fs-3 text-gray">Weather list by city</p>
      <div className={styles.wrapperCard}>
        {listWeatherCities.map((city, index) => (
          <DetailWeather key={index} weather={city} onClearItem={onClearItem} />
        ))}
        <div
          className={styles.cardAddCity}
          onClick={() => setIsShowModal(true)}
        >
          <img src={iconPlus} alt="icon add" />
          <span>Add City</span>
        </div>
        <ModalAddCity
          show={isShowModal}
          isLoading={isLoading}
          onHide={() => {
            if (!isLoading) {
              setIsShowModal(false);
              setToastDetail(null);
            }
          }}
          onSendCity={handleLoadCity}
        />
      </div>
    </>
  );
};

export default Dashboard;
