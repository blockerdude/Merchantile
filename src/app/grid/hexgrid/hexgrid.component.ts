import { Influence } from './../../models/influence';
import { InfluenceService } from './../../services/influence.service';
import { Controller } from './../../models/controller';
import { Zone } from './../../models/zone';
import { ZoneService } from './../../services/zone.service';
import { Tile } from './../../models/tile.enum';
import { JsonConvert, OperationMode, ValueCheckingMode } from 'json2typescript';
import { Observable } from 'rxjs/internal/Observable';
import { Hexagon } from './../../models/hexagon';
import { AppStateModel } from './../../state/app.state.model';
import { Store, Select } from '@ngxs/store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ContextMenuComponent } from '../../../../node_modules/ngx-contextmenu';
import { AppState } from '../../state/app.state';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-hexgrid',
  templateUrl: './hexgrid.component.html',
  styleUrls: ['./hexgrid.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class HexgridComponent implements OnInit {
  size: number;
  width: number;
  height: number;
  oddMarginLeft: number;
  marginTop: number;
  extraMarginRight: number;
  extraMarginBottom: number;
  containerOffset: number;
  hexgrid: Hexagon[][];
  numberHexRows: Array<number> = null;
  numberHexPerRow: Array<number> = null;
  contextMenu: ContextMenuComponent;
  myStyle: object;

  @Select(AppState.gameState) gameState$: Observable<AppStateModel>;

  constructor(private store: Store,
              private zoneService: ZoneService,
              private influenceService: InfluenceService) {}

  ngOnInit() {
    // this.automaticCreation();
     this.manualCreation();
  }

  automaticCreation = (): void => {
    this.gameState$.subscribe((state: AppStateModel) => {
      this.size = state.hexagonSize;

      // TODO: move calculations to a service?
      this.width =  Math.sqrt(3) * this.size;
      this.height = this.size * 2;
      this.oddMarginLeft = this.width / 2;
      this.extraMarginRight = -1 * Math.sqrt(3) * (this.size / 4);
      this.extraMarginBottom = -1 * (this.size / 4);
      this.marginTop = -1 * this.height / 4;
      this.containerOffset = -1 * this.marginTop;
      this.myStyle =  { 'margin-right': this.extraMarginRight + 'px', 'margin-bottom': this.extraMarginBottom + 'px'};
      if (state.hexGrid) {
        this.hexgrid = state.hexGrid;
        this.numberHexRows = new Array(state.hexGrid.length);
        this.numberHexPerRow = new Array(state.hexGrid[0].length);
      }
    });
  }

  manualCreation = (): void => {
        // Manual game creation
        this.size = 60;
        this.width =  Math.sqrt(3) * this.size;
        this.height = this.size * 2;
        this.oddMarginLeft = this.width / 2;
        this.extraMarginRight = -1 * Math.sqrt(3) * (this.size / 4);
        this.extraMarginBottom = -1 * (this.size / 4);
        this.marginTop = -1 * this.height / 4;
        this.containerOffset = -1 * this.marginTop;
        this.myStyle =  { 'margin-right': this.extraMarginRight + 'px', 'margin-bottom': this.extraMarginBottom + 'px'};
        this.numberHexRows = new Array(10);
        this.numberHexPerRow = new Array(10);
        this.hexgrid = [];
        for (let x = 0; x < 10; x++) {
          this.hexgrid[x] = [];
          for (let y = 0; y < 10; y++) {
            this.hexgrid[x][y] = new Hexagon(x, y);
          }
        }

        // const controllerTest1: Controller = {id: 1, name: 'testName1', isPlayer: true};
        // const controllerTest2: Controller = {id: 2, name: 'testName2', isPlayer: true};
        const zoneTest1: Zone = {zoneId: 1, tintColorString: 'rgba(0, 255, 255, .25)', controllerId: 1 };
        const zoneTest2: Zone = {zoneId: 2, tintColorString: 'rgba(255, 0, 255, .25)', controllerId: 2 };

        const influenceMatrix: Map<number, Map<number, Influence>> = new Map<number, Map<number, Influence>>();
        influenceMatrix.set(0, new Map<number, Influence>());
        influenceMatrix.set(1, new Map<number, Influence>());

        // tslint:disable-next-line:max-line-length
         influenceMatrix.get(0).set(2, {calculatedValue: 10, baseValue: 5, resourceCount: 10, modifiers: [{operand: 0, value: 5, description: 'test description1'}]});

        // tslint:disable-next-line:max-line-length
         influenceMatrix.get(0).set(3, {calculatedValue: 10, baseValue: 5, resourceCount: 10, modifiers: [{operand: 0, value: 5, description: 'test description1'}]});

        // tslint:disable-next-line:max-line-length
        influenceMatrix.get(1).set(2, {calculatedValue: 10, baseValue: 5, resourceCount: 10, modifiers: [{operand: 0, value: 5, description: 'test description2'}]});

        // tslint:disable-next-line:max-line-length
        influenceMatrix.get(1).set(3, {calculatedValue: 10, baseValue: 5, resourceCount: 10, modifiers: [{operand: 0, value: 5, description: 'test description2'}]});

        // influenceMatrix[0] = [];
        // influenceMatrix[1] = [];
        // // tslint:disable-next-line:max-line-length
        // influenceMatrix[0][2] = {calculatedValue: 10, baseValue: 5, resourceCount: 10, modifiers: [{operand: 0, value: 5, description: 'test description1'}] };
        // // tslint:disable-next-line:max-line-length
        // influenceMatrix[0][3] = {calculatedValue: 20, baseValue: 15, resourceCount: 10, modifiers: [{operand: 0, value: 5, description: 'test description2'}] };
        // // tslint:disable-next-line:max-line-length
        // influenceMatrix[1][2] = {calculatedValue: 10, baseValue: 5, resourceCount: 10, modifiers: [{operand: 0, value: 5, description: 'test description4'}] };
        // // tslint:disable-next-line:max-line-length
        // influenceMatrix[1][3] = {calculatedValue: 10, baseValue: 5, resourceCount: 10, modifiers: [{operand: 0, value: 5, description: 'test description5'}] };

        // let zone: Zone = this.zoneService.getZone(1);
        // console.log(zone);

        // Example serialization/deserialization of the app state.
        let stateToSave: AppStateModel;
        this.store.selectOnce(AppState).subscribe((state: AppStateModel) => stateToSave = state);
        stateToSave.hexGrid = this.hexgrid;
        stateToSave.zones = [zoneTest1, zoneTest2];
        stateToSave.influenceMatrix = influenceMatrix;
        stateToSave.turnNumber = 0;
        stateToSave.hexagonSize = 60;
        stateToSave.gameName = 'Manually Created Game';
        const jsonConvert: JsonConvert = new JsonConvert();
        jsonConvert.operationMode = OperationMode.DISABLE; // print some debug data
        jsonConvert.ignorePrimitiveChecks = false; // don't allow assigning number to string etc.
        jsonConvert.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL; // never allow null

        try {
          const savedState: string = JSON.stringify(jsonConvert.serializeObject(stateToSave));
          // console.log(savedState);
          const blob = new Blob([savedState], {type: 'text/plain;charset=utf-8'});
          FileSaver.saveAs(blob, 'savedFile.txt');
        } catch (e) {
          debugger;
          console.log(e);
        }

  }

}
