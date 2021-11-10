import { IType, ICategory } from './../../../models/Category';
import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, QueryList, Renderer2, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() flexValue: string = '';
  @Input() list: any;
  @Input() cate?: ICategory;


  @ViewChild('album', { static: true }) album?: ElementRef<HTMLDivElement>
  public count: number = 0;
  public total: number = 0;
  public totalClick: number = 0;
  public isCheckPrev: boolean = true;
  public isCheckNext: boolean = false;
  public clicked: number = 0;
  constructor(private render: Renderer2) {
    
  }



  ngOnInit(): void {

    
  }

  ngOnChanges() {
    if(this.list?.length > 0) {
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
    if(this.clicked === this.totalClick - 1) {
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
    if(this.clicked === 0) {
      this.isCheckPrev = true;
    }
  }

}
