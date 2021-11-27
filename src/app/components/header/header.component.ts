import { Router, Params } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { ModalService } from './../../services/modal/modal.service';
import { Component, Input, OnInit } from '@angular/core';
import { User, user } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public currentUser!: User | null;
  constructor(private modal: ModalService, private auth: AuthService, private route : Router) {

    this.auth.user$.subscribe(user => {
      this.currentUser = user;
    })

    
    
  }

  ngOnInit(): void {
  }


  login() {
    if (this.currentUser == null) {
      this.modal.sendModalLogin(true);
    }
  }

  onSearch(data : any) {
    if(data.target.value) {
     this.modal.passData(data.target.value);
     this.route.navigate(['search'], {queryParams: { tk: data.target.value}});
   
    }

 
  }



}
