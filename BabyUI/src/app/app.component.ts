import { Component, OnInit, ViewChild } from '@angular/core';
import { Baby } from './baby';
import { CommunicationService } from './communication.service';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'BabyUI';

  constructor(private service:CommunicationService) {
    this.GetInfomations();
   }

   ngOnInit(){
   }

  BabyInformations:any=[];
  AddData(){ 

    var pipi = (document.getElementById('pipi') as HTMLInputElement).checked;
    var caca = (document.getElementById('caca') as HTMLInputElement).checked;
    var milk = (document.getElementById('milk') as HTMLInputElement).checked;

    var milkquantity = (document.getElementById('formControlRange') as HTMLInputElement).value;

    this.service.AddData(pipi, caca, milk, milkquantity).subscribe(res=>{
      this.GetInfomations();
      alert(res.toString());
    });
  }

  GetInfomations(){
    this.service.GetInformations().subscribe(data=>{
      this.BabyInformations=data;

      var i = 0;

      if(this.lineChartData && this.lineChartData?.labels)
      {
        for (let key in this.BabyInformations.ChartData) {
          this.lineChartData.labels[i] = String(key);
          i++;
        }
      }

      i = 0;
      for (let key in this.BabyInformations.ChartData) {
        let value = this.BabyInformations.ChartData[key];
        this.lineChartData.datasets[0].data[i] = value;
        i++;
      }
      this.chart?.update();
    });
  }

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        backgroundColor: 'rgba(0,0,177,0.6)',
        borderColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
    ],
    labels: [ ]
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    plugins: {
      legend: { display: false },
    }
  };

  public lineChartType: ChartType = 'bar';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
}
