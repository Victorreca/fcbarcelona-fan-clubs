import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { FanClubEvent } from '../interfaces/fanClubEvent';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventfanclubService {
  private http = inject(HttpClient);
  private myAppUrl: string;
  private myApiUrl: string;

  constructor() {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/events/';
  }

  getFanClubEvents(fanclub_id: number) {
    return this.http.get<FanClubEvent[]>(
      `${this.myAppUrl}${this.myApiUrl}?fanclub_id=${fanclub_id}`
    );
  }
  addFanClubEvent(fanClubEvent: FanClubEvent): Observable<void> {
    return this.http.post<void>(
      `${this.myAppUrl}${this.myApiUrl}`,
      fanClubEvent
    );
  }
  updateFanClubEvent(id: number, fanClubEvent: FanClubEvent): Observable<void> {
    return this.http.put<void>(
      `${this.myAppUrl}${this.myApiUrl}${id}`,
      fanClubEvent
    );
  }
  deleteEventFanClubEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }
}
