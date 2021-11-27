import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { LoginComponent } from './login/login.component';
import { ShowTypeComponent } from './show-type/show-type.component';
import { ShowArtistComponent } from './show-artist/show-artist.component';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { ModalCreatePlayListComponent } from './modal-create-play-list/modal-create-play-list.component';
import { PlayListComponent } from './play-list/play-list.component';
import { SearchComponent } from './search/search.component';
import { RankComponent } from './rank/rank.component';
import { PlayerQueueComponent } from './player-queue/player-queue.component';
import { MySongComponent } from './my-song/my-song.component';
import { MyAllComponent } from './my-all/my-all.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    CategoryComponent,
    HomeComponent,
    ArtistComponent,
    LoginComponent,
    ShowTypeComponent,
    ShowArtistComponent,
    ProfileComponent,
    ModalCreatePlayListComponent,
    PlayListComponent,
    SearchComponent,
    RankComponent,
    PlayerQueueComponent,
    MySongComponent,
    MyAllComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    FeatureRoutingModule,
    SharedModule,


  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    CategoryComponent,
    HomeComponent,
    LoginComponent,
    ShowTypeComponent,
    ShowArtistComponent,
    ModalCreatePlayListComponent,
    SearchComponent,
    PlayerQueueComponent
  ],
  providers: [],
})
export class FeatureModule { }
