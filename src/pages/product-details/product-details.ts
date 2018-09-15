import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import * as WC from 'woocommerce-api';
import { Storage } from '@ionic/storage';
import { parseCookieValue } from '@angular/common/src/cookie';
import { Cart } from '../cart/cart';
import { Card } from 'ionic-angular/components/card/card';

@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetails {
  

  WooCommerce : any;
  reviews : any[] = [];
  product : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl : ToastController, public storage: Storage, public modalCtrl : ModalController) {

    this.product = this.navParams.get("product");
    console.log(this.product);

    this.WooCommerce = WC({

      url: "http://localhost/curativedemo",
      consumerKey:    "ck_1bc831d113ce5710a918c40184117fdbedc64cf2",
      consumerSecret: "cs_2308da5aac3f55d812b2de49ed5b137f2145e343"
    });

    this.WooCommerce.getAsync('products/' + this.product.id + '/reviews' ).then((data) =>{

      this.reviews= JSON.parse(data.body).product_reviews;
      console.log(this.reviews);

    }, (err) => {
      console.log(err);
    })
  }

  addToCart(product){
   
    this.storage.get("cart").then((data)=>{
      
      if(data == null || data.length == 0){

        data = [];

        data.push({
          "product" : product,
          "qty" : 1,
          "amount" : parseFloat(product.price)
        });
      }
      else{
        let added = 0;
        for(let i=0; i<data.length; i++){

          if(product.id == data[i].product.id){

            console.log("product is already in the cart");

            let qty = data[i].qty;
            data[i].qty = qty+1;
            data[i].amount = parseFloat(data[i].amount) + parseFloat(data[i].product.price);
            added = 1;
          }
        }

        if(added ==0){
          data.push({
            "product" : product,
            "qty" : 1,
            "amount" : parseFloat(product.price)
          });


        }
      }

      this.storage.set("cart", data).then( () =>{

        console.log("Cart Updated");
        console.log(data);

        this.toastCtrl.create({
          message : "Cart Updated",
          duration : 3000
        }).present();

        }
      )
    
    })


  }

  openCart(){
    this.modalCtrl.create(Cart).present();
  }

}
 

