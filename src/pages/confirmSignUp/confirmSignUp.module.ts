import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfirmSignUpPage } from './confirmSignUp';
 
@NgModule({
  declarations: [
    ConfirmSignUpPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfirmSignUpPage),
  ],
  exports: [
    ConfirmSignUpPage
  ]
})
export class ConfirmSignUpPageModule {}