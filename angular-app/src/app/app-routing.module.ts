import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'demo',
    loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule ),
  },
  {
      path: '',
      redirectTo: '/demo',
      pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
