import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class Cart {

  cartItems : any[] = [];
  total : any;
  showEmptyCartMessage : boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage : Storage, public viewctrl : ViewController) {

    this.total = 0.0;

    this.storage.ready().then( (data) => {
      this.storage.get("cart").then((data) => { 

        this.cartItems = data;
        console.log(this.cartItems);

        if(this.cartItems.length > 0) {

          this.cartItems.forEach( (item, index)=> {
            this.total = this.total + (item.product.price * item.qty);
          })
        }
        else {

          this.showEmptyCartMessage = true;
        }

      })
      

    } )
  }

          removeFromCart(item , i){

            let price = item.product.price;
            let qty = item.qty;

            this.cartItems.splice(i, 1);

            this.storage.set("cart", this.cartItems).then( () => {

              this.total =  this.total - (price * qty);

            } );

            if(this.cartItems.length == 0)
               this.showEmptyCartMessage = true;
          }

          closeModal(){

            this.viewctrl.dismiss();
          }

}
