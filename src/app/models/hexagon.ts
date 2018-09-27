import { Tile } from './tile.enum';
import {JsonObject, JsonProperty} from 'json2typescript';

/*
  Defines the data comprising a Hexagon
*/
@JsonObject('Hexagon')
export class Hexagon {
  @JsonProperty('row', Number)
  row: number;

  @JsonProperty('col', Number)
  col: number;

  @JsonProperty('row', Tile)
  tile: Tile;

  @JsonProperty('zoneId', Number)
  zoneId: number;

  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;
    this.tile = Tile.Plains;
    this.zoneId = 1;
  }
}
