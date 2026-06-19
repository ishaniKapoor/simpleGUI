import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { VehiclesService } from './services/vehicles.service';

@NgModule({
  declarations: [
    AppComponent,
    VehicleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    VehiclesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
