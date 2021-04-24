import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './modules/auth/pages/auth/auth.component';
import { RegistrationComponent } from './modules/auth/pages/registration/registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NotFoundComponent } from './modules/home/pages/not-found/not-found.component';
import { HomeComponent } from './modules/home/pages/home/home.component';
import { DialogSuccessDataComponent } from './modules/auth/pages/registration/dialog-success-data/dialog-success-data.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MenuComponent } from './modules/home/components/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    RegistrationComponent,
    NotFoundComponent,
    HomeComponent,
    DialogSuccessDataComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
