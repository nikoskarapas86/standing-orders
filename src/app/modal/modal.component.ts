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
import { Card } from '../models/card';

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
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalComponent>,
    private router: Router
  ) { }

  ngOnInit(): void {
    const error = this.data.error;
    this.message = error ? this.getMessagefromJSON(error.message) : (typeof (this.data) == "object" && !error) ? this.getMessage(this.data) : this.getTermsContent(this.data);
  }

  getMessage(card: Card) {
    return "Η κάρτα έχει αριθμό : " + card.cardNumber + " και ημ/νια λήξης : " + card.cardExpiry
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
  }

  dismiss() {
    this.dialogRef.close(false);
  }

  getActionNoTitle = () => ({
    'action__no-title': !this.termsContent,
  });
}
