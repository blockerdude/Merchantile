import { InfluenceMatrix } from './../../models/influenceMatrix';
import { Influence } from './../../models/influence';
export class SetInfluenceMatrix {
  static readonly type = '[Game] Set Influence Matrix';

  constructor(public matrix: InfluenceMatrix) {

  }
}
