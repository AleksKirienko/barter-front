import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './modules/auth/pages/auth/auth.component';
import { RegistrationComponent } from './modules/auth/pages/registration/registration.component';
import { NotFoundComponent } from './modules/home/pages/not-found/not-found.component';
import { FavoritesComponent } from './modules/home/pages/favorites/favorites.component';
import { MenuComponent } from './modules/home/components/menu/menu.component';
import { HomeComponent } from './modules/home/pages/home/home.component';
import { PersonalRoomComponent } from './modules/home/pages/personal-room/personal-room.component';
import { AddProductComponent } from './modules/home/pages/add-product/add-product.component';
import { TradeComponent } from './modules/home/pages/trade/trade.component';
import { ProductInformationComponent } from './modules/home/pages/product-information/product-information.component';
import { AuthGuard } from './core/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: AuthComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: MenuComponent,
    children: [
      {
        path: 'home',
        canActivate: [AuthGuard],
        component: HomeComponent
      },
      {
        path: 'home/favorites',
        canActivate: [AuthGuard],
        component: FavoritesComponent
      },
      {
        path: 'home/personal-room',
        canActivate: [AuthGuard],
        component: PersonalRoomComponent
      },
      {
        path: 'home/add-product',
        canActivate: [AuthGuard],
        component: AddProductComponent
      },
      {
        path: 'home/trade',
        canActivate: [AuthGuard],
        component: TradeComponent
      },
      {
        path: 'home/product-information/:product',
        canActivate: [AuthGuard],
        component: ProductInformationComponent
      }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
