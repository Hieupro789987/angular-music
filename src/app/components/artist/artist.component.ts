import { ISong } from './../../models/Song';
import { IArtist } from './../../models/Artist';
import { Component, OnInit } from '@angular/core';
import { doc, docData, DocumentReference, Firestore, collection, query,CollectionReference, collectionData } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { where } from '@firebase/firestore';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {

  public infoArtist?: IArtist;
  public listSong: ISong[] = [];

  constructor(private act : ActivatedRoute, private afs: Firestore) { 

      

  }



  ngOnInit(): void {

    const id: string = this.act.snapshot.params.id;
    
    const info = docData<IArtist>(
      doc(this.afs, "Artist", id) as DocumentReference<IArtist>
    )

    info.subscribe(val => this.infoArtist = val)
    
    const songOfArtist = collectionData<ISong>(
      query<ISong>(
        collection(this.afs, "Song" ) as CollectionReference<ISong>,
        where('artistID', '==', id)
      )
    )

    songOfArtist.subscribe(val => this.listSong =val)

  }

}
