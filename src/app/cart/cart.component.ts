import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
  couponStatus:boolean = false
  allProducts:any= []
  cartTotalPrice:number = 0
  couponClickedStatus:boolean = false
  constructor(private api:ApiService, private toastr:ToastrService,private router:Router){}

  ngOnInit(): void {
    if(sessionStorage.getItem("token")){
      this.getCart()
    } 
  }

  backToOffers(){
    this.couponStatus = false
  }

  discount5percent(){
      this.couponClickedStatus = true
      let discount = Math.ceil(this.cartTotalPrice*.05)  
      this.cartTotalPrice -= discount
  }

  discount20percent(){
    this.couponClickedStatus = true
    let discount = Math.ceil(this.cartTotalPrice*.02)  
    this.cartTotalPrice -= discount
}

discount50percent(){
  this.couponClickedStatus = true
  let discount = Math.ceil(this.cartTotalPrice*.5)  
  this.cartTotalPrice -= discount
}

checkout(){
  sessionStorage.setItem("total",JSON.stringify(this.cartTotalPrice))
  this.router.navigateByUrl("/checkout")
}

  
  getCoupon(){
    this.couponStatus = true
  }

  getCart(){
    this.api.getCartAPI().subscribe((result:any)=>{
      this.allProducts = result
      console.log(this.allProducts);
      this.getCartTotalPrice()
      
      this.api.getCartCount()
    })
   }

   removeItem(id:any){
    this.api.removeCartAPI(id).subscribe((res:any)=>{
      this.getCart()
    })
  
   }
   

   getCartTotalPrice(){
    this.cartTotalPrice = Math.ceil(this.allProducts.map((item:any)=>item.totalPrice).reduce((p1:any,p2:any)=>p1+p2))
   }

   incrementQuantity(id:any){
    this.api.incrementCartAPI(id).subscribe((res:any)=>{
      this.getCart()

    })
   }

   decrementQuantity(id:any){
    this.api.decrementCartAPI(id).subscribe((res:any)=>{
      this.getCart()
      this.api.getCartCount()
      
    })
   }

   emptyCart(){
    this.api.emptyCartAPI().subscribe((res:any)=>{
      this.getCart()
      this.api.getCartCount()
    })
   }
   

 
}
