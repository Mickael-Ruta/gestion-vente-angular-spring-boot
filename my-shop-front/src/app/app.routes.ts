import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PrincipaleComponent } from './pages/principale/principale.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListProduitComponent } from './components/list-produit/list-produit.component';
import { DetailProduitComponent } from './components/detail-produit/detail-produit.component';
import { ListClientComponent } from './components/list-client/list-client.component';
import { DetailClientComponent } from './components/detail-client/detail-client.component';
import { AjoutClientComponent } from './components/ajout-client/ajout-client.component';
import { AchatComponent } from './components/achat/achat.component';
import { AjoutProduitComponent } from './components/ajout-produit/ajout-produit.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'Identification' },
  {
    path: 'principale',
    component: PrincipaleComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, title: 'Dashboard' },
      {
        path: 'produit-list',
        component: ListProduitComponent,
        title: 'Produit',
      },
      {
        path: 'ajout-produit',
        component: AjoutProduitComponent,
        title: 'Ajout produit',
      },
      {
        path: 'modifie/produit/:id',
        component: AjoutProduitComponent,
        title: 'Ajout produit',
      },
      {
        path: 'produit-detail/:id',
        component: DetailProduitComponent,
        title: 'Produit',
      },
      { path: 'client-list', component: ListClientComponent, title: 'Client' },
      {
        path: 'client-detail/:id',
        component: DetailClientComponent,
        title: 'Client',
      },
      {
        path:'ajout-client',
        component:AjoutClientComponent,
        title:'Ajout Client'
      },
      {
        path:'modifie/client/:id',
        component:AjoutClientComponent,
        title:'Ajout Client'
      },
      {
        path:'achat',
        component:AchatComponent,
        title:'Achat'
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: 'pricipale', pathMatch: 'full' },
  { path: '**', redirectTo: 'principale', pathMatch: 'full' },
];
