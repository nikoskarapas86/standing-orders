export class CardNumberUpdateRequest {
  'key': {
    id: number;
    versionNo: number;
  };

  'paymentType': string;

  'cardExpiryMonth': number;
  'cardExpiryYear': number;
  'cardNumber': string;
}
