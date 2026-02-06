import { countries } from "country-data-list";

export const getCountryName = (countryCode: string) => {
  // @ts-ignore
  return countries[countryCode].name;
};
