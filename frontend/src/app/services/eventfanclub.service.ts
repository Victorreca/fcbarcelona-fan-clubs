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
  // addEvent(event: FanClubEvent): Observable<void> {
  //   return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, event);
  // }

  // deleteEvent(eventId: string): Observable<void> {
  //   return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${eventId}`);
  // }
}
