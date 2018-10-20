import { DisplayPanelComponent } from './display-panel/display-panel.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ResourceDisplayComponent } from './resource-display/resource-display.component';

@NgModule({
  declarations: [
    DisplayPanelComponent,
    ResourceDisplayComponent,
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
