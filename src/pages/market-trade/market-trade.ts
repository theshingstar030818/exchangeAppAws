import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MarketTradePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-market-trade',
  templateUrl: 'market-trade.html',
})
export class MarketTradePage {
  
  market: any;
  buyOrders = [{},{},{}];
  sellOrders = [{},{},{}];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
    console.log(navParams.data);
    this.market = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MarketTradePage');
  }

  addOrder(type){
    console.log(type);
  }
}
