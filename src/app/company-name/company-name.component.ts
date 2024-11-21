import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-company-name',
  standalone: true, // Hace que el componente sea autónomo
  templateUrl: './company-name.component.html',
  styleUrls: ['./company-name.component.scss'],
})
export class CompanyNameComponent    {

  @Input() companyName: string = 'Mi Empresa'; // Valor predeterminado

}
