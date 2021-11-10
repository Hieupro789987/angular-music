import { ISong } from './../../models/Song';
import { Component, OnInit } from '@angular/core';
import {
  collection,
  CollectionReference,
  Firestore,
  collectionData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IType, ICategory } from 'src/app/models/Category';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  public dataType!: Observable<IType[]>;
  public dataList: Array<IType[]>  = [];
  public cate: ICategory[] = [];
  public listSong: ISong[] = [];

  constructor(private afs: Firestore) {

    const cateList = collectionData<ICategory>(
      collection(this.afs, 'Category') as CollectionReference<ICategory>
    )

    cateList.subscribe(cate => {
        cate.forEach((val,index) => {
            this.dataType =  collectionData<IType>(
              collection(this.afs, 'Category', val.id, 'items') as CollectionReference<IType>
            );
            this.dataType.subscribe(el => {
                this.dataList[index] = el;   
            })           
        })
    })


    const song = collectionData<ISong>(
      collection(this.afs, 'Song') as CollectionReference<ISong>
    );

    song.subscribe(val => this.listSong = val);


  }

  ngOnInit() {}
  
}



