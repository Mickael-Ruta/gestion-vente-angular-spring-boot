import { Component, OnInit } from '@angular/core';
import { Chart, ChartOptions, ChartDataset } from 'chart.js/auto';
import { initFlowbite } from 'flowbite';
import { ProduitService } from '../../services/produit.service';
import { forkJoin, take } from 'rxjs';
import { IachatTotal, Iproduit } from '../../interfaces/interface';
import { NgClass, UpperCasePipe } from '@angular/common';
import { AchatService } from '../../services/achat.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [UpperCasePipe,NgClass],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  constructor(private produitService : ProduitService ,private achatService : AchatService){}

  ngOnInit(): void {
    initFlowbite()
    this.countByCategory()
    this.getTop3()
    this.getTotalStock()
    this.getTotalVendu()
    this.getRevenu()
    this.date = new Date().toLocaleDateString();
    this.getEvolutionAchat()
  }

  ngAfterViewInit(): void {

  }


  public countByCategory(){
    forkJoin([
      this.produitService.countProduitByCategory('boisson'),
      this.produitService.countProduitByCategory('fruit'),
      this.produitService.countProduitByCategory('confisserie'),
      this.produitService.countProduitByCategory('domestique'),
      this.produitService.countProduitByCategory('drogue')
    ]).subscribe(
      {
        next:([res1,res2,res3,res4,res5])=>{
          let res = [res1,res2,res3,res4,res5]
          this.max=Math.max(...res)+1
          this.createBarChart([res1,res2,res3,res4,res5],this.max)
        },
        error : err=>{
          console.log(err);
        }
      }
    )
  }

  public top3Produit : Iproduit[]

  public getTop3(){
    this.produitService.top3Product().pipe(take(3)).subscribe(
      {
        next:(res)=>{
          this.top3Produit=res
          console.log(this.top3Produit)
        }
      }
    )
  }

  public totalStock:number
  public totalVendu : number

  public getTotalStock(){
    this.produitService.getTotalStock().subscribe(
      {
        next : res =>{
          this.totalStock=res
        },
        error : err=>{
          console.log(err);
        }
      }
    )
  }

  public date : string
  public revenuDays : number
  public getRevenu(){
    this.achatService.getRevenu().subscribe(
      {
        next : res =>{
          this.revenuDays=res.total
        },
        error : err =>{
          console.log(err);
        }
      }
    )
  }

  public getTotalVendu(){
    this.produitService.getTotalVendu().subscribe(
      {
        next : res =>{
          this.totalVendu=res
        },
        error : err=>{
          console.log(err);
        }
      }
    )
  }

  public getStarColor(note: number, starIndex: number): string {
    return starIndex < note ? 'text-yellow-300' : 'text-gray-200 dark:text-gray-600';
  }

  private max : number
  private createBarChart(param : number[],ymax : number): void {
    const barCanvas = document.getElementById('barChart') as HTMLCanvasElement;
    const ctx = barCanvas.getContext('2d');

    const data: ChartDataset[] = [{
      label: 'Produits',
      data: param,
      backgroundColor: 'rgba(23, 37, 84)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(30 ,66, 159)',
      barPercentage:0.8,
      borderRadius:5
    }];

    const options: ChartOptions = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max:ymax
        }
      }
    };

    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Boisson', 'Fruit', 'Confisserie', 'Domestique', 'Drogue'],
          datasets: data
        },
        options: options
      });
    }
  }


  public getEvolutionAchat(){
    this.achatService.getEvolutionAchat().pipe(
      take(5)
    ).subscribe({
      next : res=>{
        let donne = res.map(item=>item.total)
        let date = res.map(item=>item.date)
        this.createLineChart(donne, date);
      },
      error : err =>{
        console.log(err)
      }
    })
  }

  private createLineChart(donne : number[],date : string[]): void {
    const lineCanvas = document.getElementById('lineChart') as HTMLCanvasElement;
    const ctx = lineCanvas.getContext('2d');

    const data: ChartDataset[] = [{
      label: 'Evolution achat',
      data: donne,
      fill: true,
      backgroundColor: 'rgba(23, 37, 84)',
      tension: 0.3
    }];

    const options: ChartOptions = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      },
      animation: {
        duration: 1500,
        easing: 'easeInOutQuad'
      }
    };

   if(ctx){
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: date,
        datasets: data
      },
      options: options
    });
   }
  }
}
