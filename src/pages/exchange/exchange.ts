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
    ask: '100044.08',
    bid: '100043.01',
    change: 0.2,
    created: 1519274199513,
    high24hr: '103043.78',
    icon: 'https://www.cryptocompare.com/media/19633/btc.png',
    isActive: true,
    lastPrice: 100043.78,
    low24hr: '94043.82',
    nameCode: 'BTC',
    primaryCurrency: 'BTC',
    secondaryCurrency: 'PKR',
    spread: '',
    volume: 134.958,
    name: 'Bitcoin', 
    marketId: 'PKR-BTC'
  },{
    ask: '44.50',
    bid: '43.30',
    change: 0.2,
    created: 1519274199513,
    high24hr: '55.22',
    icon: 'https://www.cryptocompare.com/media/12318177/ada.png',
    isActive: true,
    lastPrice: 43.78,
    low24hr: '35.69',
    nameCode: 'ADA',
    primaryCurrency: 'ADA',
    secondaryCurrency: 'PKR',
    spread: '',
    volume: 2242.900,
    name: 'Cardano', 
    marketId: 'PKR-ADA'
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
