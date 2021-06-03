export class InitialPaymentResponse {
  'paymentType': string;
  'iban': string;
  'tokenOfCardNumber': string;
  'cardExpiryMonth': number;
  'cardExpiryYear': number;
  'id': number;
  'versionNo': number;
  'bankAccount': string;
  'checkDigit': number;
  'organizationDescription': string;
  'lineOfBusiness': string;
  'lastName': string;
  'firstName': string;
  'address': string;
  'city': string;
  'postalCode': string;
  'phone': number;
  'vatNumber': string;
  'policyNo': number;
  'endorsement': string;
  'newCollectionAgency': number;
  'oldCollectionAgency': number;
  'email': string;
  'recordStatus': string;
  'recordStatusDate': number[];
  'customerStatus': string;
  'customerStatusDate': number[];
  'policyStatus': string;
  'policyStatusDate': number[];
  'cardStatus': string;
  'cardStatusDate': number[];
  'standingOrderStatus': string;
  'activeStandingOrder': boolean;
  'standingOrderStatusDate': number[];
  'startDate': number[];
  'endDate': number[];
}
