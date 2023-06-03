import { Gauge } from "./metrics";

// Prometheus metrics

const currentTemp = new Gauge({
  name: "homelab_expoter_current_temp",
  help: "Current temperature, in celsius",
});

const relativeHumidity = new Gauge({
  name: "homelab_exporter_relative_humidity",
  help: "The relative humidity, as a percentage",
});

/**
 * Fetches weather from BOM
 */
export async function fetchWeather() {
  if (!process.env.BOM_FORECAST_API_ENDPOINT) {
    throw new Error(
      "BOM_FORECAST_API_ENDPOINT environment variable is not set"
    );
  }
  const forecast = await fetch(process.env.BOM_FORECAST_API_ENDPOINT, {
    next: { revalidate: 60 },
  }).then((res) => res.json());
  const currentTempValue = forecast.observations.data[0].air_temp;
  currentTemp.set(currentTempValue);

  const relativeHumidityValue = forecast.observations.data[0].rel_hum;
  relativeHumidity.set(relativeHumidityValue);
}
