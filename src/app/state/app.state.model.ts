import { Hexagon } from './../models/hexagon';
/*
  Defines everything the game needs to know about
*/
export interface AppStateModel {
  gameName: string;
  turnNumber: number;
  hexagonSize: number;
  hexGrid: Hexagon[][];
}
