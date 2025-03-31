import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalStateService {
  isModalOpen = signal(false);
  selectedEvent = signal<{
    id: number;
    title: string;
    date: string;
    time: string;
    location: string;
  } | null>(null);

  openModal(event: {
    id: number;
    title: string;
    date: string;
    time: string;
    location: string;
  }) {
    this.selectedEvent.set(event);
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.selectedEvent.set(null);
  }
}
