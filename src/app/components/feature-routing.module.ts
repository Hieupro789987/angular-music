import { ArtistComponent } from './artist/artist.component';
import { CategoryComponent } from './category/category.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  {path:'', redirectTo:'home',pathMatch: 'full' },
  {path:'home', component:HomeComponent },
  {path:'category', component:CategoryComponent },

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
export class FeatureRoutingModule { }
