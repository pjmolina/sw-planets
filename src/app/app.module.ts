import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlanetListComponent } from './planets/planet-list/planet-list.component';
import { PlanetDetailComponent } from './planets/planet-detail/planet-detail.component';

@NgModule({
  declarations: [AppComponent, PlanetListComponent, PlanetDetailComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
