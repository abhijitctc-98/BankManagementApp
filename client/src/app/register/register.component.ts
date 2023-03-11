import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerTitle: any = 'Registration Page';
  recData: any;
  constructor(private http: HttpClient, private router: Router) {
    setTimeout(() => {
      this.registerTitle = 'Welcome to Sign-Up Page'
    }, 4000)
  }
  registerForm = new FormGroup({
    userName: new FormControl('', [ Validators.required ]),
    userMailID: new FormControl('', [ Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    userPassword: new FormControl('', [ Validators.required, Validators.minLength(9) ])
  });

  get Name() {
    return this.registerForm.get('userName');
  }

  get MailID() {
    return this.registerForm.get('userMailID')
  }

  get Password() {
    return this.registerForm.get('userPassword')
  }

  
  userSignup(data: any) {
    console.log(data);
    this.http.post('http://localhost:6969/api/users/addUser', data).subscribe((res) => {
      this.recData = res;
    });
    this.signupValidator();
  }
  signupValidator() {
    if (this.recData.status === true) {
      Swal.fire({  
        position: 'top-end',  
        icon: 'success',  
        title: 'Successfully Logged-in',  
        showConfirmButton: true,  
        timer: 2000  
      });
      this.router.navigate(['/login']);
    } else {
      Swal.fire({  
        position: 'top-end',  
        icon: 'error',  
        title: 'Logged-in Failed',  
        showConfirmButton: true,  
        timer: 2000  
      });
    }
    this.registerForm.reset();
  }
}
