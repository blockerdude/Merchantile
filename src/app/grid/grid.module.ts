import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HexagonComponent } from './hexagon/hexagon.component';
import { HexgridComponent } from './hexgrid/hexgrid.component';

@NgModule({
  declarations: [
    HexagonComponent,
    HexgridComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    HexagonComponent,
    HexgridComponent
  ],
  providers: []
})
export class GridModule { }
