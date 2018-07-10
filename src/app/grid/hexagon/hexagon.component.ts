import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hexagon',
  templateUrl: './hexagon.component.html',
  styleUrls: ['./hexagon.component.scss']
})
export class HexagonComponent implements OnInit {

  imageString: string;
  width: number;
  height: number;

  @Input() size: number;
  @Input() rowCord: number;
  @Input() colCord: number;

  ngOnInit() {
    // this.imageString = 'url(\'./../../../../bird.jpg\')';
    this.imageString = 'url(/assets/bird.jpg)';
    this.width = Math.sqrt(3) * this.size;
    this.height = this.size * 2;
  }

  clicked() {
    console.log('', this.colCord + ', ' + this.rowCord);
  }
}
