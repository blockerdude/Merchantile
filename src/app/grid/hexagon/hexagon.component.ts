import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hexagon',
  templateUrl: './hexagon.component.html',
  styleUrls: ['./hexagon.component.scss']
})
export class HexagonComponent implements OnInit {

  imageString: string;

  ngOnInit() {
    // this.imageString = 'url(\'./../../../../bird.jpg\')';
    this.imageString = 'url(/assets/bird.jpg)';
  }

  clicked() {
    console.log('clicked');
  }
}
