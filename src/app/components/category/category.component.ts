import { Observable } from 'rxjs';
import { setDoc } from '@firebase/firestore';
import { ICategory, IType } from './../../models/Category';

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


  public dataType!: Observable<IType[]>;
  public dataList: Array<IType[]>  = [];
  public cate: ICategory[] = [];

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

    const listCate: Observable<ICategory[]> = collectionData<ICategory>(
      collection(this.afs, 'Category') as CollectionReference<ICategory>
    );
    listCate.subscribe(val => this.cate = val);

    
  }

  ngOnInit(): void {
  }

}
