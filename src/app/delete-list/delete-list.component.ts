import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { DeleteReason } from '../models/delete-reason';
import { DeleteRequest } from '../models/delete-request';
import { DataService } from '../services/data.service';
import { DestroyService } from '../services/destroy.service';
import { ModalService } from '../services/modal.service';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-delete-list',
  templateUrl: './delete-list.component.html',
  styleUrls: ['./delete-list.component.scss'],
  providers: [DestroyService],
})
export class DeleteListComponent implements OnInit {
  public deleteReasons: DeleteReason[];
  public deleteReason: DeleteReason;

  constructor(
    public dataService: DataService,
    private modalService: ModalService,
    private searchService: SearchService,
    @Inject(MAT_DIALOG_DATA) public data: { searchItemId: number; searchId: string },
    private readonly destroy$: DestroyService
  ) {}

  ngOnInit(): void {
    this.dataService
      .deleteReasons()
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.deleteReasons = res;
      });
  }

  close(): void {
    this.modalService.modalDialog.close();
  }

  submit(): void {
    const request: DeleteRequest = {
      id: this.data.searchItemId,
      deleteReason: this.deleteReason.deleteReason,
    };
    this.dataService
      .delete(request, this.data.searchId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.close();
        this.searchService.isDeleteCalled = true;
      });
  }
}
