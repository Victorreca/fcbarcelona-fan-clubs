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
      events: [
        {
          id: 1,
          name: 'Encuentro de socios',
          date: '2024-06-15',
          location: 'Camp Nou',
        },
      ],
    },
    {
      id: 2,
      name: 'FC Barcelona Fan Club La Llagosta',
      location: 'La Llagosta',
      latitude: 41.3851,
      longitude: 2.1734,
      foundedYear: 1956,
      membersCount: 45,
      events: [
        {
          id: 1,
          name: 'Partido Champios',
          date: '2025-03-12',
          location: 'Peña Blaugrana La Llagosta',
        },
      ],
    },
    {
      id: 3,
      name: 'FC Barcelona Fan Club Mollet',
      location: 'Mollet',
      latitude: 41.3851,
      longitude: 2.1734,
      foundedYear: 1956,
      membersCount: 115,
      events: [],
    },
  ];
}
