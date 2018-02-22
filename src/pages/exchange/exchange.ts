import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ExchangePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-exchange',
  templateUrl: 'exchange.html',
})
export class ExchangePage {
  
  banner = [{},{},{}];
  markets = [{
    name: 'BTC',
    vol: 134.958,
    lastPrice: 100043.78
  },{
    name: 'ADA',
    vol: 2242.900,
    lastPrice: 43.78
  }];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExchangePage');
  }

  viewMarket(market){
    console.log(market);
    this.navCtrl.push('MarketTradePage',market);
  }
}
