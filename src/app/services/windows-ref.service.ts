import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WindowRefService {
  nativeWindow(): Window {
    return window;
  }
}
