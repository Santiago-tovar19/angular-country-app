import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/Region.type';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';
  public cacheStore: CacheStore = {
    byCapital: {
      term: '',
      countries: [] as Country[],
    },
    byCountry: {
      term: '',
      countries: [] as Country[],
    },
    byRegion: {
      region: '',
      countries: [] as Country[],
    },
  };
  constructor(private httpClient: HttpClient) {}

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.httpClient
      .get<Country[]>(url)
      .pipe(catchError((err) => of([])));
  }
  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    return this.httpClient.get<Country[]>(`${this.apiUrl}/alpha/${code}`).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError(() => of(null))
    );
  }
  searchCapital(term: string): Observable<Country[]> {
    return this.getCountriesRequest(`${this.apiUrl}/capital/${term}`).pipe(
      tap((countries) => {
        this.cacheStore.byCapital = { term, countries };
      })
    );
  }
  searchCountry(term: string): Observable<Country[]> {
    return this.getCountriesRequest(`${this.apiUrl}/name/${term}`).pipe(
      tap((countries) => {
        this.cacheStore.byCountry = { term, countries };
      })
    );
  }

  searchRegion(region: Region): Observable<Country[]> {
    return this.getCountriesRequest(`${this.apiUrl}/region/${region}`).pipe(
      tap((countries) => {
        this.cacheStore.byRegion = { region, countries };
      })
    );
  }
}
