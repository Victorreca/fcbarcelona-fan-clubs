import { Component, inject, OnInit } from '@angular/core';
import { ModalStateService } from '../../../services/modal-state.service';
import { EventfanclubService } from '../../../services/eventfanclub.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FanClubEvent } from '../../../interfaces/fanClubEvent';

@Component({
  selector: 'app-modal-calendar',
  imports: [],
  templateUrl: './modal-calendar.component.html',
  styleUrl: './modal-calendar.component.scss',
})
export class ModalCalendarComponent implements OnInit {
  private modalStateService = inject(ModalStateService);
  private eventFanClubService = inject(EventfanclubService);
  private toastr = inject(ToastrService);
  private fb = inject(FormBuilder);
  isModalOpen = this.modalStateService.isModalOpen;
  selectedEvent = this.modalStateService.selectedEvent;
  updateEventForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.updateEventForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      date: ['', Validators.required],
      time: ['', Validators.required],
      location: ['', Validators.required],
    });
    this.populateForm();
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
        },
        error: (err) => {
          this.toastr.error('Error al actualizar el evento.', 'Error');
          console.error(err);
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
          location.reload();
        },
        error: (err) => {
          this.toastr.error('Error al eliminar el evento.', 'Error');
          console.error(err);
        },
      });
    }
  }
}
