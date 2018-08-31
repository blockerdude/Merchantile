import { AppStateModel } from './../../state/app.state.model';
import { AppState } from './../../state/app.state';
import { IncrementTurn } from './../../state/actions/incrementTurn';
import { Component, OnInit, Input, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ContextMenuComponent } from '../../../../node_modules/ngx-contextmenu';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-hexagon',
  templateUrl: './hexagon.component.html',
  styleUrls: ['./hexagon.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class HexagonComponent implements OnInit {

  imageString: string;
  overlayImageString: string;
  width: number;
  height: number;

  @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;
  @Input() size: number;
  @Input() rowCord: number;
  @Input() colCord: number;

  @Select(AppState.turnNumber) turnNumber$: Observable<number>;

  // TODO: can use own type for contextMenuActions (has click, enabled, visible, divider, etc etc)
  public contextMenuActions: any[];

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private store: Store) {}

  ngOnInit() {
    // this.imageString = 'url(\'./../../../../bird.jpg\')';
    this.imageString = 'url(/assets/bird.jpg)'; // , url(/assets/building.png)';
    if (this.colCord % 2 === 0 ) {
    }
    this.width = Math.sqrt(3) * this.size;
    this.height = this.size * 2;

    this.contextMenuActions = [
      {
        enabled: () => true,
        visible: true,
        displayName: 'row cord: ' + this.rowCord
      },
      {
        divider: true,
        visible: true,
      },
      {
        enabled: () => this.colCord % 2 === 0,
        visible: true,
        displayName: 'col cord: ' + this.colCord
      },
    ];

    this.turnNumber$.subscribe(val => console.log('turn number: ' + val));

  }

  clicked() {
    console.log('', this.colCord + ', ' + this.rowCord);
  }

  showMessage = (action: any): void => {
    if (action.displayName === 'new item') {
      this.contextMenuActions = this.contextMenuActions.filter(x => x.displayName !== 'new item');
      this.overlayImageString = '';
    } else {
      this.overlayImageString = 'url(/assets/building.png)';
      this.contextMenuActions = this.contextMenuActions.concat({enabled: () => true,
        visible: true,
        displayName: 'new item'});

      this.store.dispatch(new IncrementTurn());

    }

  }

}
