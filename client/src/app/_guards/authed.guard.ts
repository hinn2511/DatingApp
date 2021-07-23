import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthedGuard implements CanActivate {
  user: User;

  constructor(private accountService: AccountService, private router: Router, private toastr: ToastrService) {
    
  }

  canActivate( ): boolean {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
    })
    if (this.user) {
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
  
}
