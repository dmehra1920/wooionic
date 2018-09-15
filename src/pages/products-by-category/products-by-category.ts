import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-products-by-category',
  templateUrl: 'products-by-category.html',
})
export class ProductsByCategory {

  WooCommerce : any;
  page : number;
  products : any[];
  category : any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.page = 1;
    this.category = this.navParams.get("category");

    this.WooCommerce = WC({

      url: "http://localhost/curativedemo",
      consumerKey:    "ck_1bc831d113ce5710a918c40184117fdbedc64cf2",
      consumerSecret: "cs_2308da5aac3f55d812b2de49ed5b137f2145e343"
    });


    this.WooCommerce.getAsync("products?filter[category]="+ this.category.slug).then((data)=> {
      console.log(JSON.parse(data.body));
      this.products = JSON.parse(data.body).products;
    },(err) => {
      console.log(err)
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsByCategoryPage');
  }

}
