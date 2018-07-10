import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hexgrid',
  templateUrl: './hexgrid.component.html',
  styleUrls: ['./hexgrid.component.scss']
})
export class HexgridComponent implements OnInit {

  width: number;
  height: number;
  oddMarginLeft: number;
  marginTop: number;
  containerOffset: number;
  numberHexPerRow: Array<string>;
  numberRows: Array<string>;


  ngOnInit() {
    const size = 120;
    this.width =  Math.sqrt(3) * size;
    this.height = size * 2;
    this.oddMarginLeft = this.width / 2;
    this.marginTop = -1 * this.height / 4;
    this.containerOffset = -1 * this.marginTop;
    this.numberHexPerRow = new Array(6);
    this.numberRows = new Array(5);

  }

}
