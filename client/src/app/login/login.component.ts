import { Component } from '@angular/core';
import {} from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'
import Swal from 'sweetalert2'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginTitle: any = 'Login Page'
  resData: any;
  constructor(private http: HttpClient, private router: Router) {
    setTimeout(() => {
      this.loginTitle = 'Welcome to Login Page'
    }, 4000)
  }
  loginForm = new FormGroup({
    userMailID: new FormControl('', [ Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$") ]),
    userPassword: new FormControl('', [ Validators.required ])
  });

  get MailID() {
    return this.loginForm.get('userMailID');
  }

  get Password() {
    return this.loginForm.get('userPassword');
  }

  userLogin(data: any) {
    console.log(data);
    this.http.post('http://localhost:6969/api/users/userLogin', data).subscribe((res: any) => {
      console.log(res['status']);
      this.resData = res;
      // Callback of Login Validator Function
      this.loginValidator();
    })
  }
  loginValidator() {
    if (this.resData.status === true) {
      Swal.fire({  
        position: 'top-end',  
        icon: 'success',  
        title: 'Successfully Logged-in',  
        showConfirmButton: false,  
        timer: 2000  
      });
      this.router.navigate(['/home']);
    } else if (this.resData.status === false) {
      Swal.fire({  
        position: 'top-end',  
        icon: 'error',  
        title: 'Invalid Credentials',  
        showConfirmButton: true,  
        timer: 2000  
      });
    }
    this.loginForm.reset();
  }
}
