import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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
    userName: new FormControl(''),
    userMailID: new FormControl(''),
    userPassword: new FormControl('')
  });
  userSignup(data: any) {
    console.log(data);
    this.http.post('http://localhost:6969/api/users/addUser', data).subscribe((res) => {
      this.recData = res;
    })
    if (this.recData.status === true) {
      Swal.fire({  
        position: 'top-end',  
        icon: 'success',  
        title: 'Successfully Logged-in',  
        showConfirmButton: false,  
        timer: 1500  
      });
      this.router.navigate(['/home']);
    } else {
      Swal.fire({  
        position: 'top-end',  
        icon: 'warning',  
        title: 'Logged-in Failed',  
        showConfirmButton: false,  
        timer: 1500  
      });
    }
    this.registerForm.reset();
  }
}
