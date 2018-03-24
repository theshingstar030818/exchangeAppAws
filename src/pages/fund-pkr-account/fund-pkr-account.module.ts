import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FundPkrAccountPage } from './fund-pkr-account';

@NgModule({
  declarations: [
    FundPkrAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(FundPkrAccountPage),
  ],
})
export class FundPkrAccountPageModule {}
