import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DeleteListComponent } from '../delete-list/delete-list.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private privateModalDialog: MatDialogRef<DeleteListComponent, any>;

  set modalDialog(value: MatDialogRef<DeleteListComponent, any>) {
    this.privateModalDialog = value;
  }

  get modalDialog(): MatDialogRef<DeleteListComponent, any> {
    return this.privateModalDialog;
  }
}
