import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Planet } from 'src/app/domain/planet';
import { PlanetService } from 'src/app/services/planet.service';

@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.scss'],
  animations: [
    trigger('planetAnimation', [
      state(
        'inactive',
        style({
          backgroundColor: '#ffffff',
          transform: 'scale(1)',
          left: '0px',
        })
      ),
      state(
        'active',
        style({
          backgroundColor: '#cfd8dc',
          transform: 'scale(1.1)',
          // transform: 'rotate(30deg)',
          left: '100px',
        })
      ),
      state(
        'void',
        style({
          backgroundColor: '#ffffff',
          color: '#ff0000',
          transform: 'scale(1)',
          left: '0px',
        })
      ),
      transition('inactive => active', animate('3000ms ease-in')),
      transition('active => inactive', animate('1000ms ease-out')),
      transition('void => *', animate('3000ms ease-in-out')),
    ]),
  ],
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

  toggle(p: Planet): void {
    if (p.estadoDelEscudo === 'inactive') {
      p.estadoDelEscudo = 'active';
    } else {
      p.estadoDelEscudo = 'inactive';
    }
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
