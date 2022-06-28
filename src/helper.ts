import { cellTypeEnum } from "./enums"
import { CountryProps } from "./types"

export const mapCountryData = (country: CountryProps) => {
  return ([
    { label: 'Flag', source: country.flag, type: cellTypeEnum.IMAGE },
    { label: 'Name', source: country.name, type: cellTypeEnum.TEXT },
    { label: 'Code', source: country.code, type: cellTypeEnum.TEXT },
    { label: 'Capital', source: country.capitalName, type: cellTypeEnum.TEXT },
    { label: 'Region', source: country.region, type: cellTypeEnum.TEXT },
    { label: 'Subregion', source: country.subregion, type: cellTypeEnum.TEXT },
    { label: 'Latitude, longitude', source: country.latLng, type: cellTypeEnum.ARRAY},
    { label: 'Population', source: country.population, type: cellTypeEnum.NUMBER, style: 'population'},
  ])
}