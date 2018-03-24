import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WalletsProvider } from '../../providers/wallets/wallets';
import { OrdersProvider } from '../../providers/orders/orders';

/**
 * Generated class for the WalletsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wallets',
  templateUrl: 'wallets.html',
})
export class WalletsPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public wallets: WalletsProvider,
    public orders: OrdersProvider
  ) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletsPage');
  }

  fundPkrAccount(){
    this.navCtrl.push('FundPkrAccountPage');
  }

}
