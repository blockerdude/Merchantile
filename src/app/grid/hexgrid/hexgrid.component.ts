import { Observable } from 'rxjs/internal/Observable';
import { Hexagon } from './../../models/hexagon';
import { AppStateModel } from './../../state/app.state.model';
import { Store, Select } from '@ngxs/store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ContextMenuComponent } from '../../../../node_modules/ngx-contextmenu';
import { AppState } from '../../state/app.state';
import { JsonConvert, OperationMode, ValueCheckingMode } from 'json2typescript';
import * as FileSaver from 'file-saver';
import { HttpClient } from '@angular/common/http';

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


  constructor(private store: Store) {}

  ngOnInit() {

    this.gameState$.subscribe((state: AppStateModel) => {
      console.log('in hexgrid');
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

    // this.store.selectOnce(AppState).subscribe((state: AppStateModel) => {
    //   // debugger;
    //   console.log('in hexgrid');
    //   this.size = state.hexagonSize;


    //   // TODO: move calculations to a service?
    //   this.width =  Math.sqrt(3) * this.size;
    //   this.height = this.size * 2;
    //   this.oddMarginLeft = this.width / 2;
    //   this.extraMarginRight = -1 * Math.sqrt(3) * (this.size / 4);
    //   this.extraMarginBottom = -1 * (this.size / 4);
    //   this.marginTop = -1 * this.height / 4;
    //   this.containerOffset = -1 * this.marginTop;
    //   this.myStyle =  { 'margin-right': this.extraMarginRight + 'px', 'margin-bottom': this.extraMarginBottom + 'px'};
    //   if (state.hexGrid) {
    //     this.numberHexRows = new Array(state.hexGrid.length);
    //     this.numberHexPerRow = new Array(state.hexGrid[0].length);
    //   }

    // });



    // Example serialization/deserialization of the app state.
    // TODO: Create action to load in an entire game state
    // let stateToSave: AppStateModel;
    // this.store.selectOnce(AppState).subscribe((state: AppStateModel) => stateToSave = state);
    // let jsonConvert: JsonConvert = new JsonConvert();
    // jsonConvert.operationMode = OperationMode.DISABLE; // print some debug data
    // jsonConvert.ignorePrimitiveChecks = false; // don't allow assigning number to string etc.
    // jsonConvert.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL; // never allow null

    // const savedState: string = JSON.stringify(jsonConvert.serialize(stateToSave));
    // console.log(savedState);
    // let blob = new Blob([savedState], {type: 'text/plain;charset=utf-8'});
    // FileSaver.saveAs(blob, 'savedFile.txt');

  }

}
