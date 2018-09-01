import { Tile } from './models/tile.enum';
import { Hexagon } from './models/hexagon';
import { Store } from '@ngxs/store';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { SetHexGrid } from './state/actions/setHexGrid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AppComponent implements OnInit{

  constructor(private store: Store) {}

  ngOnInit() {

    const hex00: Hexagon = {
      row: 10,
      col: 10,
      tile: Tile.Plains
    };

    const hex01: Hexagon = {
      row: 10,
      col: 11,
      tile: Tile.Plains
    };

    const hex02: Hexagon = {
      row: 10,
      col: 12,
      tile: Tile.Plains
    };

    const hex10: Hexagon = {
      row: 11,
      col: 10,
      tile: Tile.Plains
    };

    const hex11: Hexagon = {
      row: 11,
      col: 11,
      tile: Tile.Plains
    };

    const hex12: Hexagon = {
      row: 11,
      col: 12,
      tile: Tile.Plains
    };

    const hex20: Hexagon = {
      row: 12,
      col: 10,
      tile: Tile.Plains
    };

    const hex21: Hexagon = {
      row: 12,
      col: 11,
      tile: Tile.Plains
    };

    const hex22: Hexagon = {
      row: 12,
      col: 12,
      tile: Tile.Plains
    };

    const grid: Hexagon[][] = [[null, null, null], [null, null, null], [null, null, null]];
    grid[0][0] = hex00;
    grid[0][1] = hex01;
    grid[0][2] = hex02;
    grid[1][0] = hex10;
    grid[1][1] = hex11;
    grid[1][2] = hex12;
    grid[2][0] = hex20;
    grid[2][1] = hex21;
    grid[2][2] = hex22;

    this.store.dispatch(new SetHexGrid(grid));
  }
}
