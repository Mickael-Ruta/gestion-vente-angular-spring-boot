import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ListProduitComponent } from "./components/list-produit/list-produit.component";
import { ListClientComponent } from "./components/list-client/list-client.component";
import { DetailClientComponent } from "./components/detail-client/detail-client.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, ListProduitComponent, ListClientComponent, DetailClientComponent]
})
export class AppComponent {
  title = 'my-shop-front';
}
