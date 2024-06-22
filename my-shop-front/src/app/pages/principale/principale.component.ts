import { Component, OnInit } from '@angular/core';
import { ListProduitComponent } from '../../components/list-produit/list-produit.component';
import { initFlowbite } from 'flowbite';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-principale',
  standalone: true,
  templateUrl: './principale.component.html',
  styleUrl: './principale.component.scss',
  imports: [ListProduitComponent,RouterOutlet,RouterLink],
})
export class PrincipaleComponent implements OnInit {

  ngOnInit(): void {
    initFlowbite();
  }

  public navigationList=[
    {
      title: 'Dashboard',
      routerLink:'dashboard',
      icon:'bx bx-bar-chart'
    },
    {
      title: 'Produits',
      routerLink:'produit-list',
      icon:'bx bx-barcode'
    },
    {
      title: 'Clients',
      routerLink:'client-list',
      icon:'bx bx-user'
    },
    {
      title: 'Achat',
      routerLink:'achat',
      icon:'bx bx-cart'
    },
  ]
}
