import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the ExchangeTabsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-exchange-tabs',
  templateUrl: 'exchange-tabs.html'
})
export class ExchangeTabsPage {
  
  exchangeRoot = 'ExchangePage'
  ordersRoot = 'OrdersPage'
  walletsRoot = 'WalletsPage'

  constructor(public navCtrl: NavController) {}

}
