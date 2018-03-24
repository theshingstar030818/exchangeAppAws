import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Order } from '../../providers/types';
import { Auth, Logger } from 'aws-amplify';
const aws_exports = require('../../aws-exports').default;
import { DynamoDB } from '../../providers/providers';
import { OrdersProvider } from '../../providers/orders/orders';
import { WalletsProvider } from '../../providers/wallets/wallets';

/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {

  ordersSegment: string = 'open';
  openOrders:[Order];
  private userId: string;
  public refresher: any;

  public tabComponent: string = 'ExchangeTabsPage';
  public component: string = 'ExchangeTabsPage';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public db: DynamoDB,
    public orders: OrdersProvider,
    public wallets: WalletsProvider
  ) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');
  }

}
