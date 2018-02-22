import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { CoinMarketCapProvider } from '../../providers/coin-market-cap/coin-market-cap';
import { CoinIconsProvider } from '../../providers/coin-icons/coin-icons';

/**
 * Generated class for the CoinMarketCapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-coin-market-cap',
  templateUrl: 'coin-market-cap.html',
})
export class CoinMarketCapPage {

  loader: any;
  paginationIncrement = 100;
  pagination = 100; 

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public coinMarketCapProvider:CoinMarketCapProvider,
    public loadingCtrl: LoadingController,
    public coinIconsProvider:CoinIconsProvider,
  ) {
    this.initLoader();
    this.presentLoader();
    coinMarketCapProvider.getCoinList().then((coinList)=>{
      if(coinList){
        
      }
      this.closeLoader();
    });
  }

  doInfinite(infiniteScroll) {
    this.pagination += this.paginationIncrement;
    infiniteScroll.complete(); 
    console.log(this.pagination);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PricesPage');
  }

  initLoader(){
    this.loader = this.loadingCtrl.create({
        content: "Please wait ...",
    });
  };

  presentLoader() {
      this.loader.present()
  };

  closeLoader(){
      this.loader.dismiss();
  }

}
