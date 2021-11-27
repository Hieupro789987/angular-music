import { AuthService } from './../../services/auth/auth.service';
import { ModalService } from './../../services/modal/modal.service';
import { Observable } from 'rxjs';
import { where } from '@firebase/firestore';
import { collection, collectionData, CollectionReference, doc, docData, DocumentReference, Firestore, query } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { ISong } from 'src/app/models/Song';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-show-type',
  templateUrl: './show-type.component.html',
  styleUrls: ['./show-type.component.scss']
})
export class ShowTypeComponent implements OnInit {

  public songList: ISong[];
  public listMore: ISong[];
  public obj: ISong[];
  private type: string | null = '';
  private ID = '';
  private artistID = '';
  constructor(private act: ActivatedRoute, private afs: Firestore, private modal: ModalService, private auth: AuthService) {
    this.songList = [];
    this.listMore = [];
    this.obj = [];

    this.act.url.subscribe(val => {
      const [url1, url2, url3] = val
      this.type = url1.path;
      this.ID = url2.path;

      if (url3) {
        this.artistID = url3.path;
      }


    })

    if (this.type == 'album') {
      collectionData<ISong>(
        query(
          collection(this.afs, "Song") as CollectionReference<ISong>,
          where('categoryID', "array-contains", this.ID)
        )
      ).subscribe(val => {
        this.songList = val;
        this.obj = [...val];
      })
    }

    if (this.type == 'song') {
      collectionData<ISong>(
        query(
          collection(this.afs, "Song") as CollectionReference<ISong>,
          where('id', "==", this.ID)
        )
      ).subscribe(val => {
        this.songList = val;
        this.obj = [...val];
      })

      collectionData<ISong>(
        query(
          collection(this.afs, "Song") as CollectionReference<ISong>,
          where('artistID', "==", this.artistID)
        )
      ).subscribe(val => {
        this.listMore = val.filter(e => e.id !== this.ID)
      })
    }

    if (this.type == 'mylist') {
      this.auth.user$.subscribe(user => {
        collectionData<any>(
          collection(this.afs, 'User', user!.uid, 'playList', this.ID, 'listSong')
        ).subscribe(val => {
          this.songList = val
          this.obj = [...val];
        })
      })

    }
  }

  ngOnInit(): void {


  }

  onSort(data : any) {

    
    if(data.target.value === 'asc') {
      this.songList = this.songList.sort((a, b) => {
        if (a.name < b.name) return 1;
        if (a.name > b.name) return -1;
        return 0;
      })
     
    }
    if(data.target.value === 'desc') {
      this.songList = this.songList.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      })
    }
    if(data.target.value === 'default') {
      const a = [...this.obj]
      console.log('default');
      
      this.songList =a ;
    }
   
  }

}
