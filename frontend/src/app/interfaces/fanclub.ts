import { FanClubEvent } from './fanClubEvent';

export interface FanClub {
  id?: number;
  name: string;
  location: string;
  latitude?: number;
  longitude?: number;
  foundedYear: number;
  membersCount: number;
  events: FanClubEvent[];
}
