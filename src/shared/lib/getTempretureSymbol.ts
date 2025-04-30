import {TemperatureUnit} from "@/entities/weather/model/store";

export const getTemperatureSymbol = (temperatureUnit: TemperatureUnit) => (temperatureUnit === 'C' ? '°C' : '°F');