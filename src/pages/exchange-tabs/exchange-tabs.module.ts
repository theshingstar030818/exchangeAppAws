import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExchangeTabsPage } from './exchange-tabs';

@NgModule({
  declarations: [
    ExchangeTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(ExchangeTabsPage),
  ]
})
export class ExchangeTabsPageModule {}
