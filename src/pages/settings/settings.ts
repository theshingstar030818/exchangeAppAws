import { Component } from '@angular/core';
import { App, Events } from 'ionic-angular';
import { Auth } from 'aws-amplify';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  templateUrl: 'settings.html'
})
export class SettingsPage {

  public aboutPage = 'AboutPage';
  public accountPage = 'AccountPage';
  public currency = 'pkr';
  
  constructor(
    public app: App,
    public events: Events
  ) {
  }

  logout() {
    Auth.signOut().then(() => {
      this.events.publish('user:logout');
      this.app.getRootNav().setRoot('LoginPage');
    });
  }

}
