import { DragScrollModule } from 'ngx-drag-scroll';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HexagonComponent } from './hexagon/hexagon.component';
import { HexgridComponent } from './hexgrid/hexgrid.component';
import { ContextMenuModule } from 'ngx-contextmenu';

@NgModule({
  declarations: [
    HexagonComponent,
    HexgridComponent
  ],
  imports: [
    BrowserModule,
    DragScrollModule,
    ContextMenuModule.forRoot({
      useBootstrap4: true,
      autoFocus: true,
    }),
  ],
  exports: [
    HexagonComponent,
    HexgridComponent,
    DragScrollModule
  ],
  providers: []
})
export class GridModule { }
