import { Modifier } from './../models/modifier';
import { Influence } from './../models/influence';
import { AppStateModel } from './../state/app.state.model';
import { Observable } from 'rxjs/internal/Observable';
import { AppState } from './../state/app.state';
import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Operand } from '../models/operand.enum';

@Injectable({
  providedIn: 'root'
})
export class InfluenceService {

  @Select(AppState.gameState) private gameState$: Observable<AppStateModel>;

  influenceMatrix: Map<number, Map<number, Influence>>;

  constructor() {

    this.gameState$.subscribe((state: AppStateModel) => {
       this.influenceMatrix = state.influenceMatrix;
    });

  }

  /**
   * Returns the influence between a player and a controller
   * TODO: Think about having a governor class instead of controller
   */
  getInfluenceValue = (playerId: number, controllerId: number): number => {
    debugger;
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
  }
}
