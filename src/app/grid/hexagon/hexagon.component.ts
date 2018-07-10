import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hexagon',
  templateUrl: './hexagon.component.html',
  styleUrls: ['./hexagon.component.scss']
})
export class HexagonComponent implements OnInit {

  imageString: string;
  width: string;
  height: string;
  oddMarginLeft: string;
  oddMarginTop: string;

  ngOnInit() {
    // this.imageString = 'url(\'./../../../../bird.jpg\')';
    this.imageString = 'url(/assets/bird.jpg)';
    const size = 120;
    this.width = '' + Math.sqrt(3) * size;
    this.height = '' + size * 2;
    this.oddMarginLeft = '' + (+this.width / 2);
    this.oddMarginTop = '-' + (+this.height / 4);
  }

  clicked() {
    console.log('clicked');
  }
}
