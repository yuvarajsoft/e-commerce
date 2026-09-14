import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Product } from '../../services/product';
import { IResponse } from '../../constants/constants';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private service = inject(Product);
  private route = inject(Router);
  loginModel = {
    UserName: '',
    UserPassword: ''
  }

  login(loginForm: NgForm) {
    this.loginModel = loginForm.value
    this.service.loginuser(this.loginModel).subscribe({
      next: (res: IResponse) => {
        if (res.result) {
          localStorage.setItem('user',JSON.stringify(res.data))
          alert('login sucessfull');
          this.route.navigate(['/home'])
        }
        else {
          alert('login failed!')
        }
      }, error: (err) => { console.log(err) }
    })

  }
}
