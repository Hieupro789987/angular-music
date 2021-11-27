import { User, user } from '@angular/fire/auth';
import { ModalService } from './../../services/modal/modal.service';
import { doc, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public currentUser!: User | null;

  constructor(private auth: AuthService, private route: Router) { 
    this.auth.user$.subscribe(user => {
      console.log(user);
      this.currentUser = user
    })

    
    
  }

  ngOnInit(): void {
   
  }

  logout() {
    this.auth.signOut();
    this.route.navigate(['/home'])
  }


}
