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
import { PersonalRoomComponent } from './modules/home/pages/personal-room/personal-room.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';
import { FilterStatusPipe } from './shared/pipes/filter-status.pipe';
import { SidenavComponent } from './modules/home/components/sidenav/sidenav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FavoritesComponent } from './modules/home/pages/favorites/favorites.component';
import { BasketComponent } from './modules/home/pages/basket/basket.component';
import { AddProductComponent } from './modules/home/pages/add-product/add-product.component';
import { MatCardModule } from '@angular/material/card';
import { HomeDialogComponent } from './shared/home-dialog/home-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    RegistrationComponent,
    NotFoundComponent,
    HomeComponent,
    DialogSuccessDataComponent,
    MenuComponent,
    PersonalRoomComponent,
    FilterStatusPipe,
    SidenavComponent,
    FavoritesComponent,
    BasketComponent,
    AddProductComponent,
    HomeDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTooltipModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule
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
