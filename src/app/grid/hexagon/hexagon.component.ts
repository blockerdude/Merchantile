import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ContextMenuComponent, ContextMenuService } from '../../../../node_modules/ngx-contextmenu';

@Component({
  selector: 'app-hexagon',
  templateUrl: './hexagon.component.html',
  styleUrls: ['./hexagon.component.scss']
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

  // TODO: can use own type for contextMenuActions (has click, enabled, visible, divider, etc etc)
  public contextMenuActions: any[];

  constructor(private contextMenuService: ContextMenuService) {}

  ngOnInit() {
    // this.imageString = 'url(\'./../../../../bird.jpg\')';
    this.imageString = 'url(/assets/bird.jpg)'; // , url(/assets/building.png)';
    if (this.colCord % 2 === 0 ) {
      this.overlayImageString = 'url(/assets/building.png)';
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
  }

  clicked() {
    console.log('', this.colCord + ', ' + this.rowCord);
  }

  showMessage = (action: any): void => {
    if (action.displayName === 'new item') {
      this.contextMenuActions = this.contextMenuActions.filter(x => x.displayName !== 'new item');
    } else {
      this.contextMenuActions = this.contextMenuActions.concat({enabled: () => true,
        visible: true,
        displayName: 'new item'});
    }

  }

}
