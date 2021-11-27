import { User, user } from '@angular/fire/auth';
import { AuthService } from './../../services/auth/auth.service';
import { doc, Firestore, setDoc, collection, docData, updateDoc, collectionData, CollectionReference } from '@angular/fire/firestore';
import { ModalService } from './../../services/modal/modal.service';
import { Component, Input, OnInit } from '@angular/core';

interface IPlayList {
  id: string;
  title: string;
  image: string;
}
@Component({
  selector: 'app-modal-create-play-list',
  templateUrl: './modal-create-play-list.component.html',
  styleUrls: ['./modal-create-play-list.component.scss']
})
export class ModalCreatePlayListComponent implements OnInit {

  public currentUser!: User | null;
  public titleName: string = '';
  public playList: IPlayList[];

  @Input() isPlayList:{isOpen: boolean , create : boolean, list: boolean , data : any};

  constructor(private modal: ModalService, private afs: Firestore, private auth: AuthService) {
    this.isPlayList = {
      isOpen:false,
      create: false,
      list:true ,
      data : undefined
    };
    this.playList = [];

    this.auth.user$.subscribe(user => {
      this.currentUser = user;
      if(user) {
        collectionData<IPlayList>(
          collection(this.afs, 'User', user.uid, 'playList') as CollectionReference<IPlayList>
        ).subscribe(val => {
          this.playList = val;
        })
      }

    })


  }

  ngOnInit(): void { }

  close() {
    this.modal.sendModalPlayList({
      isOpen: false,
      create: false,
      list: false,
      data: undefined,
    });
  }

  create() {

    if (this.currentUser != null) {
      if (this.titleName) {
        const idUser: string | undefined = this.currentUser!.uid;
        const idList = String(performance.now());
        const docRef = doc(this.afs, 'User', idUser, 'playList', idList);

        setDoc(docRef, {
          id: idList,
          title: this.titleName,
          image: 'https://photo-zmp3.zadn.vn/album_default.png'
        }).then(_ => {

        }).catch((err) => {
          console.log(err);

        })

        this.close();
      }
    }
    else {
      alert('yêu cầu cần đăng nhập')
    }
  }

  choosePlayList(playListID : string) {
    console.log(this.isPlayList.data.id, playListID);
    const idUser: string | undefined = this.currentUser!.uid;
    const docRef = doc(this.afs, 'User', idUser, 'playList', playListID,'listSong',this.isPlayList.data.id);
    setDoc(docRef, this.isPlayList.data).then(_ => {
      this.modal.sendModalPlayList({
        isOpen: false,
        create: false,
        list: false,
        data: undefined,
      });
    }).catch((err) => {
      console.log(err);

    })
  } 

  openModalCreate() {
    console.log('têtt');
  
  if(this.currentUser) {
    this.modal.sendModalPlayList({
      isOpen: true,
      create: true,
      list: false,
      data: undefined,
    });
  }
  else {
    this.modal.sendModalLogin(true);
    this.modal.sendModalPlayList({
      isOpen: false,
      create: false,
      list: false,
      data: undefined,
    });
  }

  }
}
