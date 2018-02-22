import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MarketTradePage } from './market-trade';

@NgModule({
  declarations: [
    MarketTradePage,
  ],
  imports: [
    IonicPageModule.forChild(MarketTradePage),
  ],
})
export class MarketTradePageModule {}
