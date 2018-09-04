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
}
