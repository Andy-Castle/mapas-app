import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { PlacesService } from '../../services';
import { Map, Popup, Marker } from 'mapbox-gl';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css'],
})
export class MapViewComponent implements OnInit, AfterViewInit {
  @ViewChild('mapDiv')
  mapDivElement!: ElementRef;

  constructor(private placesService: PlacesService) {}

  ngAfterViewInit(): void {
    if (!this.placesService.userLocation)
      throw new Error('No hay placesService.userLocation');

    const map = new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.placesService.userLocation, // starting position [lng, lat]
      zoom: 14,
    });

    const popup = new Popup().setHTML(`
      <h6>Aquí estoy</h6>
      <span>Estoy en este lugar del mundo</span>

      `);

    new Marker({ color: 'red' })
      .setLngLat(this.placesService.userLocation)
      .setPopup(popup)
      .addTo(map);
  }

  ngOnInit(): void {
    // console.log(this.placesService.userLocation);
  }
}
