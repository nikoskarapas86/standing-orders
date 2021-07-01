import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Card } from '../models/card';
import { ReceiptRequest } from '../models/receipt-request';
import { ReceiptResponse } from '../models/receipt-response';
import { SearchItem } from '../models/search-response';

@Injectable({
  providedIn: 'root',
})
export class EditService {
  private privateSelectedStandingOrder: SearchItem;
  private privateSelectedCard: Card;
  private url = environment.baseUrl;
  constructor(private http: HttpClient) { }
  set selectedCard(value: Card) {
    this.privateSelectedCard = value;
  }

  get selectedCard(): Card {
    return this.privateSelectedCard;
  }
  set selectedStandingOrder(value: SearchItem) {
    this.privateSelectedStandingOrder = value;
  }

  get selectedStandingOrder(): SearchItem {
    return this.privateSelectedStandingOrder;
  }

  getCard(tokenOfCardNumber: string) {
    return this.http.post<any>(`${this.url}/int/search/cardDetails`, { token: tokenOfCardNumber })
  }

  edit(searchId: string, identity: number): Observable<any> {
    return this.http.post<any>(`${this.url}/int/update/select/${searchId}`, { id: identity })
  }


}
