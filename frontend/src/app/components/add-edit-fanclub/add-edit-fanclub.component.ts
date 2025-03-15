import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FanClub } from '../../interfaces/fanclub';
@Component({
  selector: 'app-add-edit-fanclub',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './add-edit-fanclub.component.html',
  styleUrl: './add-edit-fanclub.component.scss',
})
export class AddEditFanclubComponent {
  currentYear: number = new Date().getFullYear();
  errorMessage: string | null = null;
  private fb = inject(FormBuilder);
  private router = inject(Router);

  addClubForm: FormGroup = this.fb.group({
    clubName: ['', [Validators.required, Validators.minLength(2)]],
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
    latitude: [''],
    longitude: [''],
    eventsClub: [''],
  });

  addFcbClub() {
    if (this.addClubForm.valid) {
      const newFanClub: FanClub = this.addClubForm.value;
      console.log(newFanClub);
      console.log(this.addClubForm);
      // this.router.navigate(['/']);
    } else {
      this.errorMessage = 'Por favor, completa todos los campos requeridos.';
    }
  }
}
