import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FanClub } from '../interfaces/fanclub';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FanclubService {
  private http = inject(HttpClient);
  private myAppUrl: string;
  private myApiUrl: string;

  constructor() {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/fan-club/';
  }

  getListFanClubs(): Observable<FanClub[]> {
    return this.http.get<FanClub[]>(this.myAppUrl + this.myApiUrl);
  }
}
