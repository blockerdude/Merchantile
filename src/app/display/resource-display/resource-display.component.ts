import { Observable } from 'rxjs/internal/Observable';
import { Store, Select } from '@ngxs/store';
import { Component, OnInit, Input } from '@angular/core';
import { ResourceBundle } from 'src/app/models/resourceBundle';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-resource-display',
  templateUrl: './resource-display.component.html',
  styleUrls: ['./resource-display.component.scss']
})
export class ResourceDisplayComponent implements OnInit {

  @Input() playerId: number;

  @Select(AppState.playerResources(this.playerId)) resources$: Observable<ResourceBundle>;

  constructor(private store: Store) { }

  ngOnInit() {
    this.resources$.subscribe((value: ResourceBundle) => {
      console.log(value);
    });
  }

}
