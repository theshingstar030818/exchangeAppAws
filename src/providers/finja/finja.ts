import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the FinjaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

/*

  development customerIdMerchant: 506986460

*/


@Injectable()
export class FinjaProvider {

  constructor(public http: HttpClient) {
    console.log('Hello FinjaProvider Provider');
  }

}
