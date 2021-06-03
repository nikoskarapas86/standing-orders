import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InitialPaymentResponse } from '../models/initial-payment-response';
import { MastercardService } from '../services/mastercard.service';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss'],
})
export class CompleteComponent implements OnInit {
  // res: InitialPaymentResponse;
  res: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mastercardService: MastercardService
  ) {}

  ngOnInit(): void {
    const searchId = this.route.snapshot.queryParams.searchId;
    this.initialPayment(searchId);
  }

  private initialPayment(searchId: string) {
    this.mastercardService.initialPayment(searchId).subscribe(
      res => {
        this.res = res;
        console.log('res in initialPayment');
        console.log(res);
        // this.isPaymentCompleted = true;
        // this.isLoading = false;
      },
      error => {
        this.res = {
          paymentType: 'CREDIT_CARD',
          iban: '',
          tokenOfCardNumber: '9265678513596936',
          cardExpiryMonth: 5,
          cardExpiryYear: 21,
          id: 20000142,
          versionNo: 1,
          bankAccount: '9265678513596936',
          checkDigit: 0,
          organizationDescription: 'ΕΘΝΙΚΗ',
          lineOfBusiness: 'AUTO',
          lastName: 'ΛΑΠΠΑΣ',
          firstName: 'ΧΑΡΑΛΑΜΠΟΣ',
          address: 'ΟΜΗΡΟΥ 37, ΝΕΑ ΣΜΥΡΝΗ',
          city: 'ΑΘΗΝΑ',
          postalCode: '17121',
          phone: 2109348365,
          vatNumber: '132687225',
          policyNo: 1389945,
          endorsement: '',
          newCollectionAgency: 782,
          oldCollectionAgency: 4000,
          email: 'xarlap@gmail.com',
          recordStatus: 'ΚΑΤΑΧΩΡΗΣΗ ΑΠΟ ΟΘΟΝΗ',
          recordStatusDate: [2021, 5, 27],
          customerStatus: 'ΠΕΛΑΤΗΣ ΜΕ ΚΑΡΤΑ ΚΑΙ ΣΥΜΒΟΛΑΙΟ',
          customerStatusDate: [2021, 5, 27],
          policyStatus: 'ΥΠΑΡΞΗ ΑΠΟ ΠΡΙΝ ΤΟΥ ΣΥΜΒΟΛΑΙΟΥ',
          policyStatusDate: [2021, 5, 27],
          cardStatus: 'ΥΠΑΡΞΗ ΑΠΟ ΠΡΙΝ ΠΙΣΤΩΤΙΚΗΣ ΚΑΡΤΑΣ',
          cardStatusDate: [2021, 5, 27],
          standingOrderStatus: 'ΠΑΓΙΑ ΕΝΤΟΛΗ ΣΕ ΙΣΧΥ',
          activeStandingOrder: true,
          standingOrderStatusDate: [2021, 5, 27],
          startDate: [2021, 5, 27],
          endDate: [2100, 12, 31],
        };

        this.res.fullName = `${this.res.firstName} ${this.res.lastName}`;

        // this.isLoading = false;
      }
    );
  }
}
