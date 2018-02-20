import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, LoadingController, IonicPage, Events } from 'ionic-angular';
import { Auth, Logger } from 'aws-amplify';

const logger = new Logger('Login');

export class LoginDetails {
  username: string;
  password: string;
}

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public loginDetails: LoginDetails;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public events: Events,
    public storage: Storage,
  ) {
    this.loginDetails = new LoginDetails(); 
  }

  login() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    let details = this.loginDetails;
    logger.info('login..');
    Auth.signIn(details.username, details.password)
      .then(user => {
        logger.debug('signed in user', user);
        if (user.challengeName === 'SMS_MFA') {
          this.navCtrl.push('ConfirmSignInPage', { 'user': user });
        } else {
          this.events.publish('user:login');
          this.navCtrl.setRoot('TabsPage');
        }
      })
      .catch(err => logger.debug('errrror', err))
      .then(() => loading.dismiss());
  }

  signup() {
    this.navCtrl.setRoot('SignupPage');
  }

}
