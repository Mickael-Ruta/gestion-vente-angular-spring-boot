import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProduitService } from '../../services/produit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Iproduit } from '../../interfaces/interface';
import { AjoutClientComponent } from "../ajout-client/ajout-client.component";
import { positiveNumberValidator } from '../../validators/validators';

@Component({
    selector: 'app-ajout-produit',
    standalone: true,
    templateUrl: './ajout-produit.component.html',
    styleUrl: './ajout-produit.component.scss',
    imports: [ReactiveFormsModule, AjoutClientComponent]
})
export class AjoutProduitComponent implements OnInit{

  constructor(private fb:FormBuilder,private produitService : ProduitService,private route : ActivatedRoute,private router:Router){}

  @ViewChild('img') img:ElementRef

  public produitForm : FormGroup

  public isUpdate : boolean = false

  ngOnInit(): void {
    this.controlForm()
    this.getProduitById()
  }

  private controlForm(){
    this.produitForm=this.fb.group({
      nom:['',[Validators.required,Validators.pattern(/^[a-zA-Z\s]+$/)]],
      category:['boisson',[Validators.required,Validators.pattern(/^[a-zA-Z]+$/)]],
      nbreStock:[1,[Validators.required,Validators.pattern(/^[0-9]+$/),positiveNumberValidator]],
      note:[1,[Validators.required,Validators.pattern(/^[0-9]+$/),positiveNumberValidator]],
      prix:[0,[Validators.required,Validators.pattern(/^[0-9]+$/),positiveNumberValidator]]
    })
  }

  private selectedImg : File

  public getImg(event : any){
    this.selectedImg=event.target?.files[0] as File
    console.log(this.selectedImg)
  }

  public addProduit(){
    if(this.produitForm.valid){
      let reader = new FileReader()
      reader.readAsArrayBuffer(this.selectedImg)
      reader.onload=()=>{
        let imgBin = reader.result as ArrayBuffer
        let imgByteArray = new Uint8Array(imgBin);

        const data  = {
          ...this.produitForm.value,
          imgUrl : Array.from(imgByteArray),
          nbreVendu:0
        }
        console.log('data',data)
        this.produitService.insertProduit(data).subscribe(
          {
            next: (res)=>{
              alert('ajout avec succés')
              this.router.navigate(['/principale/produit-list'])
            },
            error:(err)=>{
              console.log(err)
            }
          }
        )
      }

    }else{
      alert('Veuillez verifier les informations')
    }
  }

  public selectedProduit : Iproduit

  public getProduitById(){
    let id = this.route.snapshot.paramMap.get('id')
    if(id){
      this.produitService.getProduitById(id).subscribe(
        {
          next : (res)=>{
            if(res==null){
              console.log("aucun etudiant correspondant a votre recherche")
            }else{
              this.selectedProduit=res
              this.updateProduit(this.selectedProduit)
            }
          }
        }
      )
    }
  }

  public updateProduit(produit : Iproduit){
    this.isUpdate=true
    if(produit){
      this.produitForm.patchValue(produit)
    }
  }
}
