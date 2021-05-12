import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteReason } from '../models/delete-reason';
import { DeleteRequest } from '../models/delete-request';
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

  constructor(
    public dataService: DataService,
    private modalService: ModalService,
    @Inject(MAT_DIALOG_DATA) public data: { searchItemId: number; searchId: string }
  ) {}

  ngOnInit(): void {
    this.dataService.deleteReasons().subscribe(res => {
      this.deleteReasons = res;
    });
  }

  close(): void {
    this.modalService.modalDialog.close();
  }

  submit(): void {
    const request: DeleteRequest = {
      id: this.data.searchItemId,
      deleteReason: this.deleteReason.lineOfBusiness,
    };
    this.dataService.delete(request, this.data.searchId).subscribe(res => {
      this.close();
    });
  }
}
