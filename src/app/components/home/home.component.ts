import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '../../services';
import { City } from '../../models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  cities: City[] = [];

  constructor(private dataService: DataService) {
    this.cities = this.dataService.cities;
  }
}
