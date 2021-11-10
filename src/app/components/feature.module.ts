import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureRoutingModule } from './feature-routing.module';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { CategoryComponent } from './category/category.component';
import { HomeComponent } from './home/home.component';
import { ArtistComponent } from './artist/artist.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    CategoryComponent,
    HomeComponent,
    ArtistComponent
  ],
  imports: [
    CommonModule,
    FeatureRoutingModule,
    SharedModule,

  ],
  exports:[
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    CategoryComponent,
    HomeComponent
  ],
})
export class FeatureModule { }
