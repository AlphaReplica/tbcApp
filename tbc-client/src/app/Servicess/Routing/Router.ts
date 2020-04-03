import { Routes } from "@angular/router";
import { ClientViewComponent } from 'src/app/View/Views/client-view/client-view.component';
import { ClientsListComponent } from 'src/app/View/Views/clients-list/clients-list.component';
import { ClientResolver, ClientListResolver } from '../Routing/Resolvers';
import { CanNavigate } from './Guards';

export const AppRoutes: Routes = 
[
    { path: 'clientsList/:page', component: ClientsListComponent , resolve: { clients: ClientListResolver }, canActivate: [CanNavigate]},
    { path: 'client/:view/:id' , component: ClientViewComponent  , resolve: { client : ClientResolver     }, canActivate: [CanNavigate]},
    { path: '',
      redirectTo: '/clientsList/1',
      pathMatch: 'full'
    }
];