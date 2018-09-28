import { Zone } from './../models/zone';
import { Observable } from 'rxjs/internal/Observable';
import { AppStateModel } from './../state/app.state.model';
import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { AppState } from '../state/app.state';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  @Select(AppState.gameState) private gameState$: Observable<AppStateModel>;
  private zoneMap = {};


  constructor() {

    this.gameState$.subscribe((state: AppStateModel) => {
      if (state.zones) {
        state.zones.forEach((zone: Zone) => {
          this.zoneMap[zone.zoneId] = zone;
        });
      }

    });

  }

  getZone = (id: number): Zone => {
    return this.zoneMap[id];
  }

}
