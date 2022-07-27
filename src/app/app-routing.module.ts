import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanetDetailComponent } from './planets/planet-detail/planet-detail.component';
import { PlanetListComponent } from './planets/planet-list/planet-list.component';

const routes: Routes = [
  {
    path: 'planets',
    component: PlanetListComponent,
  },
  { path: 'planets/:id', component: PlanetDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
