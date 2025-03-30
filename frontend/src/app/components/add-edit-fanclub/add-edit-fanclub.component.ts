import { Component, inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FanClub } from '../../interfaces/fanclub';
import { FanclubService } from '../../services/fanclub.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FanClubEvent } from '../../interfaces/fanClubEvent';
import { EventfanclubService } from '../../services/eventfanclub.service';
@Component({
  selector: 'app-add-edit-fanclub',
  imports: [ReactiveFormsModule, CommonModule, LoaderComponent],
  templateUrl: './add-edit-fanclub.component.html',
  styleUrl: './add-edit-fanclub.component.scss',
})
export class AddEditFanclubComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  errorMessage: string | null = null;
  private fb = inject(FormBuilder);
  private location = inject(Location);
  private fanClubService = inject(FanclubService);
  private eventFanClubService = inject(EventfanclubService);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  private activateRoute = inject(ActivatedRoute);
  loading: boolean = false;
  fanClubId: number | null = null;
  operation: string = '';

  addClubForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    location: ['', [Validators.required, Validators.minLength(2)]],
    foundedYear: [
      '',
      [
        Validators.required,
        Validators.pattern('^[0-9]+$'),
        Validators.min(1800),
        Validators.max(this.currentYear),
      ],
    ],
    membersCount: [
      '',
      [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(1)],
    ],
    latitude: [null],
    longitude: [null],
    eventClub: this.fb.group({
      id: [null],
      name: [''],
      date: [''],
      time: [''],
      location: [''],
    }),
  });

  ngOnInit() {
    this.addClubForm.get('eventClub.name')?.valueChanges.subscribe((value) => {
      const eventGroup = this.addClubForm.get('eventClub') as FormGroup;
      if (value) {
        eventGroup.get('date')?.setValidators([Validators.required]);
        eventGroup.get('time')?.setValidators([Validators.required]);
        eventGroup.get('location')?.setValidators([Validators.required]);
      } else {
        eventGroup.get('date')?.clearValidators();
        eventGroup.get('time')?.clearValidators();
        eventGroup.get('location')?.clearValidators();
      }
      eventGroup.get('date')?.updateValueAndValidity();
      eventGroup.get('time')?.updateValueAndValidity();
      eventGroup.get('location')?.updateValueAndValidity();
    });

    this.activateRoute.paramMap.subscribe((params) => {
      this.fanClubId = Number(params.get('id'));
      if (this.fanClubId !== 0) {
        this.operation = 'Editar';
        this.getFanClub(this.fanClubId);
      } else {
        this.operation = 'Añadir';
      }
    });
  }

  getFanClubEvents() {
    if (!this.fanClubId) return;

    this.loading = true;
    this.eventFanClubService.getFanClubEvents(this.fanClubId).subscribe({
      next: (events: FanClubEvent[]) => {
        this.loading = false;

        if (events.length > 0) {
          const event = events[0];
          this.addClubForm.patchValue({
            eventClub: {
              id: event.id,
              name: event.name,
              date: event.date,
              time: event.time,
              location: event.location,
            },
          });
        }
      },
      error: (err) => {
        this.loading = false;
        console.error('❌ Error al obtener eventos del fan club:', err);
        this.toastr.error('No se pudieron cargar los eventos', 'Error');
      },
    });
  }

  getFanClub(id: number) {
    this.loading = true;
    this.fanClubService.getFanClub(id).subscribe((data: FanClub) => {
      console.log('FanclubData', data);
      this.loading = false;
      const eventClub: Partial<FanClubEvent> =
        data.events && data.events.length > 0 ? data.events[0] : {};
      this.addClubForm.patchValue({
        name: data.name,
        location: data.location,
        foundedYear: data.foundedYear,
        membersCount: data.membersCount,
        latitude: data.latitude,
        longitude: data.longitude,
        eventClub: {
          id: eventClub.id || null,
          name: eventClub.name || '',
          date: eventClub.date || '',
          time: eventClub.time || '',
          location: eventClub.location || '',
        },
      });
    });
  }

  addFcbClub() {
    if (this.addClubForm.valid) {
      const newFanClub: FanClub = this.addClubForm.value;
      console.log('Peña que se enviará:', newFanClub);

      if (this.fanClubId !== 0) {
        this.loading = true;
        this.fanClubService
          .updateFanClub(this.fanClubId!, newFanClub)
          .subscribe({
            next: (res) => {
              const eventClub = this.addClubForm.get('eventClub')?.value;

              if (eventClub?.name) {
                const eventData: FanClubEvent = {
                  id: eventClub.id,
                  name: eventClub.name,
                  date: eventClub.date,
                  time: eventClub.time,
                  location: eventClub.location,
                  fanclub_id: this.fanClubId!,
                };

                if (!eventData.id) {
                  this.eventFanClubService
                    .addFanClubEvent(eventData)
                    .subscribe({
                      next: (eventRes) => {
                        console.log(
                          '✅ Add event with id' + eventData.id,
                          eventRes
                        );
                        this.toastr.success(
                          'Evento añadido con éxito',
                          'Evento registrado'
                        );
                      },
                      error: (err) => {
                        console.error('❌ Error al añadir el evento:', err);
                        this.toastr.error(
                          'No se pudo añadir el evento',
                          'Error'
                        );
                      },
                    });
                } else {
                  this.eventFanClubService
                    .updateFanClubEvent(eventData.id!, eventData)
                    .subscribe({
                      next: (eventRes) => {
                        console.log(
                          '✅ Evento actualizado con éxito',
                          eventRes
                        );
                      },
                      error: (err) => {
                        console.error('❌ Error al actualizar el evento:', err);
                      },
                    });
                }
              }
              this.getFanClubEvents();
              this.loading = false;
              this.toastr.success(
                'Peña actualizada con éxito',
                'Peña actualizada'
              );
              this.router.navigate(['/']);
            },
            error: (err) => {
              console.error('Error al actualizar la peña:', err);
            },
          });
      } else {
        this.loading = true;
        this.fanClubService.addFanClub(newFanClub).subscribe({
          next: (res: any) => {
            const fanclubId = res?.id;
            console.log('📌 fanclub_id asignado:', fanclubId);
            this.loading = false;
            const eventClub = this.addClubForm.get('eventClub')?.value;

            if (eventClub?.name) {
              const newEvent: FanClubEvent = {
                name: eventClub.name,
                date: eventClub.date,
                time: eventClub.time,
                location: eventClub.location,
                fanclub_id: fanclubId,
              };

              console.log('✅ Evento que se enviará:', newEvent);

              this.eventFanClubService.addFanClubEvent(newEvent).subscribe({
                next: (eventRes) => {
                  console.log('Evento añadido con éxito', eventRes);
                },
                error: (err) => {
                  console.error('Error al añadir el evento:', err);
                },
              });
            }
            console.log('Peña añadida con éxito', res);
            this.toastr.success('Peña añadida con éxito', 'Peña registrada');
            this.router.navigate(['/']);
          },
          error: (err) => {
            console.error('Error al añadir la peña:', err);
          },
        });
      }
    } else {
      this.errorMessage = 'Por favor, completa todos los campos requeridos.';
      this.toastr.error('No se pudo añadir la peña', 'Error al crear la peña');
    }
  }

  deleteEventFanClub(id: number) {
    this.loading = true;

    this.eventFanClubService.deleteEventFanClubEvent(id).subscribe({
      next: () => {
        this.toastr.warning('Evento eliminado con éxito', 'Evento eliminado');

        this.getFanClubEvents();

        this.addClubForm.patchValue({
          eventClub: {
            id: null,
            name: '',
            date: '',
            time: '',
            location: '',
          },
        });

        this.loading = false;
        this.router.navigate([], { relativeTo: this.activateRoute });
      },
      error: (err) => {
        console.error('❌ Error al eliminar el evento:', err);
        this.toastr.error('No se pudo eliminar el evento', 'Error');
        this.loading = false;
      },
    });
  }

  goBack() {
    this.location.back();
  }
}
