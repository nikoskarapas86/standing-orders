export class IbanUpdateRequest {
  'key': {
    id: number;
    versionNo: number;
  };

  'paymentType': string;

  'iban': string;
}
