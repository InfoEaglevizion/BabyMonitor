import { Component } from '@angular/core';
import { CommunicationService } from './communication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BabyUI';

  constructor(private service:CommunicationService) { }


  AddData(){ 
    var pipi = (document.getElementById('pipi') as HTMLInputElement).checked;
    var caca = (document.getElementById('caca') as HTMLInputElement).checked;
    var milk = (document.getElementById('milk') as HTMLInputElement).checked;
    var milkquantity = (document.getElementById('formControlRange') as HTMLInputElement).value;

    this.service.AddData(pipi, caca, milk, milkquantity).subscribe(res=>{
    alert(res.toString());
    });
  }
}
