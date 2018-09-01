import { Hexagon } from './../../models/hexagon';
export class SetHexGrid {
  static readonly type = '[Game] Set Hex Grid';

  constructor(public gridToSet: Hexagon[][]) {

  }
}
