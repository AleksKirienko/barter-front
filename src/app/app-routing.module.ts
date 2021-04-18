import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './modules/auth/pages/auth/auth.component';

const routes: Routes = [
  {path: '', component: AuthComponent},
  // {path: 'rules', component: RegulationsComponent},
  // {path: 'game', component: GameComponent},
  // {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
