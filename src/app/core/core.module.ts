import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavbarComponent, HomeComponent, LoginComponent],
  imports: [CommonModule, RouterModule.forChild([])],
  exports: [NavbarComponent],
})
export class CoreModule {}
