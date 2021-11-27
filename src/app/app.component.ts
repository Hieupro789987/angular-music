import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { ModalService } from './services/modal/modal.service';
import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'myApp';
  public isOpen: boolean = false;
  public isModalPlayList: { isOpen: boolean, create: boolean, list: boolean, data: any } = {
    isOpen: false,
    create: false,
    list: false,
    data: undefined
  };


  constructor(private modal: ModalService, private router: Router) { 
  }

  ngOnInit(): void {
    this.modal.getModalLogin().subscribe(val => this.isOpen = val);
    this.modal.getnModalPlayList().subscribe(val => this.isModalPlayList = val);

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });
  }
}
