import { InfluenceService } from './../../services/influence.service';
import { Zone } from './../../models/zone';
import { ZoneService } from './../../services/zone.service';
import { ImageProviderService } from './../../services/image-provider.service';
import { AppStateModel } from './../../state/app.state.model';
import { Hexagon } from './../../models/hexagon';
import { AppState } from './../../state/app.state';
import { IncrementTurn } from './../../state/actions/incrementTurn';
import { Component, OnInit, Input, ViewChild, ChangeDetectionStrategy } from '@angular/core';
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

  tileBackground: string;
  zone: Zone;
  overlayImageString: string;
  tintString: string;
  size: number;
  width: number;
  height: number;

  @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;
  @Input() hexagon: Hexagon;

  @Select(AppState.turnNumber) turnNumber$: Observable<number>;

  // TODO: can use own type for contextMenuActions (has click, enabled, visible, divider, etc etc)
  public contextMenuActions: any[];

  constructor(private store: Store,
              private imageProvider: ImageProviderService,
              private zoneService: ZoneService,
              private influenceService: InfluenceService) {}

  ngOnInit() {
    // debugger;
    this.zone = this.zoneService.getZone(this.hexagon.zoneId);
    this.tileBackground = this.imageProvider.getTileBackground(this.hexagon.tile);
    this.tintString = this.zone ? this.zone.tintColorString : '';
    this.store.selectOnce(AppState).subscribe((state: AppStateModel) => this.size = state.hexagonSize);
    if (this.hexagon.col % 2 === 0 ) {
    }
    this.width = Math.sqrt(3) * this.size;
    this.height = this.size * 2;

    this.contextMenuActions = [
      {
        enabled: () => true,
        visible: true,
        displayName: 'row cord: ' + this.hexagon.row
      },
      {
        divider: true,
        visible: true,
      },
      {
        enabled: () => this.hexagon.col % 2 === 0,
        visible: true,
        displayName: 'col cord: ' + this.hexagon.col
      },
    ];

  }

  clicked() {
    // console.log('',  this.hexagon.row + ', ' +  this.hexagon.col);
    console.log(this.influenceService.getInfluenceValue(0, this.zone.controllerId));
    this.influenceService.updateResources(0, this.zone.controllerId, 10);
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
