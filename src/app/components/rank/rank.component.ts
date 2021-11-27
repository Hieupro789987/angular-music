import { collectionData, Firestore, CollectionReference } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { ISong } from 'src/app/models/Song';
import { collection } from '@firebase/firestore';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.scss']
})
export class RankComponent implements OnInit {

  public listSong: ISong[];
  public start: number;
  public end: number;

  constructor(private afs: Firestore) {
    this.listSong = [];
    this.start = 0;
    this.end = 10;
 

    collectionData<ISong>(
      collection(this.afs, 'Song') as CollectionReference<ISong>
    ).subscribe(song => {
      this.listSong = song.sort((a, b) => {
        if (a.actions.love.total < b.actions.love.total) return 1;
        if (a.actions.love.total > b.actions.love.total) return -1;
        return 0;
      })
    })
  }

  ngOnInit(): void {
  }

  onViewAll() {
    this.start = 0;
    this.end = this.listSong.length
  }

}
