import { Iacheteur } from './../../interfaces/interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AcheteurService } from '../../services/acheteur.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ACESFilmicToneMapping } from 'three';

@Component({
  selector: 'app-ajout-client',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './ajout-client.component.html',
  styleUrl: './ajout-client.component.scss',
})
export class AjoutClientComponent implements OnInit {
  constructor(
    private acheteurService: AcheteurService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.controlForm();
    this.getClientToUpdate()
  }

  public isUpdate: boolean = false;
  public clientForm: FormGroup;


  public addClient() {
    if (this.clientForm.valid) {
      let data = this.clientForm.value

      this.acheteurService.addAcheteur(data).subscribe(
        {
          next: (res) => {
            alert(`Le client ${res.nom} ${res.prenoms} est ajouté avec succés`)
            this.router.navigate(['principale/client-list'])
          },
          error: (err) => {
            alert('Il y a une erreur')
          }
        }
      )
    }
  }

  private displayedClient: Iacheteur
  public getClientToUpdate() {
    let id = this.route.snapshot.paramMap.get('id')
    if (id) {
      this.acheteurService.getAcheteurById(id).subscribe(
        {
          next: (res) => {
            this.displayedClient = res
            this.updateForm(this.displayedClient)
          }
        }
      )
    }
  }

  public updateForm(acheteur: Iacheteur) {
    this.isUpdate = true;
    this.clientForm.patchValue(acheteur);
  }

  public updateClient(){
    let id = this.route.snapshot.paramMap.get('id')
    let data = this.clientForm.value
    if(id){
      this.acheteurService.updateById(id,data).subscribe(
        {
          next:(res)=>{
            alert(`Le client ${res.nom} ${res.prenoms} est modifié avec succés`)
            this.router.navigate(['principale/client-list'])
          },
          error:(err)=>{
            alert('il y un erreur')
          }
        }
      )
    }
  }

  private controlForm() {
    this.clientForm = this.fb.group({
      nom: ['', [Validators.required,Validators.pattern(/^[a-zA-Z\s]+$/)]],
      prenoms: ['', [Validators.pattern(/^[a-zA-Z\s]+$/)]],
      numTel: ['', [Validators.required,Validators.pattern(/^[0-9]+$/)]],
      adresse: ['', [Validators.required, Validators.pattern(/^[A-Za-zä-ÿ]+$/)]],

    });
  }

  private toastOptions = {
    timeOut: 1000,
    positionClass: 'toast-top-right',
  }
}
