export class UpdateRequest {
  'key': {
    id: number;
    versionNo: number;
  };

  'paymentType': string;

  'cardExpiryMonth': number;
  'cardExpiryYear': number;
  'cardNumber': string;
}
