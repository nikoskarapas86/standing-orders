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
export class ModalComponent implements OnInit {
  @ViewChild('modalContent', { read: ViewContainerRef })
  modalDynamicContent: ViewContainerRef;
  message: string;
  termsContent: boolean = false;
  buttonText: string;
  hasRedirectError: boolean;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalComponent>,
    private router: Router
  ) {}

  ngOnInit(): void {
    const error = this.data.error;
    this.hasRedirectError = error 
    this.message = error ? this.getMessagefromJSON(error.message) : this.getTermsContent(this.data);

  }

  getTermsContent(msg) {
    this.termsContent = true;
    return msg;
  }

  getMessagefromJSON(message: string) {
    let msg = this.isJson(message)
      ? JSON.parse(message).reduce((msg, item) => (msg += item.message.concat('  ')), ' ')
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
    if (this.hasRedirectError) this.router.navigateByUrl('signup/phone');
  }

  dismiss() {
    this.dialogRef.close(false);
  }

  getActionNoTitle = () => ({
    'action__no-title': !this.termsContent,
  });
}
