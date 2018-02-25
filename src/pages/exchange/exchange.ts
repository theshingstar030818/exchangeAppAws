import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Auth, Logger } from 'aws-amplify';
const aws_exports = require('../../aws-exports').default;
import { DynamoDB } from '../../providers/providers';

/**
 * Generated class for the ExchangePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 const logger = new Logger('Tasks');

@IonicPage()
@Component({
  selector: 'page-exchange',
  templateUrl: 'exchange.html',
})
export class ExchangePage {
  
  // banner = [{},{},{}];
  markets = [];
  private userId: string;
  public refresher: any;
  private marketsTable: string = aws_exports.aws_resource_name_prefix + '-markets';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public db: DynamoDB
  ) {
    Auth.currentCredentials()
      .then(credentials => {
        this.userId = credentials.identityId;
        this.refreshMarkets();
      })
      .catch(err => logger.debug('get current credentials err', err));
  }

  refreshData(refresher) {
    this.refresher = refresher;
    this.refreshMarkets()
  }

  refreshMarkets() {
    const params = {
      'TableName': this.marketsTable,
    };
    this.db.getDocumentClient()
      .then(client => client.scan(params).promise())
      .then(data => { this.markets = data.Items; })
      .catch(err => logger.debug('error in refresh tasks', err))
      .then(() => { this.refresher && this.refresher.complete() });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExchangePage');
  }

  viewMarket(market){
    console.log(market);
    this.navCtrl.push('MarketTradePage',market);
  }
}
