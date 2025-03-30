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
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-calendar',
  imports: [FullCalendarModule, CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements OnInit {
  private changeDetector = inject(ChangeDetectorRef);
  private eventFanClubService = inject(EventfanclubService);
  private toastr = inject(ToastrService);
  calendarVisible = signal(true);

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
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
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
    const title = prompt('Please enter a new title for your event');
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
    console.log(clickInfo);
    const eventId = Number(clickInfo.event.id);
    if (
      confirm(
        `¿Estás seguro de que quieres eliminar el evento "${clickInfo.event.title}"`
      )
    ) {
      this.eventFanClubService.deleteEventFanClubEvent(eventId).subscribe({
        next: () => {
          clickInfo.event.remove();
          this.toastr.success('Evento eliminado con éxito', 'Evento eliminado');
          this.currentEvents.set(
            this.currentEvents().filter((event) => Number(event.id) !== eventId)
          );
        },
        error: (err) => {
          console.error('Error al eliminar el evento:', err);
          this.toastr.error('No se pudo eliminar el evento', 'Error');
        },
      });
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges();
  }
}
