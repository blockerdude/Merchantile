import { SetGameState } from './actions/setGameState';
import { SetHexGrid } from './actions/setHexGrid';
import { AppStateModel } from './app.state.model';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { IncrementTurn } from './actions/incrementTurn';

/*
  Sets defaults
*/​
@State<AppStateModel>({
  name: 'MerchantileModel',
  defaults: {
    gameName: 'Default Game Name',
    turnNumber: -1,
    hexagonSize: 40,
    hexGrid: null,
    controllers: null,
    zones: null,
    influenceMatrix: null
  }
})

/*
  Define actions and selectors
*/
export class AppState {

  /**
   * provide access to specific/commonly requested attributes
   */

  @Selector() static turnNumber(state: AppStateModel) {
    return state.turnNumber;
  }

  @Selector() static gameState(state: AppStateModel) {
    return state;
  }


  /**
   * Each of the following need to have a corresponding action
   */

  @Action(IncrementTurn)
  IncrementTurn(ctx: StateContext<AppStateModel>, action: IncrementTurn) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      turnNumber: state.turnNumber + 1
    });
  }

  @Action(SetHexGrid)
  SetHexGrid(ctx: StateContext<AppStateModel>, action: SetHexGrid) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      hexGrid: action.gridToSet
    });
  }

  @Action(SetGameState)
  SetGameState(ctx: StateContext<AppStateModel>, action: SetGameState) {
    ctx.setState({
      ...action.gameState
    });
  }

}
