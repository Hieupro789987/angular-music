import { ListComponent } from './../../shared/components/list/list.component';
import { AudioService } from './../../services/audio/audio.service';
import { ISong } from 'src/app/models/Song';
import { ModalService } from './../../services/modal/modal.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit, ViewChild, Renderer2, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-player-queue',
  templateUrl: './player-queue.component.html',
  styleUrls: ['./player-queue.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        marginRight:'0',
        opacity: 1,
       
      })),
      state('closed', style({
        marginRight:'-320px',
        opacity: 0.8,
      })),
      transition('open => closed', [
        animate('0.25s')
      ]),
      transition('closed => open', [
        animate('0.25s')
      ]),
    ]),
  ],
})
export class PlayerQueueComponent implements OnInit, AfterViewInit {
  public isDislay: boolean;
  public songList: ISong[];
  @ViewChild('listComponent') listComp!: ListComponent;
  constructor(private modal: ModalService, private audio : AudioService, private renderer :Renderer2) { 
    this.isDislay = true;
    this.songList = [];

    this.modal.getData().subscribe(el => this.isDislay = el)

    this.audio.getMusicPlaying().subscribe(val => {
      const index = this.listComp.listSong.findIndex(m => m.id === val);
      this.listComp.listHtml.toArray().forEach(e => {
        this.renderer.removeClass(e?.nativeElement, 'active');
      })
      if(this.listComp.listHtml?.toArray()[index]?.nativeElement) {
        this.renderer?.addClass(this.listComp.listHtml?.toArray()[index]?.nativeElement, 'active')
      }
    })
  }

  ngOnInit(): void {
    this.audio.getList().subscribe(list => {
      this.songList = list
    })
  }

  ngAfterViewInit() {


  }

}
