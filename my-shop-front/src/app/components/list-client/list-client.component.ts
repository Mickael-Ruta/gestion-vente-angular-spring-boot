import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Iacheteur } from '../../interfaces/interface';
import { AcheteurService } from '../../services/acheteur.service';
import { RouterLink } from '@angular/router';
import { DatePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-list-client',
  standalone: true,
  imports: [RouterLink,DatePipe,TitleCasePipe,UpperCasePipe],
  templateUrl: './list-client.component.html',
  styleUrl: './list-client.component.scss'
})
export class ListClientComponent implements OnInit,AfterViewInit{

  constructor(private acheteurService:AcheteurService){}

  ngAfterViewInit(): void {
    setTimeout(() => {
      initFlowbite();
    }, 1000);
  }

  ngOnInit(): void {
    this.getAcheteur()
  }

  public listAcheteur: Iacheteur[]

  public getAcheteur(){
    this.acheteurService.getAcheteur().subscribe(
      {
        next:(res:Iacheteur[])=>{
          this.listAcheteur=res
          console.log(typeof this.listAcheteur)
        },
        error:(err)=>{
          console.log(err)
        }
      }
    )
  }

  public selectedAcheteur:Iacheteur

  // selectionne un acheteur
  public selectedClient(item:Iacheteur){
    this.selectedAcheteur=item
    console.log(this.selectedAcheteur)
  }

  // supprimme un acheteur
  public deleteAcheteur(){
    let id = this.selectedAcheteur.id
    this.acheteurService.deleteById(id).subscribe(
      {
        next:(res:boolean)=>{
          alert('suppression reussi')
          this.getAcheteur()
        },
        error:(err)=>{
          alert('il y un erreur')
        }
      }
    )
  }
}
