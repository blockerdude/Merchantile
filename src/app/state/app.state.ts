import { SetGameState } from './actions/setGameState';
import { SetHexGrid } from './actions/setHexGrid';
import { AppStateModel } from './app.state.model';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { IncrementTurn } from './actions/incrementTurn';

/*
  Sets defaults
*/​
@State<AppStateModel>({
  name: 'ExampleModelName',
  defaults: {
    gameName: 'Test Game Name',
    turnNumber: 10,
    hexagonSize: 60,
    hexGrid: null,
    controllers: null,
    zones: null
  }
})

/*
  Define actions and selectors
*/
export class AppState {

  @Selector() static turnNumber(state: AppStateModel) {
    return state.turnNumber;
  }

  @Selector() static gameState(state: AppStateModel) {
    return state;
  }

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
