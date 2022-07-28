import { Component, OnInit } from '@angular/core';
import { Planet } from 'src/app/domain/planet';
import { PlanetService } from 'src/app/services/planet.service';

@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.scss'],
})
export class PlanetListComponent implements OnInit {
  planets: Planet[] = [];
  error = '';

  constructor(private planetService: PlanetService) {}

  ngOnInit(): void {
    this.planets = [];
    this.getPlanetPage(1);
    this.getPlanetPage(2);
    this.getPlanetPage(3);
    this.getPlanetPage(4);
    this.getPlanetPage(5);
    this.getPlanetPage(6);
  }

  getPlanetPage(page: number): void {
    this.planetService.getPlanets(page).subscribe({
      next: (planets) => {
        planets.forEach((p) => {
          this.planets.push(p);
        });
        this.error = '';
      },
      error: (err) => {
        this.planets = [];
        this.error = err.toString();
      },
    });
  }

  renderPopulation(population: number): string {
    if (isNaN(population) || population === null || population === undefined) {
      return 'desconocido';
    }
    return `${population} hab.`;
  }
}
