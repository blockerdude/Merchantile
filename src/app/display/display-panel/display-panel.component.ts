import { AppStateModel } from './../../state/app.state.model';
import { Influence } from './../../models/influence';
import { IncrementTurn } from './../../state/actions/incrementTurn';
import { Observable } from 'rxjs/internal/Observable';
import { Store, Select } from '@ngxs/store';
import { Component, OnInit } from '@angular/core';
import { AppState } from '../../state/app.state';

@Component({
  selector: 'app-display-panel',
  templateUrl: './display-panel.component.html',
  styleUrls: ['./display-panel.component.scss']
})
export class DisplayPanelComponent implements OnInit {

  turnNumber: number;
  woodResource: number;
  goldResource: number;
  oreResource: number;
  influence: number;

  @Select(AppState.turnNumber) turnNumber$: Observable<number>;
  @Select(AppState.influenceMatrix) influenceMatrix$: Observable<Influence[][]>;

  constructor(private store: Store) {
    // console.log('first');
    // this.influenceMatrix$ = this.store.select((state: AppStateModel) => state.influenceMatrix);
  }

  ngOnInit() {
    console.log('second');
    this.turnNumber$.subscribe((value: number) => {
      this.turnNumber = value;
    });

    this.influenceMatrix$.subscribe((value: Influence[][]) => {
      if (value) {
        this.influence = value[0][2].calculatedValue;
      }
    });

  }

  endTurn = (): void => {
    this.store.dispatch(new IncrementTurn());
  }

}
