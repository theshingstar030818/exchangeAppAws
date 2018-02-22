import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CoinMarketCapPage } from './coin-market-cap';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    CoinMarketCapPage,
  ],
  imports: [
    IonicPageModule.forChild(CoinMarketCapPage),
    PipesModule
  ],
})
export class CoinMarketCapPageModule {}
