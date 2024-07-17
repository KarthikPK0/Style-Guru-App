import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  wishlistCount:number = 0
  cartCount:number = 0
  username:any= ""
  @Input() dataFromParent:boolean = false

  constructor(private api:ApiService, private router:Router){}

  ngOnInit(): void {
    if(sessionStorage.getItem("user")){
      this.username = JSON.parse(sessionStorage.getItem("user") || "").username.split(" ")
      this.api.wishlistCount.subscribe((result:any)=>{
        this.wishlistCount = result
      })
      this.api.cartCount.subscribe((result:any)=>{
        this.cartCount = result
      })

    }else{
      this.username = ""
    }
  }

  getSearchKey(event:any){
    this.api.searchKey.next(event.target.value)
  }

  logout(){
    sessionStorage.clear()
    this.username = ""
    this.wishlistCount = 0
    this.cartCount = 0
    this.router.navigateByUrl('/')
  }

} 
