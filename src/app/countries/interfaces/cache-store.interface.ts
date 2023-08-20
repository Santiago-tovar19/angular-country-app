import { Region } from './Region.type';
import { Country } from './country';

export interface CacheStore {
  byCapital: termCountries;
  byCountry: termCountries;
  byRegion: RegionConuntries;
}

export interface termCountries {
  term: string;
  countries: Country[];
}

export interface RegionConuntries {
  region: Region;
  countries: Country[];
}
