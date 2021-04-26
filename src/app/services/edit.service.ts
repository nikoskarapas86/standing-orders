import { Injectable } from '@angular/core';
import { SearchItem } from '../models/search-response';

@Injectable({
  providedIn: 'root',
})
export class EditService {
  private privateSelectedStandingOrder: SearchItem;

  set selectedStandingOrder(value: SearchItem) {
    this.privateSelectedStandingOrder = value;
  }

  get selectedStandingOrder(): SearchItem {
    return this.privateSelectedStandingOrder;
  }
}
