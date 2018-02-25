import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth, Logger } from 'aws-amplify';
const aws_exports = require('../../aws-exports').default;
import { DynamoDB } from '../../providers/providers';

/*
  Generated class for the OrdersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const logger = new Logger('OrdersProvider');

@Injectable()
export class OrdersProvider {
  
  public orders;
  private userId: string;
  private ordersTable: string = aws_exports.aws_resource_name_prefix + '-orders';

  constructor(
    public http: HttpClient,
    public db: DynamoDB
  ) {
    console.log('Hello OrdersProvider Provider');
    Auth.currentCredentials()
      .then(credentials => {
        this.userId = credentials.identityId;
        
      }).catch(err => logger.debug('get current credentials err', err));
  }

  refreshMarkets() {
    const params = {
      'TableName': this.ordersTable,
      'IndexName': 'OpenDateSorted',
      'KeyConditionExpression': "#userId = :userId",
      'ExpressionAttributeNames': { '#userId': 'userId' },
      'ExpressionAttributeValues': { ':userId': this.userId },
      'ScanIndexForward': false
    };
    this.db.getDocumentClient()
      .then(client => client.query(params).promise())
      .then(data => { 
        console.log('orders fetched');
        console.log(data);
        this.orders = data.Items; 
      })
      .catch(err => logger.debug('error in refresh tasks', err));
  }
  

}
