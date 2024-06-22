import { Component, OnInit } from '@angular/core';
import { Iacheteur } from '../../interfaces/interface';
import { ProduitService } from '../../services/produit.service';
import { ActivatedRoute } from '@angular/router';
import { AcheteurService } from '../../services/acheteur.service';

@Component({
  selector: 'app-detail-client',
  standalone: true,
  imports: [],
  templateUrl: './detail-client.component.html',
  styleUrl: './detail-client.component.scss'
})
export class DetailClientComponent implements OnInit{

  constructor(
    private acheteurService: AcheteurService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getClient()
  }

  public client : Iacheteur
  public empty : String

  public getClient(){
    let id = this.route.snapshot.paramMap.get('id')
    if(id){
      this.acheteurService.getAcheteurById(id).subscribe(
        {
          next:(res:Iacheteur)=>{
            if(res){
              this.client=res
              console.log("client detail : ",this.client)
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
