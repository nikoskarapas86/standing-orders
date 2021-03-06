export class SearchItem {
  'lineOfBusiness': string;
  'policyNo': number;
  'agent': number;
  'endorsement': string;
  'newCollectionAgency': number;
  'oldCollectionAgency': number;
  'paymentType': string;
  'organization': number;
  'iban': string;
  'cardNumber': string;
  'cardExpiryMonth': string;
  'cardExpiryYear': string;
  'cardInstallments': string;
  'startDate': number[];
  'endDate': number[];
  'lastName': string;
  'firstName': string;
  'street': string;
  'city': string;
  'postalCode': string;
  'phoneNumber': number;
  'email': string;
  'vatNumber': string;
  'id': number;
  'bankAccount': string;
  'checkDigit': number;
  'recordStatus': string;
  'recordStatusDate': number[];
  'customerStatus': string;
  'customerStatusDate': number[];
  'policyStatus': string;
  'policyStatusDate': number[];
  'cardStatus': string;
  'cardStatusDate': number[];
  'standingOrderStatus': string;
  'standingOrderStatusDate': number[];
  'tokenOfCardNumber':string;
}

export class SearchResponse {
  searchId: string;
  standingOrderDTOList: SearchItem[];
}
