import { IncrementTurn } from './../../state/actions/incrementTurn';
import { Observable } from 'rxjs/internal/Observable';
import { Store, Select } from '@ngxs/store';
import { Component, OnInit } from '@angular/core';
import { AppState } from '../../state/app.state';
import { InfluenceService } from '../../services/influence.service';
import { Influence } from '../../models/influence';

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

  constructor(private store: Store,
              private influenceService: InfluenceService) { }

  ngOnInit() {
    this.turnNumber$.subscribe((value: number) => {
      this.turnNumber = value;
    });

    this.influenceMatrix$.subscribe((value: Influence[][]) => {
      console.log('matrix', value);
      if (value) {
        this.influence = value[0][3].calculatedValue;
      }
    });

  }

  endTurn = (): void => {
    this.store.dispatch(new IncrementTurn());
  }

}
