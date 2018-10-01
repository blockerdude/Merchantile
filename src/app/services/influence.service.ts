import { Modifier } from './../models/modifier';
import { Influence } from './../models/influence';
import { Player } from './../models/player';
import { AppStateModel } from './../state/app.state.model';
import { Observable } from 'rxjs/internal/Observable';
import { AppState } from './../state/app.state';
import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Controller } from '../models/controller';
import { Operand } from '../models/operand.enum';

@Injectable({
  providedIn: 'root'
})
export class InfluenceService {

  @Select(AppState.gameState) private gameState$: Observable<AppStateModel>;

  influenceMatrix: Influence[][];

  constructor() {

    this.gameState$.subscribe((state: AppStateModel) => {
      this.influenceMatrix = state.influenceMatrix;
      console.log('in sub');
    });
    console.log('here');
  }

  /**
   * Returns the influence between a player and a controller
   * TODO: Think about having a governor class instead of controller
   */
  getInfluenceValue = (player: Player, controller: Controller): number => {
    return this.influenceMatrix[player.id][controller.id].calculatedValue;
  }

  /**
   * Updates the influence between the player and governor based on the indicated resource amount.
   * TODO: The equation listed below will be changing quite a bit, this is currently a first 'guess' at it
   * TODO: Consider changing the return type to a number which is the new influence
   * TODO: Consider creating a class that bundles all resources into one object
   */
  updateResources = (player: Player, controller: Controller, resourceAmount: number): void => {
    // 1) Get current influence
    const influence = this.influenceMatrix[player.id][controller.id];

    // 2) update the amount of resources spent
     const newResourceAmount = influence.resourceCount + resourceAmount;
     this.influenceMatrix[player.id][controller.id].resourceCount = newResourceAmount;

     this.recalculateInfluence(player, controller);
  }

  addModifier = (player: Player, controller: Controller, modifier: Modifier): void => {
    this.influenceMatrix[player.id][controller.id].modifiers.push(modifier);
    this.recalculateInfluence(player, controller);
  }

  /**
   * Will remove the specified modifier from the player-controller influence relationship
   * The passed in modifier needs to match the original modifier explicitly, this includes the descriptor
   * TODO: should throw/log error if no modifier is found.
   */
  removeModifier = (player: Player, controller: Controller, modifier: Modifier): void => {
    const influence = this.influenceMatrix[player.id][controller.id];

    // const modifierFound = influence.modifiers.find(mod => mod === modifier);
    // Throw error? Log issue? Something potentially wrong happened here, needs more research before implementing

    // Filter out every modifier that does not equal the passed in modifier.
    const modifiers = influence.modifiers.filter( mod => mod !== modifier);

    this.influenceMatrix[player.id][controller.id].modifiers = modifiers;
    this.recalculateInfluence(player, controller);
  }

  /**
   * Recalculates the influence for a given relationship
   * TODO: Probably a more efficient way to do this recalc, but this does work.
   * TODO: Consider having the equation constants be inputs to the game from a saved state
   * Read Google docs for equation notes
   */
  private recalculateInfluence = (player: Player, controller: Controller): void => {
    const influence = this.influenceMatrix[player.id][controller.id];
    let runningTotal = 10 * ((((influence.resourceCount + 1) ** .3) - 1) / (.3));
    this.influenceMatrix[player.id][controller.id].baseValue = runningTotal;

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

    // TODO: check if this updates the underlying value in the matrix, if so then change redundant uses in this class
    influence.calculatedValue = runningTotal;
  }
}
