import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { ISong } from 'src/app/models/Song';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  private audio = new Audio();



  public link: string = '';
  // public currentTime: number = 0;
  private duration: number = 0;


  private songSubject = new Subject<ISong>();
  private listSubject = new Subject<ISong[]>();
  private songPlayingSubject = new Subject<string>();

  constructor() {

    console.log(this.audio.duration);

  }

  sendSong(song: ISong) {
    this.songSubject.next(song);
  }

  sendList(song: ISong[]) {
    this.listSubject.next(song);
  }


  getSong(): Observable<ISong> {
    return this.songSubject.asObservable();
  }

  getList(): Observable<ISong[]> {
    return this.listSubject.asObservable();
  }


  /** BÀI NHẠC HIỆN ĐANG PHÁT */

  setMusicPlaying(id: string) {
    this.songPlayingSubject.next(id)
  }
  getMusicPlaying(): Observable<string> {
    return this.songPlayingSubject.asObservable();
  }


  /**Xử lý audio */

  getAudio(): HTMLAudioElement {
    return this.audio;
  }

  setAudio(src: string): void {
    this.audio.pause();
    this.audio.src =  src;
    
    this.playAudio();
  }


  playAudio(): void {
    this.audio.play();


  }
  pauseAudio(): void {
    this.audio.pause();
  }



  reload() {
    this.audio.load();
    this.playAudio();
  }

  setTimeLoad() {
    const timeLoad = Math.floor((this.audio.currentTime / this.audio.duration) * 100);
    return timeLoad;
  }

  setCurrenttiem(time: number) {
    const seekTime = (time / 100 * this.audio.duration);
    this.audio.currentTime = seekTime;
  }

  autoLoop(song: ISong, listSong: ISong[]): ISong {
    const songIsPlayed = song;
    const index = listSong.findIndex(m => m.id === songIsPlayed.id);
    if (listSong[index + 1]) {
      song = listSong[index + 1];
      this.audio.src = listSong[index + 1]?.linkMP3;
      this.playAudio();
    }
    else {
      song = listSong[0];
      this.audio.src = listSong[0]?.linkMP3;
      this.playAudio();
    }
    return song;
  }

  onMove(index: number, listSong: ISong[]) {
    var playPromise = this.audio.play();

    if (playPromise !== undefined) {
      playPromise.then(_ => {

        this.audio.src = listSong[index]?.linkMP3;
        const song = listSong[index];
        this.sendSong(song);
        this.pauseAudio();
        this.reload();
        this.playAudio();
      })
        .catch(error => {
          console.log(error)
        });
    }
  }


  runTimeSong() {
    let currentMin: number = Math.floor(this.audio.currentTime / 60);
    let currentSec: number = Math.floor(this.audio.currentTime % 60);
    const mi = currentMin > 9 ? currentMin : `0${currentMin}`;
    const se = currentSec > 9 ? currentSec : `0${currentSec}`;

    const duration = `${mi}:${se}`;
    return duration;

  }

}
