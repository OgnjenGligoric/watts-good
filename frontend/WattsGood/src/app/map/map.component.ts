import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as L from 'leaflet';
import {icon} from "leaflet";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  standalone: true,
  imports: [],
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  private map: any;
  private centroid: L.LatLngExpression = [45.2396, 19.8227];
  private currentMarker: L.Marker | null = null;

  @Output() coordinatesSelected = new EventEmitter<{lat: number, lng: number, address: string}>();

  constructor(private http: HttpClient) {}

  private initMap(): void {
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 13,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );
    tiles.addTo(this.map);
    this.markOnClick();
  }

  markOnClick(): void {
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      if (this.currentMarker) {
        this.map.removeLayer(this.currentMarker);
      }
      this.currentMarker = L.marker([lat, lng]).addTo(this.map);

      this.http.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`)
        .subscribe((response: any) => {
          const addr = response.address;
          if (addr) {
            const street = addr.road || addr.street || 'Unknown street';
            const houseNumber = addr.house_number || 'N/A';
            const address = `${street} ${houseNumber}`;
            this.coordinatesSelected.emit({ lat, lng, address });
          }
        });
    });
  }

  ngOnInit(): void {

    this.initMap();
  }
}
