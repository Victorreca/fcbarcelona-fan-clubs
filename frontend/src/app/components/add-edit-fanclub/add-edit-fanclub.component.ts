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
      name: [''],
      date: [''],
      time: [''],
      location: [''],
    }),
  });

  ngOnInit() {
    this.fanClubId = Number(this.activateRoute.snapshot.paramMap.get('id'));
    if (this.fanClubId !== 0) {
      this.operation = 'Editar';
      this.getFanClub(this.fanClubId);
    } else {
      this.operation = 'Añadir';
    }
  }

  getFanClub(id: number) {
    this.loading = true;
    this.fanClubService.getFanClub(id).subscribe((data: FanClub) => {
      console.log(data);
      this.loading = false;
      this.addClubForm.patchValue(data);
    });
  }

  goBack() {
    this.location.back();
  }

  addFcbClub() {
    if (this.addClubForm.valid) {
      const newFanClub: FanClub = this.addClubForm.value;

      if (this.fanClubId !== 0) {
        this.loading = true;
        this.fanClubService
          .updateFanClub(this.fanClubId!, newFanClub)
          .subscribe({
            next: (res) => {
              console.log('Peña actualizada con éxito', res);
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
          next: (res) => {
            console.log('Peña añadida con éxito', res);
            this.loading = false;
            this.router.navigate(['/']);
            this.toastr.success('Peña añadida con éxito', 'Peña registrada');
          },
          error: (err) => {
            console.error('Error al añadir la peña:', err);
          },
        });
      }
    } else {
      this.errorMessage = 'Por favor, completa todos los campos requeridos.';
      this.toastr.error(
        'No se puedo añadir la peña',
        'No se pudo añadir la peña'
      );
    }
  }
}
