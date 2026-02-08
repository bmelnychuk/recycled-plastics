import { FC } from 'react';
import { countries } from 'country-data-list';

export const CountryName: FC<{ countryCode: string }> = ({ countryCode }) => {
  // @ts-ignore
  const countryName = countries[countryCode]?.name || countryCode;
  return <>{countryName}</>;
};
