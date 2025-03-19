import { Component, inject, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { ToastrService } from 'ngx-toastr';
import { FanclubService } from '../../services/fanclub.service';
import { FanClub } from '../../interfaces/fanclub';
@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements OnInit {
  private map!: L.Map;
  private userMarker: L.Marker | undefined;
  private toastr = inject(ToastrService);
  private fanClubService = inject(FanclubService);

  ngOnInit(): void {
    this.initMap();
    this.loadFanClubs();
  }

  initMap() {
    this.map = L.map('map').setView(
      [41.56380452150297, 2.2289271831194823],
      10
    );
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
      this.map
    );
  }

  loadFanClubs() {
    this.fanClubService.getListFanClubs().subscribe((fanClubs: FanClub[]) => {
      fanClubs.forEach((fanclub) => {
        if (fanclub.latitude && fanclub.longitude) {
          this.addFanClubMarker(fanclub);
        }
      });
    });
  }

  addFanClubMarker(fanclub: FanClub) {
    if (fanclub.latitude !== undefined && fanclub.longitude !== undefined) {
      const myIcon = L.icon({
        iconUrl: 'assets/img/barcelona-icon-map.png',
        iconSize: [60, 60],
        iconAnchor: [20, 40],
        popupAnchor: [0, -42],
        shadowSize: [60, 60],
      });

      const marker = L.marker([fanclub.latitude, fanclub.longitude], {
        icon: myIcon,
      })
        .addTo(this.map)
        .bindPopup(`<strong>${fanclub.name}</strong><br>${fanclub.location}`);

      marker.on('click', () => {
        this.toastr.info(`Ubicación de ${fanclub.name}`, 'Información');
      });
    }
  }

  getLocation() {
    if (navigator.geolocation) {
      const myIcon = L.icon({
        iconUrl: 'assets/img/user-location.png',
        iconSize: [45, 45],
        iconAnchor: [20, 40],
        popupAnchor: [0, -37],
        shadowSize: [45, 45],
      });

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords: [number, number] = [
            position.coords.latitude,
            position.coords.longitude,
          ];
          this.map.setView(coords, 10);
          if (this.userMarker) {
            this.userMarker = L.marker(coords);
          } else {
            this.userMarker = L.marker(coords, {
              icon: myIcon,
              draggable: true,
            })
              .addTo(this.map)
              .bindPopup('Estás aquí')
              .openPopup();

            this.userMarker.on('dragend', (event) => {
              const marker = event.target;
              const position = marker.getLatLng();
              marker.setLatLng(position).openPopup();
              this.map.setView(position, 10);
              this.toastr.info(
                `Ubicación actualizada a: ${position.lat}, ${position.lng}`,
                'Ubicación'
              );
            });
          }
        },
        () => {
          alert('No se pudo obtener la geolocalización');
          this.toastr.error(
            'No se pudo obtener la geolocalización',
            'Error geolocalización'
          );
        }
      );
    } else {
      alert('Geolocalización no soportada por el navegador');
      this.toastr.error(
        'Geolocalización no soportada por el navegador',
        'No se pudo hacer la geolocalización'
      );
    }
  }
}
