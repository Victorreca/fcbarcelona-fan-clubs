import { Component, inject, OnInit } from '@angular/core';
import { FanClub } from '../../interfaces/fanclub';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FanclubService } from '../../services/fanclub.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { ToastrService } from 'ngx-toastr';

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
  private toastr = inject(ToastrService);

  ngOnInit() {
    this.getListFanClubs();
  }

  getListFanClubs() {
    this.loading = true;
    this.fanClubService.getListFanClubs().subscribe((data: FanClub[]) => {
      this.listFanclubs = data;
      this.loading = false;
    });
  }

  deleteFanClub(id: number) {
    this.loading = true;
    this.fanClubService.deleteFanClub(id).subscribe(() => {
      this.getListFanClubs();
    });
    this.toastr.warning('Peña eliminada con éxito', 'Peña eliminada');
  }

  downloadFanClubs() {
    this.fanClubService.downloadFanClubs().subscribe((blob) => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = 'fanclubs.csv';
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
  }
}
