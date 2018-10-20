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
  influence1: number;

  @Select(AppState.turnNumber) turnNumber$: Observable<number>;
  @Select(AppState.influenceMatrix) influenceMatrix$: Observable<Influence[][]>;

  constructor(private store: Store) {
  }

  ngOnInit() {
    console.log('second');
    this.turnNumber$.subscribe((value: number) => {
      this.turnNumber = value;
    });

    this.influenceMatrix$.subscribe((value: Influence[][]) => {
      if (value) {
        this.influence1 = value[0][2].calculatedValue;
      }
    });

  }

  endTurn = (): void => {
    this.store.dispatch(new IncrementTurn());
  }

}
