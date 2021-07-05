import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { LineOfBusiness } from './models/line-of-business';
import { DataService } from './services/data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'standingOrders-frontend';

  constructor(public dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.searchLinesOfBusiness().subscribe(
      (res: LineOfBusiness[]) => {
        this.dataService.setLineOfbusinessesSubject(res)
      }
    )
  }



}
