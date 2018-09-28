import { Player } from './../models/player';
import { AppStateModel } from './../state/app.state.model';
import { Observable } from 'rxjs/internal/Observable';
import { AppState } from './../state/app.state';
import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Controller } from '../models/controller';

@Injectable({
  providedIn: 'root'
})
export class InfluenceService {

  @Select(AppState.gameState) private gameState$: Observable<AppStateModel>;

  influenceMatrix: number[][];

  constructor() {

    this.gameState$.subscribe((state: AppStateModel) => {
      this.influenceMatrix = state.influenceMatrix;
    });
  }

  /**
   * Returns the influence between a player and a controller
   * TODO: Think about having a governor class instead of controller
   */
  getInfluence = (player: Player, controller: Controller): number => {
    return 0;
  }

  /**
   * Updates the influence between the player and governor based on the indicated resource amount.
   * TODO: Consider changing the return type to a number which is the new influence
   * TODO: Consider creating a class that bundles all resources into one object
   */
  updateInfluence = (player: Player, controller: Controller, resourceAmount: number): void => {

  }

}
