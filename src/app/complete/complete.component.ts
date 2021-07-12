import { Component, OnInit } from '@angular/core';
import { ClientContainerService } from '../services/client-container-service';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss'],
})
export class CompleteComponent implements OnInit {
  res: any;
  spinnerMode = false;

  constructor(private clientContainerService: ClientContainerService) {}

  ngOnInit(): void {
    this.res = this.clientContainerService.initialPaymentResponse;
    this.res.fullName = `${this.res.firstName} ${this.res.lastName}`;
  }
}
