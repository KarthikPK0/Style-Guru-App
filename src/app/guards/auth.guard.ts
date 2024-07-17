import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = ()  => {
  const authService = inject(AuthService)
  const toastr = inject(ToastrService)
  const router = inject(Router)

  if(authService.isLoggedin()){
    return true;
  }else{
    toastr.warning(`Operation denied Please login!!`)
    router.navigateByUrl(`/login`)
    return false;
  }
  
};
