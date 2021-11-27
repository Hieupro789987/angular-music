import { Firestore } from '@angular/fire/firestore';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { collection } from '@firebase/firestore';
import { collectionData } from 'rxfire/firestore';
import { ISong } from 'src/app/models/Song';

@Component({
  selector: 'app-my-song',
  templateUrl: './my-song.component.html',
  styleUrls: ['./my-song.component.scss']
})
export class MySongComponent implements OnInit {

  public listSong: ISong[];
  constructor(private auth: AuthService,private afs : Firestore) { 
    this.listSong = [];
    this.auth.user$.subscribe(user => {
      collectionData<any>(
        collection(this.afs, 'Song')
      ).subscribe(val => {
        this.listSong = val.filter(ele =>  ele.actions.love.user.includes(user?.uid) == true);
        console.log(user!.uid);
        
        console.log(val[0].actions.love.user.includes(user?.uid));
        
      })
    })

  }

  ngOnInit(): void {
  }

}
