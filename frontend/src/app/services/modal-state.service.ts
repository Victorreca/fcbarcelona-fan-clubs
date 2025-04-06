import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalStateService {
  isModalOpen = signal(false);
  isEditing = signal(false);
  isCreating = signal(false);
  selectedEvent = signal<{
    id: number;
    fanclub_id: number;
    title: string;
    date: string;
    time: string;
    location: string;
    fanClub?: { id: number; name: string };
  } | null>(null);

  openModal(
    event: {
      id: number;
      fanclub_id: number;
      title: string;
      date: string;
      time: string;
      location: string;
      fanClub: { id: number; name: string };
    },
    editing: boolean = false
  ) {
    this.selectedEvent.set(event);
    this.isEditing.set(editing);
    this.isModalOpen.set(true);
  }

  openCreateModal() {
    this.selectedEvent.set(null);
    this.isEditing.set(false);
    this.isCreating.set(true);
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.selectedEvent.set(null);
    this.isEditing.set(false);
    this.isCreating.set(false);
  }
}
