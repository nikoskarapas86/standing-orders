import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SearchItem } from '../models/search-response';

@Injectable({
  providedIn: 'root',
})
export class EditService {
  private privateSelectedStandingOrder: SearchItem;
  private url = environment.baseUrl;
constructor(private http: HttpClient){}
  set selectedStandingOrder(value: SearchItem) {
    this.privateSelectedStandingOrder = value;
  }

  get selectedStandingOrder(): SearchItem {
    return this.privateSelectedStandingOrder;
  }



  edit(searchId:string,identity:number):Observable<any>{
    return this.http.post<any>(`${this.url}/int/update/select/${searchId}`,{id:identity})
  }
}
