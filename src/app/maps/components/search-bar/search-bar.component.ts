import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  private debounceTimer?: NodeJS.Timeout;

  constructor() {}

  onQueryChanged(query: string = '') {
    // console.log(query);
    if (this.debounceTimer) clearTimeout(this.debounceTimer);

    this.debounceTimer = setTimeout(() => {
      console.log('Mandar este query: ', query);
    }, 350);
  }
}
