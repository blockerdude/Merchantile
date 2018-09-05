import { Injectable } from '@angular/core';
import { Tile } from '../models/tile.enum';

/*
  Provides images to be used in the application
*/
@Injectable({
  providedIn: 'root'
})
export class ImageProviderService {

  imageDictionary: {};

  constructor() {
    this.imageDictionary = {
      [Tile.Forest]: 'url(/assets/forest.png)',
      [Tile.Plains]: 'url(/assets/plains.jpg)',
      [Tile.Mountains]: 'url(/assets/mountain.png)',
      [Tile.Hills]: 'url(/assets/hills.png)',
      [Tile.City]: 'url(/assets/city.jpg)'
    };
  }

  getTileBackground = (tile: Tile): string => {
    if (this.imageDictionary[tile]) {
      return this.imageDictionary[tile];
    } else {
      return 'url(/assets/bird.jpg)';
    }
  }
}
