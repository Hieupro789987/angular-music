import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ListComponent } from './components/list/list.component';
import { SharedRoutingModule } from './shared-routing.module';
import { TabComponent } from './components/tab/tab.component';



@NgModule({
  declarations: [
    CarouselComponent,
    ListComponent,
    TabComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [
    CarouselComponent,
    ListComponent,
    TabComponent
  ]
})
export class SharedModule { }
