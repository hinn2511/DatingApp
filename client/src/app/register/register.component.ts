import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';
import { take } from 'rxjs/operators';
import { User } from '../_models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  users: any;
  user: User;

  registerForm: FormGroup;
  maxDate: Date;
  validationErrors: string[] = [];
  agree = false;

  constructor(private accountService: AccountService, private toastr: ToastrService,private fb: FormBuilder, private router: Router) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  initializeForm() {
    this.registerForm = this.fb.group ({
      gender: ['male'],
      username: ['',Validators.required],
      knownAs: ['',Validators.required],
      dateOfBirth: ['',Validators.required],
      city: ['',Validators.required],
      country: ['',Validators.required],
      password: ['', [Validators.required,
        Validators.minLength(8),
        Validators.maxLength(32)]],
      confirmPassword: ['', [Validators.required,
        this.matchValues('password')]]
    })
    this.registerForm.controls.password.valueChanges.subscribe(() => {
      this.registerForm.controls.confirmPassword.updateValueAndValidity;
    })
  }

  checked(event: any){
    this.agree = !this.agree;
    console.log(this.agree);
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value ? null : {isMatching: true}
    }
  }

  register(){
    if(this.agree) {
      this.accountService.register(this.registerForm.value).subscribe( response =>{
        this.router.navigateByUrl('/members');
      }, error =>{
        this.validationErrors = error;
      })
    }
  }

  cancel(){
    this.router.navigateByUrl("/home");
  }


}
