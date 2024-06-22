import { Component, OnInit } from '@angular/core';
import { Iproduit } from '../../interfaces/interface';
import { PanierService } from '../../services/panier.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.scss'
})
export class PanierComponent implements OnInit{

  constructor(private panierService:PanierService){}

  ngOnInit(): void {
    this.getListAchat()
  }

  listAchat: Iproduit[]=[]

  getListAchat(){
    this.panierService.panier$.subscribe(
      {
        next : (res)=>{
          this.listAchat=res
        }
      }
    )
  }

  deleteProd(prod : Iproduit){
    this.panierService.supprimerDuPanier(prod)
    this.getListAchat()
  }

  public updatePrix(prod : Iproduit){
    let input = document.getElementById(prod.id) as HTMLInputElement
    let p = prod.prix
    prod.prixTotal=p*parseInt(input.value)
    prod.qteCommande=+input.value

  }

}
