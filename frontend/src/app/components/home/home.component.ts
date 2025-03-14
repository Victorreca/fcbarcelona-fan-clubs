import { Component } from '@angular/core';
import { ListFanclubsComponent } from '../list-fanclubs/list-fanclubs.component';

@Component({
  selector: 'app-home',
  imports: [ListFanclubsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
