import { AuthService } from './../../services/auth/auth.service';
import { ModalService } from './../../services/modal/modal.service';
import { Component, OnInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email: string ='';
  public password: string ='';

  constructor(private modal: ModalService, private auth : AuthService) {

  
   }

  ngOnInit(): void {
  }

  closeLogin() {
    this.modal.sendModalLogin(false)
  }

  login() {
    this.auth.googleSignIn('google.com').then(_ => {
       console.log('thành công');
       this.modal.sendModalLogin(false);
    })
    .catch((err)=> {
      console.log(err)
    })
  }
}
