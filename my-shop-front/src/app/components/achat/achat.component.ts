import { initFlowbite } from 'flowbite';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Iacheteur, Iproduit } from '../../interfaces/interface';
import { ProduitService } from '../../services/produit.service';
import { NgClass, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { PanierComponent } from "../panier/panier.component";
import { PanierService } from '../../services/panier.service';
import { AcheteurService } from '../../services/acheteur.service';
import { AchatService } from '../../services/achat.service';
import { QRCodeModule } from 'angularx-qrcode';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { randFloat } from 'three/src/math/MathUtils';

@Component({
  selector: 'app-achat',
  standalone: true,
  templateUrl: './achat.component.html',
  styleUrl: './achat.component.scss',
  imports: [UpperCasePipe, PanierComponent, NgClass, TitleCasePipe,QRCodeModule]
})
export class AchatComponent implements OnInit, AfterViewInit {

  constructor(
    private produitService: ProduitService,
    private panierService: PanierService,
    private clientService: AcheteurService,
    private achatService : AchatService
    ) { }

  ngAfterViewInit(): void {
    initFlowbite()
  }

  ngOnInit(): void {
    this.getAllProduit()
    this.getClient()
    this.getListFacture()
    this.currentDate = new Date().toLocaleDateString();
    this.qr=(randFloat(1,20)).toFixed(2)
  }

  public listProduit: Iproduit[]

  public getAllProduit() {
    this.produitService.getAllProduit().subscribe(
      {
        next: (res) => {
          this.listProduit = res
        },
        error: (err) => {
          console.log(err)
        }
      }
    )
  }

  public listClient: Iacheteur[]

  public getClient() {
    this.clientService.getAcheteur().subscribe(
      {
        next: (res) => {
          this.listClient = res
          this.clientActif = this.listClient[0]
        },
        error: err => {
          console.log(err)
        }
      }
    )
  }

  @ViewChild('client') client: ElementRef<HTMLSelectElement>

  getStarColor(note: number, starIndex: number): string {
    return starIndex < note ? 'text-yellow-300' : 'text-gray-200 dark:text-gray-600';
  }

  addToCart(prod: Iproduit) {
    this.panierService.ajoutPanier(prod)
  }

  deletePanier() {
    this.panierService.viderProd()
  }

  public test :Iproduit[]

  public succes : boolean

  public faireAchat(){
    let cli = this.client.nativeElement as HTMLSelectElement
    this.panierService.panier$.subscribe({
      next:res=>{
        res.forEach(item=>{
          let data = {
            idAcheteur:cli.value,
            idProduit:item.id,
            qteCommande:item.qteCommande,
            prixTotal : item.prixTotal
          }

          this.achatService.doAchat(data).subscribe(
            {
              next : res =>{
                if(res==false){
                  alert('tsy ampy')
                }else{
                  alert('ok')
                }
              }
            }
          )
        })
        this.generateFacture()
      }
    })
  }

  public qr : string = ''
  public listFacture : Iproduit[]=[]
  public clientActif?: Iacheteur
  public currentDate : string
  public total? : number

  getListFacture() {
    this.panierService.panier$.subscribe({
      next: res => {
        console.log('Received data:', res);
        this.listFacture = res;

        this.listFacture.forEach(item => {
          if (typeof item.prixTotal !== 'number' || isNaN(item.prixTotal)) {
            item.prixTotal = item.prix * item.qteCommande;
          }
        });

        let t = this.listFacture.map(item => item.prixTotal);
        this.total = t.reduce((acc, curr) => acc + curr, 0);
      },
      error: err => {
        console.error('Error retrieving panier:', err);
      }
    });
  }


  getClientActif(event : Event){
    const selectElement = event.target as HTMLSelectElement;
    const selectedClientId = selectElement.value;
    this.clientActif= this.listClient.find(client => client.id === selectedClientId);
  }



  public generateFacture() {
    const element = document.getElementById('facture') as HTMLElement;

    html2canvas(element).then((canvas) => {
      // Dimensions de l'image
      const imgWidth = 208;
      const imgHeight = canvas.height * imgWidth / canvas.width;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF

      pdf.addImage(contentDataURL, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('facture.pdf'); // Téléchargez le PDF
    });
  }



}
