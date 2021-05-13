import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private _isDeleteCalled = new BehaviorSubject<boolean>(false);
  getIsDeleteCalled = this._isDeleteCalled.asObservable();

  set isDeleteCalled(val: boolean) {
    this._isDeleteCalled.next(val);
  }
}
