import { User } from '@angular/fire/auth';
import { AuthService } from './../../services/auth/auth.service';
import { ModalService } from './../../services/modal/modal.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public currentUser: User | null;

  constructor(private modal : ModalService, private auth : AuthService) { 
    this.currentUser = null;
    this.auth.user$.subscribe(user => {
      this.currentUser = user;
    })
  }

  ngOnInit(): void {
  }

  onCreatePlayList() {
    if(this.currentUser != null) {
      this.modal.sendModalPlayList({
        isOpen: true,
        create: true,
        list: false,
        data: undefined,
      });
    }else {
      this.modal.sendModalLogin(true);
    }

  }

}
