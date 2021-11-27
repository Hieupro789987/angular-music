
import { ModalService } from './../../services/modal/modal.service';
import { ISong } from '../../models/Song';
import { AudioService } from './../../services/audio/audio.service';
import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, AfterViewInit {

  public isPlayAudio: boolean;
  public currentTime: number;
  public isVolume: boolean;
  public song!: ISong;
  public songList!: ISong[];
  public animate?: any;
  public getDuration: string;
  public runDuration: string;
  public second = 0;
  public minutes = 0;
  public isLoop: boolean;
  public soundValue: number;
  public currentSound : number;
  public isOpen:boolean;
  @ViewChild('image') image?: ElementRef<HTMLImageElement>;
  @ViewChild('fill') fill?: ElementRef<HTMLSpanElement>



  constructor(private audioS: AudioService, private render: Renderer2, private modal: ModalService) {
    this.currentTime = 0;
    this.soundValue = 100;
    this.currentSound = this.soundValue;
    this.getDuration = '';
    this.runDuration = '';
    this.isPlayAudio = true;
    this.isVolume = false;
    this.isLoop = false;
    this.isOpen = true;
    
    this.song = {
      id: '',
      name: 'Người yêu đơn giản',
      nameArtist: 'Chi Dân',
      releaseDay: 2019,
      image: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/cover/8/4/c/4/84c436b697c9ac4ad9900de45af388a6.jpg',
      linkMP3: 'https://mp3-s1-zmp3.zadn.vn/6a19f4347c73952dcc62/4386825944004207103?authen=exp=1637820513~acl=/6a19f4347c73952dcc62/*~hmac=d655a369635e222c306da0ff4cf0641f&fs=MTYzNzY0NzmUsICxMzI5Nnx3ZWJWNnwwfDE3MS4yMzIdUngNzUdUngNQ',
      albumID: '',
      artistID: '',
      categoryID: [],
      actions: {
        love: {
          total: 0,
          user: [],
        }
      },
      duration: '05:37'
    }

    this.audioS.getAudio().src = this.song.linkMP3;

    this.render.listen(this.audioS.getAudio(), 'timeupdate', () => {


      this.currentTime = this.audioS.setTimeLoad();
      this.runDuration = this.audioS.runTimeSong();

      this.render.setStyle(this.fill?.nativeElement, 'width', `${this.currentTime}%`)

      if (this.audioS.getAudio().ended) {
        this.song = this.audioS.autoLoop(this.song, this.songList)
        this.audioS.setMusicPlaying(this.song.id)
      }
      if (this.audioS.getAudio().paused) {
        this.isPlayAudio = true;
        this.modal.sendCheckMusicPlaying(false)
      }
      else {
        this.isPlayAudio = false;
        this.animate.play();
        this.modal.sendCheckMusicPlaying(true)
      }
      // console.log(this.audioS.getAudio().currentSrc)


    })



  }

  ngOnInit(): void {
    this.audioS.getSong().subscribe(val => {
      this.song = val;
      this.audioS.setAudio(this.song.linkMP3);
      this.audioS.setMusicPlaying(this.song.id);
    })

    this.audioS.getList().subscribe(val => {
      this.songList = val;
    })
  }
  ngAfterViewInit() {
    this.animate = this.image!.nativeElement!.animate([
      { transform: 'rotate(360deg)' }
    ],
      {
        duration: 10000,
        iterations: Infinity
      }
    )
    this.animate.pause();
  }
  onActived() {
    this.isPlayAudio = !this.isPlayAudio;
    if (this.song) {
      if (this.isPlayAudio) {

        this.audioS.pauseAudio();
        this.animate?.pause();
      }
      else {
        this.audioS.playAudio();
        this.animate?.play();
        this.modal.sendCheckMusicPlaying(true)
      }
    }
  }
  onSeeking(val: Event) {
    const value: number = Number((val.target as HTMLInputElement).value);
    this.audioS.setCurrenttiem(value)



  }
  onReload() {
    this.audioS.reload();
    this.isPlayAudio = false;
  }

  onMove(val: string): void {
    if (this.songList) {
      const index = this.songList.findIndex(m => m.id === this.song.id);
      switch (val) {
        case 'next':
          if (this.songList[index + 1]) {
            this.audioS.onMove(index + 1, this.songList);
            this.isPlayAudio = false;
            this.audioS.setMusicPlaying(this.songList[index + 1].id)
          }
          break;
        case 'prev':
          if (this.songList[index - 1]) {
            this.audioS.onMove(index - 1, this.songList);
            this.audioS.setMusicPlaying(this.songList[index - 1].id)
            this.isPlayAudio = false;
          }
          break;
      }
    }
  }

  onMute() {
    this.isVolume = !this.isVolume;
    if (this.isVolume) {
      this.audioS.getAudio().muted = true;
      this.soundValue = 0;
    }
    else {
      this.audioS.getAudio().muted = false;
      this.soundValue =  this.currentSound * 100; 
    }
  }

  onVolume(val: Event) {
    const value: number = Number((val.target as HTMLInputElement).value);
    const volume = value / 100
    console.log(volume);
    
    this.audioS.getAudio().volume = volume;
    this.currentSound =  this.audioS.getAudio().volume;
    console.log(this.currentSound);
    
   
  }

  onLoop() {
    this.isLoop = !this.isLoop;
    this.audioS.getAudio().loop = this.isLoop;
  }


  openListQueue(){
    this.isOpen = !this.isOpen;
    this.modal.passData(this.isOpen);
  }

}
