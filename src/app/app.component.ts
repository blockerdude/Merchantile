import { JsonConvert, ValueCheckingMode, OperationMode } from 'json2typescript';
import { AppStateModel } from './state/app.state.model';
import { Tile } from './models/tile.enum';
import { Hexagon } from './models/hexagon';
import { Store } from '@ngxs/store';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { SetHexGrid } from './state/actions/setHexGrid';
import { HttpClient } from '@angular/common/http';
import { SetGameState } from './state/actions/setGameState';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AppComponent implements OnInit {

  constructor(private store: Store,
              private http: HttpClient) {}

  ngOnInit() {

    const jsonConvert: JsonConvert = new JsonConvert();
    jsonConvert.operationMode = OperationMode.DISABLE; // print some debug data
    jsonConvert.ignorePrimitiveChecks = false; // don't allow assigning number to string etc.
    jsonConvert.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL; // never allow null

    this.http.get('./assets/savedFile.json').subscribe(data => {
       const restoredState: AppStateModel = jsonConvert.deserialize(data, AppStateModel);
       this.store.dispatch(new SetGameState(restoredState));
    });

  }
}
