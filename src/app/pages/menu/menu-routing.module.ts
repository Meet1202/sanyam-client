import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/services/route-guard-service/auth.guard';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then( m => m.DashboardPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'addphotos',
        loadChildren: () => import('../addphotos/addphotos.module').then( m => m.AddphotosPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'totalmoney',
        loadChildren: () => import('../totalmoney/totalmoney.module').then( m => m.TotalmoneyPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'feedback',
        loadChildren: () => import('../feedback/feedback.module').then( m => m.FeedbackPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'notification',
        loadChildren: () => import('../notification/notification.module').then( m => m.NotificationPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'profileuser/:id',
        loadChildren: () => import('../profileuser/profileuser.module').then( m => m.ProfileuserPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'help',
        loadChildren: () => import('../help/help.module').then( m => m.HelpPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'function-expensence',
        loadChildren: () => import('../function-expensence/function-expensence.module').then( m => m.FunctionExpensencePageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'expense-detail/:id',
        loadChildren: () => import('../expense-detail/expense-detail.module').then( m => m.ExpenseDetailPageModule)
      },
      {
        path: 'media-detail',
        loadChildren: () => import('../media-detail/media-detail.module').then( m => m.MediaDetailPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/menu/dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
