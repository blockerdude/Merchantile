import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ContextMenuComponent, ContextMenuService } from '../../../../node_modules/ngx-contextmenu';

@Component({
  selector: 'app-hexagon',
  templateUrl: './hexagon.component.html',
  styleUrls: ['./hexagon.component.scss']
})
export class HexagonComponent implements OnInit {

  imageString: string;
  width: number;
  height: number;

  @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;
  @Input() size: number;
  @Input() rowCord: number;
  @Input() colCord: number;

  // Option
  @Input() contextMenu: ContextMenuComponent;

  constructor(private contextMenuService: ContextMenuService) {}

  ngOnInit() {
    // this.imageString = 'url(\'./../../../../bird.jpg\')';
    this.imageString = 'url(/assets/bird.jpg)';
    this.width = Math.sqrt(3) * this.size;
    this.height = this.size * 2;
  }

  clicked() {
    console.log('', this.colCord + ', ' + this.rowCord);
  }

  showMessage = (text: string): void => {
    console.log(text);
  }

  public onContextMenu = ($event: MouseEvent, item: any): void => {
    this.contextMenuService.show.next({
      // Optional - if unspecified, all context menu components will open
      contextMenu: this.contextMenu,
      event: $event,
      item: item,
    });
    $event.preventDefault();
    $event.stopPropagation();
  }
}
