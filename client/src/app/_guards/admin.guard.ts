import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private accountService: AccountService,private router: Router , private toastr: ToastrService) { }

  canActivate( ): Observable<boolean> {
    return this.accountService.currentUser$.pipe(
      map(user => {
        if(user.roles.includes('Admin') || user.roles.includes('Moderator')) {
          return true;
        }
        this.toastr.error('You can not enter this area');
        this.router.navigateByUrl('/');
        return false;
      })
    )
  }
  
}
