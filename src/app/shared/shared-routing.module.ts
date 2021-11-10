import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ArtistComponent } from '../components/artist/artist.component';


const routes: Routes = [
  {path:'infoArtist/:id', component:ArtistComponent}

];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes) ,
  ],
  exports:[
    RouterModule
  ]
})
export class SharedRoutingModule { }
