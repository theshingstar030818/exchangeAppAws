import { Component } from '@angular/core';

import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { Auth, Logger } from 'aws-amplify';

const logger = new Logger('Confirm');

@IonicPage()
@Component({
  selector: 'page-confirm',
  templateUrl: 'confirm.html'
})
export class ConfirmPage {
  
  public code: string;
  public username: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.username = navParams.get('username');
  }

  confirm() {
    Auth.confirmSignUp(this.username, this.code)
      .then(() => this.navCtrl.push('LoginPage'))
      .catch(err => logger.debug('confirm error', err));
  }

  resendCode() {
    Auth.resendSignUp(this.username)
      .then(() => logger.debug('sent'))
      .catch(err => logger.debug('send code error', err));
  }
}
