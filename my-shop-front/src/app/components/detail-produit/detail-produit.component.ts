import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../../services/produit.service';
import { ActivatedRoute } from '@angular/router';
import { Iproduit } from '../../interfaces/interface';

@Component({
  selector: 'app-detail-produit',
  standalone: true,
  imports: [],
  templateUrl: './detail-produit.component.html',
  styleUrl: './detail-produit.component.scss',
})
export class DetailProduitComponent implements OnInit {
  constructor(
    private produitService: ProduitService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getProduit()
  }

  public produit : Iproduit
  public empty : String

  public getProduit(){
    let id = this.route.snapshot.paramMap.get('id')
    if(id){
      this.produitService.getProduitById(id).subscribe(
        {
          next:(res:Iproduit)=>{
            if(res){
              this.produit=res
              console.log(this.produit)
            }else{
              this.empty="aucun produit ne corresponde"
              console.log(this.empty)
            }
          },
          error:(err)=>{
            console.log(err)
          }
        }
      )
    }
  }
}
