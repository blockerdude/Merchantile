import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hexgrid',
  templateUrl: './hexgrid.component.html',
  styleUrls: ['./hexgrid.component.scss']
})
export class HexgridComponent implements OnInit {

  readonly size = 120;
  width: number;
  height: number;
  oddMarginLeft: number;
  marginTop: number;
  containerOffset: number;
  numberHexPerRow: Array<string>;
  numberRows: Array<string>;


  ngOnInit() {
    // TODO: move calculations to a service?
    this.width =  Math.sqrt(3) * this.size;
    this.height = this.size * 2;
    this.oddMarginLeft = this.width / 2;
    this.marginTop = -1 * this.height / 4;
    this.containerOffset = -1 * this.marginTop;
    this.numberHexPerRow = new Array(6);
    this.numberRows = new Array(5);

  }

}
