import { Component, inject, OnInit } from '@angular/core';
import { ModalStateService } from '../../../services/modal-state.service';
import { EventfanclubService } from '../../../services/eventfanclub.service';
import { ToastrService } from 'ngx-toastr';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FanClubEvent } from '../../../interfaces/fanClubEvent';
import { FanclubService } from '../../../services/fanclub.service';
import { FanClub } from '../../../interfaces/fanclub';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-calendar',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './modal-calendar.component.html',
  styleUrl: './modal-calendar.component.scss',
})
export class ModalCalendarComponent implements OnInit {
  private modalStateService = inject(ModalStateService);
  private eventFanClubService = inject(EventfanclubService);
  private fanClubService = inject(FanclubService);
  private toastr = inject(ToastrService);
  private fb = inject(FormBuilder);
  fanClubs: FanClub[] = [];
  isModalOpen = this.modalStateService.isModalOpen;
  selectedEvent = this.modalStateService.selectedEvent;
  updateEventForm!: FormGroup;
  newEventForm!: FormGroup;
  isEditing = this.modalStateService.isEditing;
  isCreating = this.modalStateService.isCreating;

  ngOnInit(): void {
    this.initUpdateForm();
    this.initNewEventForm();
    this.getFanClubs();
  }

  initUpdateForm() {
    this.updateEventForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      date: ['', Validators.required],
      time: ['', Validators.required],
      location: ['', Validators.required],
    });
    this.populateForm();
  }

  initNewEventForm() {
    this.newEventForm = this.fb.group({
      fanclub_id: [null, Validators.required],
      name: ['', [Validators.required, Validators.minLength(3)]],
      date: ['', Validators.required],
      time: ['', Validators.required],
      location: ['', Validators.required],
    });
  }

  getFanClubs() {
    this.fanClubService.getListFanClubs().subscribe({
      next: (fanClubs) => (this.fanClubs = fanClubs),
      error: (err) => console.error('Error al obtener los fan clubs:', err),
    });
  }

  populateForm() {
    const event = this.selectedEvent();
    if (event) {
      this.updateEventForm.patchValue({
        name: event.title,
        date: event.date,
        time: event.time,
        location: event.location,
      });
    }
  }

  toggleEdit() {
    this.isEditing.set(!this.isEditing());
    this.populateForm();
  }

  closeModal() {
    this.modalStateService.closeModal();
  }

  updateEventFanClub() {
    if (this.updateEventForm.invalid) {
      this.toastr.error('Por favor, completa todos los campos.', 'Error');
      return;
    }

    const selectedEvent = this.selectedEvent();
    if (!selectedEvent) {
      this.toastr.error('No se encontró el evento seleccionado.', 'Error');
      return;
    }

    const updatedEvent: FanClubEvent = {
      id: Number(selectedEvent?.id),
      fanclub_id: selectedEvent.fanclub_id,
      name: this.updateEventForm.value.name,
      date: this.updateEventForm.value.date,
      time: this.updateEventForm.value.time,
      location: this.updateEventForm.value.location,
    };

    this.eventFanClubService
      .updateFanClubEvent(updatedEvent.id!, updatedEvent)
      .subscribe({
        next: () => {
          this.toastr.success('Evento actualizado con éxito.', 'Éxito');
          this.closeModal();
          setTimeout(() => {
            location.reload();
          }, 1000);
        },
        error: (err) => {
          this.toastr.error('Error al actualizar el evento.', 'Error');
          console.error(err);
        },
      });
  }

  createEventFanClub() {
    if (this.newEventForm.invalid) {
      this.toastr.error('Por favor, completa todos los campos.', 'Error');
      return;
    }
    const newEventFanClub: FanClubEvent = {
      fanclub_id: this.newEventForm.value.fanclub_id,
      name: this.newEventForm.value.name,
      date: this.newEventForm.value.date,
      time: this.newEventForm.value.time,
      location: this.newEventForm.value.location,
    };

    this.eventFanClubService.addFanClubEvent(newEventFanClub).subscribe({
      next: () => {
        this.toastr.success('Evento creado con éxito', 'Evento nuevo');
        this.closeModal();
        setTimeout(() => {
          location.reload();
        }, 1000);
      },
      error: (error) => {
        this.toastr.error('Error al crear el evento.', 'Error');
        console.error(error);
      },
    });
  }

  deleteEventFanClub() {
    const eventId = this.selectedEvent()?.id;
    if (eventId) {
      this.eventFanClubService.deleteEventFanClubEvent(eventId).subscribe({
        next: () => {
          this.toastr.success('Evento eliminado con éxito', 'Evento eliminado');
          this.closeModal();
          setTimeout(() => {
            location.reload();
          }, 1000);
        },
        error: (err) => {
          this.toastr.error('Error al eliminar el evento.', 'Error');
          console.error(err);
        },
      });
    }
  }
}
