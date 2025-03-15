import { Component } from '@angular/core';
import { FanClub } from '../../interfaces/fanclub';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-fanclubs',
  imports: [CommonModule, RouterLink],
  templateUrl: './list-fanclubs.component.html',
  styleUrl: './list-fanclubs.component.scss',
})
export class ListFanclubsComponent {
  listFanclubs: FanClub[] = [
    {
      id: 1,
      name: 'FC Barcelona Fan Club Parets',
      location: 'Parets del Vallès',
      latitude: 41.3851,
      longitude: 2.1734,
      foundedYear: 1899,
      membersCount: 10,
      event: {
        name: 'Encuentro de socios',
        date: '2024-06-15',
        time: '18:00',
        location: 'Camp Nou',
      },
    },
  ];
}
