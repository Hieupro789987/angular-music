import { ActivatedRoute } from '@angular/router';
import { ModalService } from './../../../services/modal/modal.service';
import { AuthService } from './../../../services/auth/auth.service';
import { AudioService } from './../../../services/audio/audio.service';
import { ISong } from '../../../models/Song';
import { Component, Input, OnInit, ViewChildren, QueryList, ElementRef, ViewChild, Renderer2, Output, EventEmitter, OnChanges, AfterViewInit } from '@angular/core';
import { doc, Firestore, } from '@angular/fire/firestore';
import { updateDoc } from '@firebase/firestore';
import { PlayerQueueComponent } from 'src/app/components/player-queue/player-queue.component';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit {

  @Input() start: number;
  @Input() end: number;
  @Input() listSong: Array<any>;
  @Input() currentIsPlayed?: ISong;
  @Input() hide: boolean;
  @ViewChildren('gif') listHtml!: QueryList<ElementRef<HTMLDivElement>>
  @ViewChildren('favorite') favoriteList!: QueryList<ElementRef<HTMLSpanElement>>;
  @ViewChild('imageGif') imageGif!: ElementRef<HTMLImageElement>;
  public isShow: boolean;
  public isCheckMusiPlaying: boolean | null;;
  public isFavorite: boolean;
  public userIsLiked: any;
  public params:string;
  public items = ['blue','green','red'];

 

  constructor(
    private audio: AudioService,
    private renderer: Renderer2,
    private modal: ModalService,
    private afs: Firestore,
    private auth: AuthService,
    private act: ActivatedRoute
  ) {
    

    this.listSong = [];
    this.isShow = false;
    this.isCheckMusiPlaying = false;
    this.isFavorite = false;
    this.start = 0;
    this.end = 0;
    this.hide = true;
    this.params = '';


    this.act.url.subscribe(url => {
      const [path] = url;
      this.params = path.path; 
      
    })
    
    // this.params = this.act.url;

    this.auth.user$.subscribe(val => {
      this.userIsLiked = val?.uid;
    })
  }
  ngOnChanges() {
  
  }

  ngOnInit(): void {
    this.modal.getCheckMusicPlaying().subscribe(e => {
      this.isCheckMusiPlaying = e;  
    })

  }

  ngAfterViewInit() {
   
    this.audio.getMusicPlaying().subscribe(val => {
      const index = this.listSong.findIndex(m => m.id === val);
      
      this.listHtml.toArray().forEach(e => {
        this.renderer.removeClass(e?.nativeElement, 'active');
      })
      if(this.listHtml?.toArray()[index]?.nativeElement) {
        this.renderer?.addClass(this.listHtml?.toArray()[index]?.nativeElement, 'active')
      }
    })
  }
  onChoose(song: ISong) {
    this.audio.sendSong(song);
    this.audio.sendList(this.listSong);
  }
  async onClickFavorite(song: ISong) {
    if (this.auth.getAuth().currentUser != null) {
      const songRef = doc(this.afs, 'Song', song.id);
      const index = song.actions.love.user.includes(this.userIsLiked);
      if (!index) {
        song.actions.love.user.push(this.userIsLiked)
        await updateDoc(songRef, {
          actions: {
            love: {
              total: song.actions.love.total + 1,
              user: song.actions.love.user
            }
          }
        })

      }
      else {
        const index = song.actions.love.user.findIndex(x => x === this.userIsLiked);
        song.actions.love.user.splice(index, 1);
        await updateDoc(songRef, {
          actions: {
            love: {
              total: song.actions.love.total > 0 ? song.actions.love.total - 1 : 0,
              user: song.actions.love.user
            }
          }
        })
      }
    }
    else {
        this.modal.sendModalLogin(true);
    }

  }
  openModalList(song: ISong) {
    this.modal.sendModalPlayList({
      isOpen: true,
      create: false,
      list: true,
      data: song,
    });
  }

}


