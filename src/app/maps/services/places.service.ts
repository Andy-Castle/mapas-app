import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  public userLocation?: [number, number];
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  get isUserLocationReady(): boolean {
    //la doble negación sirvo como un true
    //osea hacer un !false, para que sea positivo
    return !!this.userLocation;
  }

  constructor(private http: HttpClient) {
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation = [coords.longitude, coords.latitude];
          resolve(this.userLocation);
        },
        (err) => {
          alert('No se pudo obtener la geolocalizacion');
          console.log(err);
          reject();
        }
      );
    });
  }

  getPlacesByQuery(query: string = '') {
    //todo: cuando el query es nulo

    this.isLoadingPlaces = true;

    this.http
      .get<PlacesResponse>(
        `https://api.mapbox.com/search/geocode/v6/forward?q=${query}&proximity=-86.91055485376322%2C21.080124465020575&language=es&access_token=pk.eyJ1IjoibWFzcXVlcmFkZSIsImEiOiJjbTZqcXFvbGUwM3Z0MnFxM3NuMjB6cTkxIn0.AZDN64QgZzNdHDzBX72J4A`
      )
      .subscribe((resp) => {
        console.log(resp.features);
        this.isLoadingPlaces = false;
        this.places = resp.features;
      });
  }
}
