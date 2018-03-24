import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WithdrawPkrAccountPage } from './withdraw-pkr-account';

@NgModule({
  declarations: [
    WithdrawPkrAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(WithdrawPkrAccountPage),
  ],
})
export class WithdrawPkrAccountPageModule {}
