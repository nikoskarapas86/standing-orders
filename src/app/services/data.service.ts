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
import { GetPolicyByEmailResponse } from '../models/get-policy-by-email-response';
import { ReceiptRequest } from '../models/receipt-request';
import { ReceiptStatus } from '../models/receipt-status';
import { Receipt, ReceiptSearchResponse } from '../models/receipt-search-response';
import { PaymentType } from '../models/payment-type';
import { ReceiptUpdateRequest } from '../models/receipt-update-request';
import { ReceiptCancelRequest } from 'src/app/models/receipt-cancel-request';
import { ReceiptRepayRequest } from '../models/receipt-repay-request';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private url = environment.baseUrl;

  constructor(private http: HttpClient) {}
  public resultsLoadingSubject = new BehaviorSubject<boolean>(false);
  resultsLoading$ = this.resultsLoadingSubject.asObservable();
  _searchRequest: SearchRequest;
  _receiptRequest: ReceiptRequest;
  private privateSearchForm: FormGroup;
  private privateReceiptStatuses: ReceiptStatus[];
  private privatePaymentTypes: PaymentType[];

  private standingOrdersResponseSubject = new BehaviorSubject<any>(undefined);
  standingOrders$: Observable<any> = this.standingOrdersResponseSubject.asObservable();

  lineOfbusinessesSubject = new BehaviorSubject<LineOfBusiness[]>(undefined);
  lineOfbusinesses$: Observable<LineOfBusiness[]> = this.lineOfbusinessesSubject.asObservable();
  setLineOfbusinessesSubject(lines) {
    this.lineOfbusinessesSubject.next(lines);
  }

  setStandingOrdersSubject(response: any) {
    this.standingOrdersResponseSubject.next(response);
  }

  private receiptsSearchSubject = new BehaviorSubject<any>(undefined);
  receipts$: Observable<any> = this.receiptsSearchSubject.asObservable();
  setReceiptsSearchSubject(response: ReceiptSearchResponse) {
    this.receiptsSearchSubject.next(response);
  }

  private privateStatus: string;

  get status(): string {
    return this.privateStatus;
  }

  set status(val: string) {
    this.privateStatus = val;
  }

  set searchRequest(request) {
    this._searchRequest = request;
  }

  set receiptRequest(req: ReceiptRequest) {
    this._receiptRequest = req;
  }
  get receiptRequest() {
    return this._receiptRequest;
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

  get receiptStatuses(): ReceiptStatus[] {
    return this.privateReceiptStatuses;
  }

  set receiptStatuses(val: ReceiptStatus[]) {
    this.privateReceiptStatuses = val;
  }

  get paymentTypes(): PaymentType[] {
    return this.privatePaymentTypes;
  }

  set paymentTypes(val: PaymentType[]) {
    this.privatePaymentTypes = val;
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

  searchReceiptStatuses(): Observable<ReceiptStatus[]> {
    return this.http.get<ReceiptStatus[]>(`${this.url}/int/search/receiptStatuses`);
  }

  getPaymentTypes(): Observable<PaymentType[]> {
    return this.http.get<PaymentType[]>(`${this.url}/int/search/paymentTypes`);
  }

  sendEmail(email: any, searchId: string) {
    const update = this.privateStatus === 'create' ? '' : '/update';
    return this.http.post(`${this.url}/int${update}/sendEmail/${searchId}`, email);
  }

  getPolicyByEmail(searchId: string): Observable<GetPolicyByEmailResponse> {
    const update = this.privateStatus === 'create' ? '' : '/update';
    return this.http.get<GetPolicyByEmailResponse>(`${this.url}/int${update}/policy/${searchId}`);
  }

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

  receiptSearch(receiptRequest: ReceiptRequest): Observable<ReceiptSearchResponse> {
    return this.http.post<any>(`${this.url}/int/receipt/search`, receiptRequest);
  }

  receiptRepay(request: ReceiptRepayRequest): Observable<Receipt> {
    return this.http.post<any>(`${this.url}/int/receipt/repay`, request);
  }

  receiptUpdate(request: ReceiptUpdateRequest): Observable<Receipt> {
    return this.http.post<any>(`${this.url}/int/receipt/update`, request);
  }

  receiptCancel(request: ReceiptCancelRequest): Observable<Receipt> {
    return this.http.post<any>(`${this.url}/int/receipt/cancel`, request);
  }

  receiptCreate(request: Receipt): Observable<Receipt> {
    return this.http.post<any>(`${this.url}/int/receipt/create`, request);
  }

  logout(): Observable<any> {
    return this.http.get<any>(`${this.url}/int/logout`);
  }
}
