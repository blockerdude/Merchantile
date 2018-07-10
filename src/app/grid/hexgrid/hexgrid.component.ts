import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hexgrid',
  templateUrl: './hexgrid.component.html',
  styleUrls: ['./hexgrid.component.scss']
})
export class HexgridComponent implements OnInit {

  imageString: string;
  width: string;
  height: string;
  oddMarginLeft: string;
  oddMarginTop: string;

  ngOnInit() {
    const size = 120;
    this.width = '' + Math.sqrt(3) * size;
    this.height = '' + size * 2;
    this.oddMarginLeft = '' + (+this.width / 2);
    this.oddMarginTop = '-' + (+this.height / 4);
  }

}
