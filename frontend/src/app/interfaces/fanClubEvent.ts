import { FanClub } from './fanclub';

export interface FanClubEvent {
  id?: number;
  fanclub_id: number;
  name: string;
  date: string;
  time: string;
  location: string;
  fanclub?: FanClub;
}
