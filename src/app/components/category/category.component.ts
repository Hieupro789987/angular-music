import { Observable } from 'rxjs';
import { setDoc } from '@firebase/firestore';
import { ICategory, IType } from '../../models/Category';

import { Component, OnInit } from '@angular/core';
import {
  collection,
  CollectionReference,
  Firestore,
  collectionData,
} from '@angular/fire/firestore';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  public dataList: any = [];


  constructor(private afs: Firestore) {

    const cateList = collectionData<ICategory>(
      collection(this.afs, 'Category') as CollectionReference<ICategory>
    )


    cateList.subscribe(val => {
        this.dataList= val;
    })

  
  }

  ngOnInit(): void {
  }



}
