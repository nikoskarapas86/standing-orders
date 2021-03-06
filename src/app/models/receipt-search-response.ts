export class Receipt {
  status: string;
  lineOfBusiness: string;
  policyNo: number;
  checkDigit: number;
  endorsement: number;
  receipt: number;
  paymentType: string;
  installments: number;
  branchStore: string;
  collectionAgency: string;
  agent: number;
  amount: number;
  endorsementAmount: number;
  installmentAmount: number;
  installment2Amount: number;
  billingDate: string;
  issueDate: string;
  paymentDate: string;
  bankResponseDate: string;
  registerDate: string;
  reversalNo: number;
  reversalNo2: number;
  collectionTries: number;
  orderNo: number;
  loanNo: string;
}

export class ReceiptSearchResponse {
  receipts: Receipt[];
  standingOrderStatus: string;
  startDate: string;
}
