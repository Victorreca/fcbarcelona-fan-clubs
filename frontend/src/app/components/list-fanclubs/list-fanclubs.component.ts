import { Component, inject, OnInit } from '@angular/core';
import { FanClub } from '../../interfaces/fanclub';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FanclubService } from '../../services/fanclub.service';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-list-fanclubs',
  imports: [CommonModule, RouterLink, LoaderComponent],
  templateUrl: './list-fanclubs.component.html',
  styleUrl: './list-fanclubs.component.scss',
})
export class ListFanclubsComponent implements OnInit {
  listFanclubs: FanClub[] = [];
  loading: boolean = false;

  private fanClubService = inject(FanclubService);

  ngOnInit() {
    this.getListFanClubs();
  }

  getListFanClubs() {
    this.loading = true;
    this.fanClubService.getListFanClubs().subscribe((data) => {
      this.listFanclubs = data;
      this.loading = false;
    });
  }
}
