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
    turnNumber: 10
  }
})

/*
  Define actions and selectors
*/
export class AppState {

  @Selector() static turnNumber(state: AppStateModel) {
    return state.turnNumber;
  }

  @Action(IncrementTurn)
  IncrementTurn(ctx: StateContext<AppStateModel>, action: IncrementTurn) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      turnNumber: state.turnNumber + 1
    });
  }



}
