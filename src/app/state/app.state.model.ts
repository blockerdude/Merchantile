import { Controller } from './../models/controller';
import { Zone } from './../models/zone';
import { JsonObject, JsonProperty } from 'json2typescript';
import { Hexagon } from './../models/hexagon';
import { InfluenceMatrix } from '../models/influenceMatrix';
/*
  Defines everything the game needs to know about
  TODO: Think about renaming this class/moving to the models folder
*/
@JsonObject('AppStateModel')
export class AppStateModel {

  @JsonProperty('gameName', String)
  gameName: string;

  @JsonProperty('turnNumber', Number)
  turnNumber: number;

  @JsonProperty('hexagonSize', Number)
  hexagonSize: number;

  @JsonProperty('hexGrid', [[Hexagon]])
  hexGrid: Hexagon[][];

  @JsonProperty('controllers', [Controller])
  controllers: Controller[];

  @JsonProperty('zones', [Zone])
  zones: Zone[];

  // TODO: Will this work? Or will I need to use a custom converter
  @JsonProperty('influenceMatrix', InfluenceMatrix)
  influenceMatrix:  InfluenceMatrix;
}
