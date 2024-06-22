import { Injectable } from '@angular/core';
import { Iproduit } from '../interfaces/interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  constructor() { }

  private panier: Iproduit[] = []
  private panierSubject: BehaviorSubject<Iproduit[]> = new BehaviorSubject<Iproduit[]>([])

  public panier$ = this.panierSubject.asObservable()

  getPanier(): Observable<Iproduit[]> {
    return this.panierSubject.asObservable()
  }

  ajoutPanier(prod: Iproduit) {
    const existingProd = this.panier.find(p => p.id === prod.id);
    if (!existingProd) {
      prod.qteCommande = 1;  // Initialiser qteCommande à 1
      this.panier.push(prod);
      this.panierSubject.next([...this.panier]);
    }
  }

  viderProd() {
    this.panier = []
    this.panierSubject.next([...this.panier])
  }

  supprimerDuPanier(produit: Iproduit) {
    this.panier = this.panier.filter(p => p !== produit);
    this.panierSubject.next([...this.panier]);
  }


}
