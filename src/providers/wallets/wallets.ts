import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth, Logger } from 'aws-amplify';
const aws_exports = require('../../aws-exports').default;
import { DynamoDB } from '../../providers/providers';
import { Wallet } from '../types';

/*
  Generated class for the WalletsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const logger = new Logger('WalletsProvider');

@Injectable()
export class WalletsProvider {

  public wallets: [Wallet];
  private userId: string;
  private walletsTable: string = aws_exports.aws_resource_name_prefix + '-wallets';

  constructor(
    public http: HttpClient,
    public db: DynamoDB
  ) {
    console.log('Hello WalletsProvider Provider');
    Auth.currentCredentials()
      .then(credentials => {
        this.userId = credentials.identityId;
        this.refreshWallets();
      }).catch(err => logger.debug('get current credentials err', err));
  }

  refreshWallets() {
    const params = {
      'TableName': this.walletsTable,
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
        this.wallets = data.Items;
      })
      .catch(err => logger.debug('error in refresh tasks', err));
  }

}
