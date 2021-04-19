import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateRequest } from '../models/create-request';
import { CreateResponse } from '../models/create-response';
// import { DeleteRequest } from '../models/delete-request';
// import { DeleteResponse } from '../models/delete-response';
import { SearchPolicyRequest } from '../models/search-policy-request';
import { SearchPolicyResponse } from '../models/search-policy-response';
import { SearchRequest } from '../models/search-request';
import { SearchItem } from '../models/search-response';
import { UpdateRequest } from '../models/update-request';
import { UpdateResponse } from '../models/update-response';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  searchStandingOrder(searchRequest: SearchRequest): Observable<SearchItem[]> {
    return this.http.post<SearchItem[]>('search/standingOrder', searchRequest);
  }

  searchPolicy(searchPolicyRequest: SearchPolicyRequest): Observable<SearchPolicyResponse> {
    return this.http.post<SearchPolicyResponse>('/int/search/policy', searchPolicyRequest);
  }

  create(createRequest: CreateRequest): Observable<CreateResponse> {
    return this.http.post<CreateResponse>('/int/create', createRequest);
  }

  // delete(deleteRequest: DeleteRequest): Observable<DeleteResponse> {
  //   return this.http.delete<DeleteResponse>('/int/delete', deleteRequest);
  // }

  searchLinesOfBusiness(): Observable<string[]> {
    return this.http.get<string[]>('search/linesOfBusiness');
  }

  update(updateRequest: UpdateRequest): Observable<UpdateResponse> {
    return this.http.put<UpdateResponse>('/int/delete', updateRequest);
  }
}
