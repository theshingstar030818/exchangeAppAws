import { Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { Order, OrderTimeInForce, Market } from '../../providers/types';

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
  
  @ViewChild('lineCanvas') lineCanvas;
  lineChart: any;
  
  sellOrder: Order = {
    type: 'Limit Sell',
    market: '',
    timeInForce: 'Good Til Cancelled (Default)',
    quantity: 0.00000000,
    price: 0.00000000,
    subtotal: 0.00000000,
    commission: 0.00000000,
    total: 0.00000000
  };

  buyOrder: Order = {
    type: 'Limit Buy',
    market: '',
    timeInForce: 'Good Til Cancelled (Default)',
    quantity: 0.00000000,
    price: 0.00000000,
    subtotal: 0.00000000,
    commission: 0.00000000,
    total: 0.00000000
  };

  currOrder: Order;
  orderType: OrderTimeInForce = 'Good Til Cancelled (Default)';

  activeSegment: string = 'buySell';
  market: Market;
  buyOrders = [{},{},{}];
  sellOrders = [{},{},{}];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
  ) {
    console.log(navParams.data);
    this.market = navParams.data;
    this.buyOrder.market = this.market.marketId;
    this.sellOrder.market = this.market.marketId;
  }

  ionViewDidLoad() {
    
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
          labels: ["January", "February", "March", "April", "May", "June", "July"],
          datasets: [
              {
                  label: this.market.marketId,
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgba(75,192,192,0.4)",
                  borderColor: "rgba(75,192,192,1)",
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: "rgba(75,192,192,1)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(75,192,192,1)",
                  pointHoverBorderColor: "rgba(220,220,220,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: [65, 59, 80, 81, 56, 55, 40],
                  spanGaps: false,
              }
          ]
      }

    });
  }

  addOrder(type){
    console.log(type);
  }

  showOrderConfirmAlert(order: Order) {
    this.currOrder = order;
    let alert = this.alertCtrl.create({
      title: order.type,
      message: ` 
      <h5>Market: `+order.market+`</h5>
      <p><b>Time In Force:</b> `+order.timeInForce+`</p>
      <p><b>Quantity:</b> `+order.quantity+' '+this.market.primaryCurrency+`</p>
      <p><b>Price:</b> `+order.price+' '+this.market.secondaryCurrency+`</p>
      <p><b>Subtotal:</b> `+order.subtotal+' '+this.market.secondaryCurrency+`</p>
      <p><b>Commission:</b> `+order.commission+' '+this.market.secondaryCurrency+`</p>
      <p><b>Total:</b> `+order.total+' '+this.market.secondaryCurrency+`</p>
      <br>
      <p>Please verify this order before confirming. All orders are final once submitted and we will be unable to issue you a refund.</p>
      `,
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: data => {
            console.log('Confirm clicked');
          }
        }
      ]
    });
    alert.present();
  }
}