import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PageData, Planet, PlanetDto } from '../domain/planet';

const urlBase = 'https://swapi.dev/api/planets';

@Injectable({
  providedIn: 'root',
})
export class PlanetService {
  constructor(private http: HttpClient) {}

  getPlanets(page: number = 1): Observable<Planet[]> {
    const url = `${urlBase}/?page=${page}`;

    return this.http
      .get<PageData<PlanetDto>>(url, {
        headers: {
          accept: 'application/json',
        },
      })
      .pipe(
        map((pageData) => {
          return pageData.results.map((z) => this.dtoToPlanet(z));
        })
      );
  }

  getPlanet(id: number): Observable<Planet> {
    return this.http
      .get<PlanetDto>(`${urlBase}/${id}`, {
        headers: {
          accept: 'application/json',
        },
      })
      .pipe(map((dto) => this.dtoToPlanet(dto)));
  }

  private dtoToPlanet(p: PlanetDto): Planet {
    return {
      id: getId(p.url),
      name: p.name,
      rotation_period: parseFloat(p.rotation_period),
      orbital_period: +p.orbital_period,
      diameter: parseFloat(p.diameter),
      gravity: parseFloat(p.gravity),
      surface_water: parseFloat(p.surface_water),
      population: parseFloat(p.population),
      climate: p.climate,
      terrain: p.terrain,
      residents: p.residents,
      films: p.films,
      url: p.url,
      created: new Date(p.created),
      edited: new Date(p.edited),
    } as Planet;
  }
}

function getId(url: string): number {
  // https://swapi.dev/api/people/6/
  const parts = url.split('/');
  const id = parts[parts.length - 2];
  return +id;
}
