import { Component, inject, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements OnInit {
  private map: any;
  private userMarker: L.Marker<any> | undefined;
  private toastr = inject(ToastrService);

  ngOnInit(): void {
    this.initMap();
  }

  initMap() {
    this.map = L.map('map').setView([-17.78629, -63.18117], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
      this.map
    );
  }
  getLocation() {
    if (navigator.geolocation) {
      const myIcon = L.icon({
        iconUrl: 'assets/img/barcelona-icon.png',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -42],
        shadowSize: [40, 40],
      });

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords: [number, number] = [
            position.coords.latitude,
            position.coords.longitude,
          ];
          this.map.setView(coords, 15);
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
              this.map.setView(position, 15);
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
