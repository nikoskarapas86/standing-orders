import { Component, OnInit } from '@angular/core';
import { DeleteReason } from '../models/delete-reason';
import { DataService } from '../services/data.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-delete-list',
  templateUrl: './delete-list.component.html',
  styleUrls: ['./delete-list.component.scss'],
})
export class DeleteListComponent implements OnInit {
  public deleteReasons: DeleteReason[];
  public deleteReason: DeleteReason;

  constructor(public dataService: DataService, private modalService: ModalService) {}

  ngOnInit(): void {
    this.dataService.deleteReasons().subscribe(res => {
      this.deleteReasons = res;
    });
  }

  cancel(): void {
    this.modalService.modalDialog.close();
  }

  submit(): void {}
}
