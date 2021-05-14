import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent {
  @ViewChild('modalContent', { read: ViewContainerRef })
  message: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalComponent>,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    const error = this.data.error;
    this.message = error ? this.getMessagefromJSON(error.message) : 'Παρουσιάστηκε Σφάλμα';
  }

  getMessagefromJSON(message: string) {
    let msg = this.isJson(message)
      ? JSON.parse(message).reduce((msg, item) => (msg += item.message.concat('\n')), ' ')
      : message;
    return msg;
  }

  isJson(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  accept() {
    this.dialogRef.close(true);
  }

  dismiss() {
    this.dialogRef.close(false);
  }
}
