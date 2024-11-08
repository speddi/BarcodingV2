import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { RoleListComponent } from './role-list/role-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { AuthGuard } from '../services/auth-guard';

const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'users', component: UserListComponent, canActivate: [AuthGuard], title: 'Admin | Users' },
      { path: 'roles', component: RoleListComponent, canActivate: [AuthGuard], title: 'Admin | Roles' }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
