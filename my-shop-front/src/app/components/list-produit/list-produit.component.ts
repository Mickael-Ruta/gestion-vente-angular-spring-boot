import { AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { initFlowbite, initModals } from 'flowbite';
import { Iproduit } from '../../interfaces/interface';
import { ProduitService } from '../../services/produit.service';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-produit',
  standalone: true,
  imports: [RouterLink,UpperCasePipe,TitleCasePipe,FormsModule],
  templateUrl: './list-produit.component.html',
  styleUrl: './list-produit.component.scss'
})

export class ListProduitComponent implements OnInit,AfterViewInit{

  constructor(private produitService : ProduitService){}

  ngAfterViewInit(): void {
    setTimeout(() => {
      initFlowbite();
    }, 100);
  }

  ngOnInit(): void {
    this.getProduit()


  }

  public listProduit:Iproduit[]

  public getProduit (){
    this.produitService.getAllProduit().subscribe(
      {
        next:(res:Iproduit[])=>{
          this.listProduit=res
          this.filtredProd=res
          console.log(res)

        },
        error:(err)=>{
          console.log(err)
        }
      }
    )
  }


  public selectedProduit : Iproduit

  public selectProduit(prod : Iproduit){
    this.selectedProduit=prod
  }

  public deleteProduit(){
    let id = this.selectedProduit.id

    if(id){
      this.produitService.deleteById(id).subscribe(
        {
          next:(res)=> {
              alert('Suppression reussi')
          },
          error : (err)=>{
            alert('il y a un erreur')
            console.log(err)
          }
        }
      )
    }
  }

  private _produitFilter = ""
  public filtredProd : Iproduit[]=[]

  public get produitFilter(){
    return this._produitFilter
  }

  public set produitFilter(filtre:string){
    this._produitFilter=filtre
    this.filtredProd = this.produitFilter ? this.filtre(this.produitFilter) : this.listProduit

  }


  public filtre(critere : string){
    let cri = critere.toLowerCase()

    let res = this.listProduit.filter((prod)=>prod.nom.toLowerCase().indexOf(cri)!=-1)
    return res
  }
}
