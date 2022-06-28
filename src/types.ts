import { cellTypeEnum, sortOrderEnum } from "./enums";

export type CountryProps = {
  flag: string;
  name: string;
  code: string;
  capitalName: string;
  region: string;
  subregion: string;
  latLng: number[];
  population: number;
}

export type CountryContextType = {
  countries: CountryProps;
  sortCountries: (col: string, order: sortOrderEnum) => void;
  filterCountries: (name: string) => void;
  searchString: string;
}

export type GridRowProps = {
  label: string;
  source: string | number | number[];
  type: cellTypeEnum;
  style?: string;
}