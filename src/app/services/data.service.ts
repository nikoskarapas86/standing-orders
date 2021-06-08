import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CreateRequest } from '../models/create-request';
import { CreateResponse } from '../models/create-response';
import { SearchPolicyRequest } from '../models/search-policy-request';
import { SearchPolicyResponse } from '../models/search-policy-response';
import { SearchRequest } from '../models/search-request';
import { SearchResponse } from '../models/search-response';
import { UpdateResponse } from '../models/update-response';
import { environment } from '../../environments/environment';
import { LineOfBusiness } from '../models/line-of-business';
import { DeleteRequest } from '../models/delete-request';
import { DeleteResponse } from '../models/delete-response';
import { DeleteReason } from '../models/delete-reason';
import { ValidateRequest } from '../models/validate-request';
import { ValidateResponse } from '../models/validate-response';
import { UpdateBankAccountRequest } from '../models/update-bank-account-request';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private url = environment.baseUrl;

  constructor(private http: HttpClient) {}

  _searchRequest: SearchRequest;
  private privateSearchForm: FormGroup;
  private standingOrdersResponseSubject = new BehaviorSubject<any>(undefined);
  standingOrders$: Observable<any> = this.standingOrdersResponseSubject.asObservable();
  setStandingOrdersSubject(response: any) {
    this.standingOrdersResponseSubject.next(response);
  }

  set searchRequest(request) {
    this._searchRequest = request;
  }

  get searchRequest() {
    return this._searchRequest;
  }

  set searchForm(val: FormGroup) {
    this.privateSearchForm = val;
  }

  get searchForm() {
    return this.privateSearchForm;
  }

  private searchPolicyResponseSubject = new BehaviorSubject<SearchPolicyResponse>(undefined);
  searchPolicyResponse$: Observable<SearchPolicyResponse> = this.searchPolicyResponseSubject.asObservable();
  setSearchPolicySubject(response: SearchPolicyResponse) {
    this.searchPolicyResponseSubject.next(response);
  }

  getValueSearchPolicySubject() {
    return this.searchPolicyResponseSubject.getValue();
  }

  searchStandingOrder(
    searchRequest: SearchRequest,
    pageNumber = 0,
    sizeOfResult = 10
  ): Observable<SearchResponse> {
    return this.http.post<SearchResponse>(
      `${this.url}/int/search/standingOrder?page=${pageNumber}&size=${sizeOfResult}`,
      searchRequest
    );
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

  delete(deleteRequest: DeleteRequest, searchId: string): Observable<DeleteResponse> {
    return this.http.post<DeleteResponse>(`${this.url}/int/delete/${searchId}`, deleteRequest);
  }

  searchLinesOfBusiness(): Observable<LineOfBusiness[]> {
    return this.http.get<LineOfBusiness[]>(`${this.url}/int/search/linesOfBusiness`);
  }

  // update(updateRequest: CardNumberUpdateRequest | IbanUpdateRequest): Observable<UpdateResponse> {
  //   return this.http.put<UpdateResponse>(`${this.url}/int/update/bankAccount/${searchId}`, updateRequest);
  // }

  updateBankAccount(
    request: UpdateBankAccountRequest,
    searchId: string
  ): Observable<UpdateResponse> {
    return this.http.put<UpdateResponse>(`${this.url}/int/update/bankAccount/${searchId}`, request);
  }

  deleteReasons(): Observable<DeleteReason[]> {
    return this.http.get<DeleteReason[]>(`${this.url}/int/search/deleteReasons`);
  }

  validate(validateRequest: ValidateRequest): Observable<ValidateResponse> {
    return this.http.post<ValidateResponse>(`${this.url}/int/validate/iban`, validateRequest);
  }
}
