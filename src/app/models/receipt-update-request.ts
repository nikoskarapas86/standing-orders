export class ReceiptUpdateRequest {
  'key': {
    lineOfBusiness: string;
    policyNo: number;
    receipt: number;
    installments: number;
  };
  'amount': number;
}
