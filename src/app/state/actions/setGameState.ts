import { AppStateModel } from './../app.state.model';
export class SetGameState {
  static readonly type = '[Game] Set Game State';

  constructor(public gameState: AppStateModel) {

  }
}
