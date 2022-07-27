import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Planet } from 'src/app/domain/planet';
import { PlanetService } from 'src/app/services/planet.service';

@Component({
  selector: 'app-planet-detail',
  templateUrl: './planet-detail.component.html',
  styleUrls: ['./planet-detail.component.scss'],
})
export class PlanetDetailComponent implements OnInit {
  planet?: Planet;
  @Input() id?: number;

  constructor(
    private route: ActivatedRoute,
    private planetService: PlanetService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const id = +(paramMap.get('id') || '0');
      if (id) {
        this.planetService.getPlanet(id).subscribe((planet) => {
          this.planet = planet;
        });
      }
    });
  }
}
