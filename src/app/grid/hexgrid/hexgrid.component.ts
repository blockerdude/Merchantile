import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ContextMenuComponent } from '../../../../node_modules/ngx-contextmenu';

@Component({
  selector: 'app-hexgrid',
  templateUrl: './hexgrid.component.html',
  styleUrls: ['./hexgrid.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class HexgridComponent implements OnInit {

  readonly size = 60;
  width: number;
  height: number;
  oddMarginLeft: number;
  marginTop: number;
  extraMarginRight: number;
  extraMarginBottom: number;
  containerOffset: number;
  numberHexPerRow: Array<number>;
  numberRows: Array<number>;
  contextMenu: ContextMenuComponent;
  myStyle: object;


  ngOnInit() {

    // TODO: move calculations to a service?
    this.width =  Math.sqrt(3) * this.size;
    this.height = this.size * 2;
    this.oddMarginLeft = this.width / 2;
    this.extraMarginRight = -1 * Math.sqrt(3) * (this.size / 4);
    this.extraMarginBottom = -1 * (this.size / 4);
    this.marginTop = -1 * this.height / 4;
    this.containerOffset = -1 * this.marginTop;
    this.numberHexPerRow = new Array(20);
    this.myStyle =  { 'margin-right': this.extraMarginRight + 'px', 'margin-bottom': this.extraMarginBottom + 'px'};
    // TODO: The following is a to allow for the rows to be incremented by 2 so the coords are correct.
    // Need to find a way to do the for loop better while preserving the css functionality.
    // Maybe can use conditional classes on (row % 2 === 0) and use !important to override things for even vs odd.
    this.numberRows = [0, 2, 4, 6, 8, 10, 12, 14];

  }

}
