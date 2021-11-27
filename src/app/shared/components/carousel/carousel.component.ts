
import { Router } from '@angular/router';
import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, Output, QueryList, Renderer2, SimpleChanges, ViewChild, ViewChildren, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() flexValue: any;
  @Input() list: any;
  @Input() shape: any;
  @Input() type: any;
  @Input() title: any;
  public count: number = 0;
  public total: number = 0;
  public totalClick: number = 0;
  public isCheckPrev: boolean = true;
  public isCheckNext: boolean = false;
  public clicked: number = 0;
  @ViewChild('album', { static: true }) album?: ElementRef<HTMLDivElement>;
  
  constructor(private render: Renderer2, private route: Router) {}
  ngOnInit(): void { 
    console.log(this.isCheckNext);
    
  }

  ngOnChanges() {
    if (this.list?.items) {
      this.title = this.list.title
      this.list = this.list!.items;
    }
    else {
      this.title = this.type
      this.list = this.list;
    }
    if (this.list?.length > 0) {
      this.totalClick = Math.ceil(Number(this.list.length) / this.total);
    }
  }

  ngAfterViewInit() {
    this.total = Math.floor(100 / Number(this.flexValue.substring(0, this.flexValue.length - 1)));

  }

  public onNext(): void {

    if (this.clicked < this.totalClick - 1) {
      this.clicked++;
      this.count += 100;
      this.render.setStyle(this.album?.nativeElement, 'left', `-${this.count}%`)

      this.isCheckPrev = false;
    }
    if (this.clicked === this.totalClick - 1) {
      this.isCheckNext = true;
    }
  }

  public onPrev(): void {
    if (this.clicked > 0) {
      this.clicked--;
      this.count -= 100;
      this.isCheckNext = false;
      this.render.setStyle(this.album?.nativeElement, 'left', `-${this.count}%`)
    }
    if (this.clicked === 0) {
      this.isCheckPrev = true;
    }
  }

  onChooseAlbum(data: any) {
    if (data.artistID) {
      this.route.navigate(['song', data.id, data.artistID])
    }
    else {
      this.route.navigate(['album', data.id])
    }

  }
}
