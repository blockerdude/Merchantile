import { Tile } from './tile.enum';
/*
  Defines the data comprising a Hexagon
*/
export interface Hexagon {
  row: number;
  col: number;
  tile: Tile;
}
