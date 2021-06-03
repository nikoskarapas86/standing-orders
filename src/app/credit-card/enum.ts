export enum HostedFieldsSelectors {
  NUMBER = 'card.number',
  EXPIRY_YEAR = 'card.expiryYear',
  EXPIRY_MONTH = 'card.expiryMonth',
  NAME_ON_CARD = 'card.nameOnCard',
  SECURITY_CODE = 'card.securityCode',
}

export enum HostedFieldsIds {
  NUMBER = '#card-number',
  EXPIRY_MONTH = '#expiry-month',
  EXPIRY_YEAR = '#expiry-year',
  NAME_ON_CARD = '#cardholder-name',
  SECURITY_CODE = '#security-code',
}

export enum HostedSessionStatus {
  OK = 'ok',
  FIELDS_IN_ERROR = 'fields_in_error',
  REQUEST_TIMEOUT = 'request_timeout',
  SYSTEM_ERROR = 'system_error',
  INVALID = 'invalid',
  MISSING = 'missing',
}

/*
configure(): allows you to attach hosted fields to your payment page and/or configure the wallet interaction.
formSessionUpdate( ): invoked in response to the PaymentSession.updateSessionFromForm(paymentType)
onChange( ): Invoked when the input value in the hosted field in the iFrame has changed.
onFocus( ): Invoked when the hosted field in the iFrame has gained focus.
onBlur( ): Invoked when the hosted field in the iFrame has lost focus.
onMouseOver( ): Invoked when a mouse over event occurs in the hosted field.
onMouseOut( ): Invoked when a mouse out event occurs in the hosted field.
setFocus( ): Sets focus on the specified hosted field.
setFocusStyle( ): Sets the styling attributes for the specified hosted fields when the focus is gained.
setHoverStyle( ): Sets the styling attributes for the specified hosted fields when a mouse hover occurs.
 */
export enum HostedSessionCallbacks {
  configure = 'configure',
  updateSessionFromForm = 'updateSessionFromForm',
  onBlur = 'onBlur',
  onFocus = 'onFocus',
  onMouseOver = 'onMouseOver',
  onMouseOut = 'onMouseOut',
  setFocus = 'setFocus',
  setFocusStyle = 'setFocusStyle',
  setHoverStyle = 'setHoverStyle',
}

/*
card: You can capture the following card details via hosted fields:
  card.number
  card.expiryMonth
  card.expiryYear
  card.securityCode
  card.nameOnCard
gifCard: You can capture the following gift card details via hosted fields:
  giftCard.number
  giftCard.pin
ach : Automated Clearing House You can capture the following Automated Clearing House details via hosted fields:
  ach.routingNumber
  ach.bankAccountNumber
  ach.bankAccountHolder
  ach.accountType
 */
export enum HostedSessionPaymentType {
  CARD = 'card',
  GIFT_CARD = 'giftCard',
  ACH = 'ach',
}

export enum MastercardEnum {
  cardNumber = 'Αριθμός Κάρτας',
  cardHolderName = 'Όνοματεπώνυμο Δικαιούχου',
  cvv = 'CVV',
}

export enum Colors {
  blueHoverColor = '#024a86',
  redInvalid = '#e30303',
  blackValid = '#0000008a',
}
