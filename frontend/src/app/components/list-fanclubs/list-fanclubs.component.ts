import { Component, inject, OnInit } from '@angular/core';
import { FanClub } from '../../interfaces/fanclub';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FanclubService } from '../../services/fanclub.service';

@Component({
  selector: 'app-list-fanclubs',
  imports: [CommonModule, RouterLink],
  templateUrl: './list-fanclubs.component.html',
  styleUrl: './list-fanclubs.component.scss',
})
export class ListFanclubsComponent implements OnInit {
  listFanclubs: FanClub[] = [];

  private fanClubService = inject(FanclubService);

  ngOnInit() {
    this.getListFanClubs();
  }

  getListFanClubs() {
    this.fanClubService.getListFanClubs().subscribe((data) => {
      this.listFanclubs = data;
    });
  }
}
