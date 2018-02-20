import { Component } from '@angular/core';

import { NavController, NavParams, IonicPage, Events } from 'ionic-angular';
import { Auth, Logger } from 'aws-amplify';

const logger = new Logger('ConfirmSignIn');
@IonicPage()
@Component({
  selector: 'page-confirm-signin',
  templateUrl: 'confirmSignIn.html'
})
export class ConfirmSignInPage {
  
  public code: string;
  public user: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
  ) {
    this.user = navParams.get('user');
  }

  confirm() {
    Auth.confirmSignIn(this.user, this.code).then(() => {
      this.events.publish('user:login');
      this.navCtrl.push('TabsPage');
    }).catch(err => {
      logger.debug('confirm error', err);
    });
  }

  login() {
    this.navCtrl.push('LoginPage');
  }

}
