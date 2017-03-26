import { Component } from '@angular/core';

import { GamePage } from '../game/game';
import { MapPage } from '../map/map';
import { HelpPage } from '../help/help';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = GamePage;
  tab2Root: any = MapPage;
  tab3Root: any = HelpPage;

  constructor() { }
}
