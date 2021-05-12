import { Component, OnInit } from '@angular/core';
import { EditService } from '../services/edit.service';

@Component({
  selector: 'app-edit-standing-order',
  templateUrl: './edit-standing-order.component.html',
  styleUrls: ['./edit-standing-order.component.scss'],
})
export class EditStandingOrderComponent implements OnInit {
  constructor(public editService: EditService) {}

  ngOnInit(): void {}
}