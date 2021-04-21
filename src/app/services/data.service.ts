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
import { environment } from '../../environments/environment';
import { LineOfBussiness } from '../models/line-of-bussiness';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private url = environment.baseUrl;

  constructor(private http: HttpClient) {}

  searchStandingOrder(searchRequest: SearchRequest): Observable<SearchItem[]> {
    return this.http.post<SearchItem[]>(`${this.url}/search/standingOrder`, searchRequest);
  }

  searchPolicy(searchPolicyRequest: SearchPolicyRequest): Observable<SearchPolicyResponse> {
    return this.http.post<SearchPolicyResponse>(
      `${this.url}/int/search/policy`,
      searchPolicyRequest
    );
  }

  create(createRequest: CreateRequest): Observable<CreateResponse> {
    return this.http.post<CreateResponse>(`${this.url}/int/create`, createRequest);
  }

  // delete(deleteRequest: DeleteRequest): Observable<DeleteResponse> {
  //   return this.http.delete<DeleteResponse>('/int/delete', deleteRequest);
  // }

  searchLinesOfBusiness(): Observable<LineOfBussiness[]> {
    return this.http.get<LineOfBussiness[]>(`${this.url}/int/search/linesOfBusiness`);
  }

  update(updateRequest: UpdateRequest): Observable<UpdateResponse> {
    return this.http.put<UpdateResponse>(`${this.url}/int/delete`, updateRequest);
  }
}
