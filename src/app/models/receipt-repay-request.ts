export class ReceiptRepayRequest {
  'key': {
    lineOfBusiness: string;
    policyNo: number;
    receipt: number;
    installments: number;
  };
  'amount': number;
  'billingDate': string;
}
