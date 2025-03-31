import {
  Component,
  signal,
  ChangeDetectorRef,
  inject,
  OnInit,
} from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { createEventId } from './event-utils';
import esLocale from '@fullcalendar/core/locales/es';
import { CommonModule } from '@angular/common';
import { EventfanclubService } from '../../services/eventfanclub.service';
import { firstValueFrom } from 'rxjs';
import { ModalStateService } from '../../services/modal-state.service';
import { ModalCalendarComponent } from './modal-calendar/modal-calendar.component';

@Component({
  selector: 'app-calendar',
  imports: [FullCalendarModule, CommonModule, ModalCalendarComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements OnInit {
  private changeDetector = inject(ChangeDetectorRef);
  private eventFanClubService = inject(EventfanclubService);
  private modalStateService = inject(ModalStateService);
  calendarVisible = signal(true);
  isModalOpen = this.modalStateService.isModalOpen;
  selectedEvent = this.modalStateService.selectedEvent;

  calendarOptions = signal<CalendarOptions>({
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'dayGridMonth',
    firstDay: 1,
    titleFormat: { year: 'numeric', month: 'long' },
    dayHeaderContent: (args) => {
      return args.text.charAt(0).toUpperCase() + args.text.slice(1);
    },
    locale: esLocale,
    events: [],
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
  });
  currentEvents = signal<EventApi[]>([]);

  constructor() {}
  async ngOnInit() {
    await this.loadEvents();
  }

  async loadEvents() {
    const fanclubId = 1;

    try {
      const events = await firstValueFrom(
        this.eventFanClubService.getFanClubEvents(fanclubId)
      );

      this.calendarOptions.update((options) => ({
        ...options,
        events: events.map((event) => ({
          id: event.id ? event.id.toString() : createEventId(),
          title: event.name,
          start: `${event.date}T${event.time}`,
          end: `${event.date}T${event.time}`,
          allDay: false,
          extendedProps: {
            fanclub_id: event.fanclub_id,
            date: event.date,
            time: event.time,
            location: event.location || 'Sin ubicación',
          },
        })),
      }));

      this.changeDetector.detectChanges();
    } catch (error) {
      console.error('Error al cargar eventos:', error);
    }
  }

  handleCalendarToggle() {
    this.calendarVisible.update((bool) => !bool);
  }

  handleWeekendsToggle() {
    this.calendarOptions.update((options) => ({
      ...options,
      weekends: !options.weekends,
    }));
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Introduzca un nuevo título para su evento');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    const event = clickInfo.event;
    this.modalStateService.openModal({
      id: Number(event.id),
      fanclub_id: event.extendedProps['fanclub_id'],
      title: event.title,
      date: event.start?.toISOString().split('T')[0] || '',
      time: event.start?.toTimeString().split(' ')[0] || '',
      location: event.extendedProps['location'] || 'Sin ubicación',
    });
    // clickInfo.event.remove();
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges();
  }
}
