import { NgModule } from '@angular/core';
import { HexagonComponent } from './hexagon/hexagon.component';
import { HexgridComponent } from './hexgrid/hexgrid.component';

@NgModule({
  declarations: [
    HexagonComponent,
    HexgridComponent
  ],
  imports: [
  ],
  exports: [
    HexagonComponent,
    HexgridComponent
  ],
  providers: []
})
export class GridModule { }
