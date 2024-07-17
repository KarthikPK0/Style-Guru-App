import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  registerForm=this.fb.group({
    username:['',[Validators.pattern('[a-zA-Z ]*'),Validators.required]],
    email:['',[Validators.email,Validators.required]],
    password:['',[Validators.pattern('[a-zA-Z0-9]*'),Validators.required]]

  })

  constructor(private fb:FormBuilder,private toastr: ToastrService,private api:ApiService,private router:Router){}

  register(){
    if(this.registerForm.valid){
       
      const username = this.registerForm.value.username

      const email = this.registerForm.value.email
      const password = this.registerForm.value.password
      const user = {username,email,password}  
      this.api.registerAPI(user).subscribe({
        next:(result:any)=>{
          this.toastr.success(`${result.username} has successfully registered!!`)
          this.registerForm.reset()
          this.router.navigateByUrl('/login') 
        
        },
        error:(reason:any)=>{
          this.toastr.warning(reason.error)
        
          
        }
      })
    }else{
      this.toastr.info('Invalid Form!!')
    }
  }
}
