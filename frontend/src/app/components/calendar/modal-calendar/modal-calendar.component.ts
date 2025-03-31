import { Component, inject } from '@angular/core';
import { ModalStateService } from '../../../services/modal-state.service';

@Component({
  selector: 'app-modal-calendar',
  imports: [],
  templateUrl: './modal-calendar.component.html',
  styleUrl: './modal-calendar.component.scss',
})
export class ModalCalendarComponent {
  private modalStateService = inject(ModalStateService);

  isModalOpen = this.modalStateService.isModalOpen;
  selectedEvent = this.modalStateService.selectedEvent;

  closeModal() {
    this.modalStateService.closeModal();
  }
}
