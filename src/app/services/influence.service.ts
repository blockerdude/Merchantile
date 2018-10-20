import { SetInfluenceMatrix } from './../state/actions/setInfluenceMatrix';
import { Modifier } from './../models/modifier';
import { Influence } from './../models/influence';
import { AppStateModel } from './../state/app.state.model';
import { Observable } from 'rxjs/internal/Observable';
import { AppState } from './../state/app.state';
import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Operand } from '../models/operand.enum';

@Injectable({
  providedIn: 'root'
})
export class InfluenceService {

  @Select(AppState.gameState) private gameState$: Observable<AppStateModel>;

  influenceMatrix: Influence[][];

  constructor(private store: Store) {

    this.gameState$.subscribe((state: AppStateModel) => {
      if (state.influenceMatrix) {
       this.influenceMatrix = state.influenceMatrix;
      }
    });

  }

  /**
   * Returns the influence between a player and a controller
   * TODO: Think about having a governor class instead of controller
   */
  getInfluenceValue = (playerId: number, controllerId: number): number => {
    return this.influenceMatrix[playerId][controllerId].calculatedValue;
  }

  /**
   * Updates the influence between the player and governor based on the indicated resource amount.
   * TODO: The equation listed below will be changing quite a bit, this is currently a first 'guess' at it
   * TODO: Consider changing the return type to a number which is the new influence
   * TODO: Consider creating a class that bundles all resources into one object
   */
  updateResources = (playerId: number, controllerId: number, resourceAmount: number): void => {
    // 1) Get current influence
    const influence = this.influenceMatrix[playerId][controllerId];

    // 2) update the amount of resources spent
     const newResourceAmount = influence.resourceCount + resourceAmount;
     influence.resourceCount = newResourceAmount;

     this.recalculateInfluence(playerId, controllerId);
  }

  addModifier = (playerId: number, controllerId: number, modifier: Modifier): void => {
    this.influenceMatrix[playerId][controllerId].modifiers.push(modifier);
    this.recalculateInfluence(playerId, controllerId);
  }

  /**
   * Will remove the specified modifier from the player-controller influence relationship
   * The passed in modifier needs to match the original modifier explicitly, this includes the descriptor
   * TODO: should throw/log error if no modifier is found.
   */
  removeModifier = (playerId: number, controllerId: number, modifier: Modifier): void => {
    const influence = this.influenceMatrix[playerId][controllerId];

    // const modifierFound = influence.modifiers.find(mod => mod === modifier);
    // Throw error? Log issue? Something potentially wrong happened here, needs more research before implementing

    // Filter out every modifier that does not equal the passed in modifier.
    const modifiers = influence.modifiers.filter( mod => mod !== modifier);

    influence.modifiers = modifiers;
    this.recalculateInfluence(playerId, controllerId);
  }

  /**
   * Recalculates the influence for a given relationship
   * TODO: Probably a more efficient way to do this recalc, but this does work.
   * TODO: Consider having the equation constants be inputs to the game from a saved state
   * Read Google docs for equation notes
   */
  private recalculateInfluence = (playerId: number, controllerId: number): void => {
    const influence = this.influenceMatrix[playerId][controllerId];
    let runningTotal = 2 * ((((influence.resourceCount + 1) ** .6) - 1) / (.6));
    this.influenceMatrix[playerId][controllerId].baseValue = runningTotal;

    // Iterate through all of the additive modifiers and apply them to the base value
    influence.modifiers.forEach(mod => {
      if (mod.operand === Operand.Additive) {
        runningTotal += mod.value;
      }
    });

    // Iterate through all of the multiplicative modifiers and apply them to the base value
    influence.modifiers.forEach(mod => {
      if (mod.operand === Operand.Multiplicative) {
        runningTotal *= mod.value;
      }
    });

    influence.calculatedValue = runningTotal;

    this.store.dispatch(new SetInfluenceMatrix(this.deepCopyMatrix()));
    // this.store.dispatch(new SetInfluenceMatrix(this.influenceMatrix));
  }

  /**
   *  TODO: This method just deep copies the influence matrix so it is a 'new' object that is being sent to the store.
   *  The reason it is needed is because the store won't trigger the selector to fire as the reference is still pointing
   *  to the same 'object'. This is a work around, we create a new object so the selector fire when the matrix is updated.
   *  However this doesn't feel like a good solution. One alternate is to use a wrapper class that contains the 2D array,
   *  though this just hides the issue behind a class. Ideally we find a way to tell the store to 'fire' the selector when
   *  the action is dispatched.
   */
  private deepCopyMatrix = (): Influence[][] => {
    let deepCopyMatrix: Influence[][];

    deepCopyMatrix = [];
    for (let x = 0; x < this.influenceMatrix.length; x++) {
      deepCopyMatrix[x] = [];
      for (let y = 0; y < this.influenceMatrix[x].length; y++) {
        deepCopyMatrix[x][y] = this.influenceMatrix[x][y];
      }
    }

    return deepCopyMatrix;
  }
}
