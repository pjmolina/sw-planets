import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Planet } from 'src/app/domain/planet';
import { PlanetService } from 'src/app/services/planet.service';

@Component({
  selector: 'app-planet-detail',
  templateUrl: './planet-detail.component.html',
  styleUrls: ['./planet-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class PlanetDetailComponent implements OnInit {
  planet?: Planet;
  @Input() id?: number;

  constructor(
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private planetService: PlanetService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const id = +(paramMap.get('id') || '0');

      if (id) {
        this.planetService.getPlanet(id).subscribe((planet) => {
          this.planet = planet;
          this.id = id;
          this.cd.markForCheck();
        });
      }
    });
  }

  cambio() {
    if (this.planet) {
      // this.cd.detach();

      this.planet.name += 'Z';
      this.planet.climate += 'S';
      this.planet.terrain += 'K';
      this.planet.diameter *= 1.1;

      // this.cd.markForCheck();
      // this.cd.reattach();
    }
  }
}

/**
 *
 * <app-w temperatura="43" ciudad="Sevilla">
 <div>
    {{ temperature }}ºC {{ ciudad}}   // {{ velocidadDelVIento}}
    <input  [(ngModel)]="valor">
  </div>


component  app-w
class WeatherComponent
{
   // velocidadDelVIento
    @Input() temperature: number;
    @Input() ciudad: string;
}

 *
 *
 */
