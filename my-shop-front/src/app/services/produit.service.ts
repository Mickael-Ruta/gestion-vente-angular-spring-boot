import { Iproduit } from './../interfaces/interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { map, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private http:HttpClient) { }

  private readonly URL = environment.apiUrl

  public getAllProduit():Observable<Iproduit[]>{
    return this.http.get<Iproduit[]>(`${this.URL}/produit/all`).pipe(
      map((produits: Iproduit[]) => {
        return produits.map(produit => ({
          ...produit,
          imgUrl: this.base64ToImageUrl(produit.imgUrl)
        }));
      })

    )
  }

  public getProduitById(id:String):Observable<Iproduit>{
    return this.http.get<Iproduit>(`${this.URL}/produit/one/${id}`)
  }

  public deleteById(id:String):Observable<boolean>{
    return this.http.delete<boolean>(`${this.URL}/produit/delete/${id}`)
  }

  public updateById(id:String, body:Iproduit):Observable<Iproduit>{
    return this.http.put<Iproduit>(`${this.URL}/produit/update/${id}`,body)
  }

  public insertProduit(produit:Iproduit):Observable<Iproduit>{
    return this.http.post<Iproduit>(`${this.URL}/produit/create`,produit)
  }

  private base64ToImageUrl(base64String: string): string {
    return 'data:image/jpeg;base64,' + base64String;
  }

  public countProduitByCategory(category : string):Observable<number>{
    return this.http.get<number>(`${this.URL}/produit/countByCategory/${category}`)
  }

  public top3Product(): Observable<Iproduit[]> {
    return this.http.get<Iproduit[]>(`${this.URL}/produit/top3vendu`).pipe(
      map((produits: Iproduit[]) => {
        return produits.map(produit => ({
          ...produit,
          imgUrl: this.base64ToImageUrl(produit.imgUrl)
        }));
      })

    )
  }

  public getTotalStock():Observable<number>{
    return this.http.get<number>(`${this.URL}/produit/totalStock`)
  }

  public getTotalVendu():Observable<number>{
    return this.http.get<number>(`${this.URL}/produit/nbreVendu`)
  }
}

