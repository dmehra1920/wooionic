import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ComponentType } from '@angular/core/src/render3/definition_interfaces';
import * as WC from 'woocommerce-api';
import { ProductsByCategory} from '../products-by-category/products-by-category';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class Menu {
     homePage : any;
     WooCommerce : any;
     categories : any[];
     @ViewChild('content') childNavCtrl : NavController;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
   this.homePage = HomePage;
   this.categories = [];

   this.WooCommerce = WC({

    url: "http://localhost/curativedemo",
    consumerKey:    "ck_1bc831d113ce5710a918c40184117fdbedc64cf2",
    consumerSecret: "cs_2308da5aac3f55d812b2de49ed5b137f2145e343"
  });

  this.WooCommerce.getAsync("products/categories").then((data)=> {

    console.log(JSON.parse(data.body).product_categories);

    let temp : any[] = JSON.parse(data.body).product_categories;

    for (let i=0; i< temp.length; i++){
      if(temp[i].parent == 0){

        if(temp[i].slug == "medicine")
          temp[i].icon="medkit";
         this.categories.push(temp[i]);
      }
    }
  }, (err)=> {
    console.log(err);
  })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  openCategoryPage(category){
    this.childNavCtrl.setRoot(ProductsByCategory, {"category" : category});

  }
}
