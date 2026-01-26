import { Country } from "country-state-city";

export const countries = Country.getAllCountries().map((c) => ({
  label: c.name,
  value: c.isoCode,
  phone: c.phonecode,
  lat: c.latitude,
  lng: c.longitude,
}));
