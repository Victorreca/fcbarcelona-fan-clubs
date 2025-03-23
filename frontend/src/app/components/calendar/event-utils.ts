import { EventInput } from '@fullcalendar/core';

let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, '');

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: TODAY_STR,
  },
  {
    id: createEventId(),
    title: 'Primero evento',
    start: TODAY_STR + 'T00:00:00',
    end: TODAY_STR + 'T03:00:00',
  },
  {
    id: createEventId(),
    title: 'Segundo evento lalala',
    start: TODAY_STR + 'T15:00:00',
    end: TODAY_STR + 'T16:00:00',
  },
  {
    id: createEventId(),
    title: 'Reunión de prueba1',
    start: '2025-03-16T09:00:00',
    end: '2025-03-16T11:00:00',
  },
  {
    id: createEventId(),
    title: 'Reunión de prueba2',
    start: '2025-03-16T23:00:00',
    end: '2025-03-16T11:00:00',
  },
  {
    id: createEventId(),
    title: 'Reunión de prueba3 fghhghg',
    start: '2025-03-17T09:00:00',
    end: '2025-03-17T11:00:00',
  },
  {
    id: createEventId(),
    title: 'Evento para todo el día',
    start: '2025-03-17',
  },
];

export function createEventId() {
  return String(eventGuid++);
}
