import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modalLogin$ = new Subject<boolean>();
  private modalcreatePlayList$ = new Subject< {isOpen: boolean , create : boolean, list: boolean, data : any }>();
  private music$ = new Subject<boolean>();
  private data$ = new Subject<any>();

  constructor() { }

 sendCheckMusicPlaying(isPlaying : boolean) {
    this.music$.next(isPlaying);
  }
  getCheckMusicPlaying() : Observable<boolean> {
    return this.music$.asObservable();
  }


  sendModalLogin(isOpen: boolean) {
    this.modalLogin$.next(isOpen);
  }
  getModalLogin(): Observable<boolean> {
    return this.modalLogin$.asObservable();
  }


  sendModalPlayList( data :  {isOpen: boolean , create : boolean, list: boolean ,data : any }) {
    this.modalcreatePlayList$.next(data);
  }
  getnModalPlayList(): Observable<{isOpen: boolean , create : boolean, list: boolean,data : any  }> {
    return this.modalcreatePlayList$.asObservable();
  }


  passData(value :any) {
    this.data$.next(value);
  }

  getData(): Observable<any> {
    return  this.data$.asObservable();
  }

}
