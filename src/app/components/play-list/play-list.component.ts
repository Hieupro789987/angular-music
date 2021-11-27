import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { Firestore, docData, collection, collectionData } from '@angular/fire/firestore';
import { ModalService } from './../../services/modal/modal.service';
import { Component, OnInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';
import { User } from '@firebase/auth';


interface IPlayList {
  id: string;
  title: string;
  image: string;
}

@Component({
  selector: 'app-play-list',
  templateUrl: './play-list.component.html',
  styleUrls: ['./play-list.component.scss']
})
export class PlayListComponent implements OnInit {

  public playList: IPlayList[];
  private currentUser!: User | null;

  constructor(private modal: ModalService, private afs: Firestore, private auth: AuthService, private route: Router) {
    this.playList = [];

    console.log('sdsdsdsdsds');

    this.auth.user$.subscribe(user => {
      this.currentUser = user;
      collectionData<any>(
        collection(this.afs, 'User', user!.uid, 'playList')
      ).subscribe(val => {
        this.playList = val;
      })
    })





  }

  ngOnInit(): void {

  }

  onCreatePlayList() {
    this.modal.sendModalPlayList({
      isOpen: true,
      create: true,
      list: false,
      data: undefined,
    });
  }


  chooseMyAlbum(id: string) {
    if (this.currentUser != null) {
      this.route.navigate(['mylist', id])
    }
  }
}
