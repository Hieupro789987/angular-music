import { Observable } from 'rxjs';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-artist',
  templateUrl: './show-artist.component.html',
  styleUrls: ['./show-artist.component.scss']
})
export class ShowArtistComponent implements OnInit {

   public list : any

  constructor(private afs: Firestore) {

      const artist: Observable<any> = collectionData<any>(
        collection(this.afs, 'Artist')
      )

      artist.subscribe(val => this.list = val);
   }

  ngOnInit(): void {
  }

}
