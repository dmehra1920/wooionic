import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, ToastController } from 'ionic-angular';
import { ProductDetails } from '../product-details/product-details';

import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  WooCommerce : any;
  products : any[];
  page : number;
  MoreProducts : any[];

@ViewChild('productSlides') productSlides : Slides;

  constructor(public navCtrl: NavController, public toastctrl : ToastController) {

    this.page = 2;

    this.WooCommerce = WC({

      url: "http://localhost/curativedemo",
      consumerKey:    "ck_1bc831d113ce5710a918c40184117fdbedc64cf2",
      consumerSecret: "cs_2308da5aac3f55d812b2de49ed5b137f2145e343"
    });

    this.loadMoreProducts(null);

      this.WooCommerce.getAsync("products").then((data)=> {
        console.log(JSON.parse(data.body));
        this.products = JSON.parse(data.body).products;
      },(err) => {
        console.log(err)
      })
  }

     ionViewDidLoad(){
       setInterval(()=> {

        if(this.productSlides.getActiveIndex() == this.productSlides.length() -1)
           this.productSlides.slideTo(0);

        this.productSlides.slideNext();
       },3000)
     }

     loadMoreProducts(event){

       if (event ==  null){
        this.page= 2;
        this.MoreProducts = [];
       }
      else
       this.page ++;
       this.WooCommerce.getAsync("products?page="+ this.page).then((data)=> {
        console.log(JSON.parse(data.body));
        this.MoreProducts = this.MoreProducts.concat(JSON.parse(data.body).products);

        if(event != null)
           event.complete();

        

        if(JSON.parse(data.body).products.length < 10){
           event.enable(false);

           this.toastctrl.create({
             message : "No More Products!",
             duration: 3000
             
           }).present();

           
        }

      },(err) => {
        console.log(err)
      })
       
     }

     openProductPage(product){
       this.navCtrl.push(ProductDetails, {"product": product});
     }

}
