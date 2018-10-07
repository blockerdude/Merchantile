import { Influence } from './influence';
import {JsonObject, JsonProperty} from 'json2typescript';

/*
  Defines the data comprising a hex zone, a defined area on the grid
*/
@JsonObject('InfluenceMatrix')
export class InfluenceMatrix {

  @JsonProperty('matrix', [[Influence]])
  matrix: Influence[][];

  constructor(matrix: Influence[][]) {
    this.matrix = matrix;
  }
}
