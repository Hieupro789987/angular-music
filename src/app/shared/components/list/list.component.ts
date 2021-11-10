import { Component, Input, OnInit } from '@angular/core';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() listSong : Array<any> = [];

  constructor(private route : Router, private afs: Firestore) { }

  ngOnInit(): void {
  }



}
