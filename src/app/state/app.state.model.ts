import { Player } from './../models/player';
import { JsonObject, JsonProperty } from 'json2typescript';
import { Hexagon } from './../models/hexagon';
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

  @JsonProperty('players', [Player])
  players: Player[];
}
