import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { RouterModule } from '@angular/router';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { Sidebar2Component } from './components/sidebar2/sidebar2.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';

@NgModule({
  declarations: [
    HomePageComponent,
    AboutPageComponent,
    ContactPageComponent,
    Sidebar2Component,
    SearchBoxComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    HomePageComponent,
    AboutPageComponent,
    ContactPageComponent,
    Sidebar2Component,
    SearchBoxComponent,
  ],
})
export class SharedModule {}
