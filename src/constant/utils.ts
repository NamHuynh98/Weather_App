export const UNIX_TIME: number = 1000;
export const UNIX_KELVIN: number = 273.15;
export const NAME_CITY_DEFAULT: string = "ha noi";

export const kelvinToCelsius = (k: number) => {
  return (k - UNIX_KELVIN).toFixed(0);
};

export function parseQueryParams() {
  const result: { [key: string]: any } = {};
  if (!window.location.href.match(/\?/)) {
    return result;
  }
  const query = window.location.href.replace(/.*\?/, "").split("&");
  query.forEach((r) => {
    const pair = r.split("=");
    const val = decodeURI(pair[1]);
    if (pair[0].match(/\[\]$/)) {
      const key = pair[0].replace("[]", "");
      if (!result[key]) {
        result[key] = [];
      }
      if (val !== "") {
        result[key].push(val);
      }
    } else {
      result[pair[0]] = val;
    }
  });
  return result;
}
