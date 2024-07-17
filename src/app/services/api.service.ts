import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  searchKey = new BehaviorSubject("")
  wishlistCount = new BehaviorSubject(0)
  cartCount = new BehaviorSubject(0)

   server_url = "https://style-guru-server-fhgq.onrender.com" 

  constructor(private http:HttpClient) { 
    if(sessionStorage.getItem("token")){
      this.getWishlistCount()
      this.getCartCount()
    }
   }
  
  getAllProductsAPI(){
      return this.http.get(`${this.server_url}/all-products`)
  }

  viewProductAPI(id:any){
    return this.http.get(`${this.server_url}/${id}/view-product`)
  }

  registerAPI(user:any){
    return this.http.post(`${this.server_url}/register`,user)
  }

  loginAPI(user:any){
    return this.http.post(`${this.server_url}/login`,user)
  }

  //append token to http header
  appendToken(){
    const token = sessionStorage.getItem("token")
    let headers = new HttpHeaders()
    if(token){
      headers = headers.append("Authorization",`Bearer ${token}`)
    }
    return {headers}
  }

  addToWishlistAPI(product:any){
    return this.http.post(`${this.server_url}/addToWishlist`,product,this.appendToken())
  }

  getWishlistAPI(){
    return this.http.get(`${this.server_url}/get-wishlist` ,this.appendToken())
  }

  getWishlistCount(){
    this.getWishlistAPI().subscribe((result:any)=>{
      this.wishlistCount.next(result.length)
    })
  }

  removeWishlistAPI(id:any){
    return this.http.delete(`${this.server_url}/wishlist/${id}/remove` ,this.appendToken())
  }

  addToCartAPI(product:any){
    return this.http.post(`${this.server_url}/addToCart`,product,this.appendToken())
  }

  getCartAPI(){
    return this.http.get(`${this.server_url}/get-cart` ,this.appendToken())
  }

  removeCartAPI(id:any){
    return this.http.delete(`${this.server_url}/cart/${id}/remove` ,this.appendToken())
  }

  getCartCount(){
    this.getCartAPI().subscribe((result:any)=>{
      this.cartCount.next(result.length)
    })
  }

  incrementCartAPI(id:any){
    return this.http.get(`${this.server_url}/cart/${id}/increment`,this.appendToken())
  }

  decrementCartAPI(id:any){
    return this.http.get(`${this.server_url}/cart/${id}/decrement`,this.appendToken())
  }

  emptyCartAPI(){
    return this.http.delete(`${this.server_url}/empty-cart`,this.appendToken())
  }


}
