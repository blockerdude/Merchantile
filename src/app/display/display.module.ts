import { DisplayPanelComponent } from './display-panel/display-panel.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    DisplayPanelComponent,
  ],
  imports: [
    BrowserModule
    // ContextMenuModule.forRoot({
    //   useBootstrap4: true,
    //   autoFocus: true,
    // }),
  ],
  exports: [
    DisplayPanelComponent
  ],
  providers: []
})
export class DisplayModule { }
