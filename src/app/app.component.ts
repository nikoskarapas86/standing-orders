import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './services/data.service';
import { WindowRefService } from './services/window-ref.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'standingOrders-frontend';

  constructor(
    public dataService: DataService,
    private windowRefService: WindowRefService,
    private router: Router
  ) {
    if (this.windowRefService.nativeWindow().performance.navigation.type === 1) {
      this.router.navigateByUrl('/home');
    }
  }

  ngOnInit(): void {


  }
}
