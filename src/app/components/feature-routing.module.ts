import { MyAllComponent } from './my-all/my-all.component';
import { PlayListComponent } from './play-list/play-list.component';
import { MySongComponent } from './my-song/my-song.component';
import { RankComponent } from './rank/rank.component';
import { AuthGuard } from './../guard/auth.guard';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './profile/profile.component';
import { ShowTypeComponent } from './show-type/show-type.component';
import { ShowArtistComponent } from './show-artist/show-artist.component';
import { ArtistComponent } from './artist/artist.component';
import { CategoryComponent } from './category/category.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'album/:id', component: ShowTypeComponent },
  { path: 'song/:id/:id2', component: ShowTypeComponent },
  { path: 'mylist/:id', component: ShowTypeComponent, canActivate: [AuthGuard] },
  { path: 'artist', component: ShowArtistComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'tongquan', pathMatch: 'full' },
      { path: 'tongquan', component: MyAllComponent },
      { path: 'myplaylist', component: PlayListComponent },
      { path: 'mySong', component: MySongComponent }
    ]
  },
  { path: 'search', component: SearchComponent },
  { path: 'bangxephang', component: RankComponent },

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class FeatureRoutingModule { }
