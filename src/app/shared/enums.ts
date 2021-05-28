export enum Modal {
  COOKIE_INFO = 'COOKIE_INFO',
  PRINT_CONTRACT = 'PRINT_CONTRACT',
  ERROR_HANDLER = 'ERROR_HANDLER',
  CHECK_MASTERCARD_3DS = 'CHECK_MASTERCARD_3DS',
}

export enum WebpayPaymentStatus {
  APPROVED = 'APPROVED',
  DECLINED = 'DECLINED',
  PENDING = 'PENDING',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
}

export enum WebpayBranch {
  RIRE_ALON = 'RIRE_ALON',
  FIRE_ANELIXIS = 'FIRE_ANELIXIS',
  CAR = 'CAR',
  PERSONAL_ACCIDENT = 'PERSONAL_ACCIDENT',
  SHIP = 'SHIP',
  TRANSPORT = 'TRANSPORT',
  CIVIL_LIABILITY = 'CIVIL_LIABILITY',
  ENGINEERING_FAULT = 'ENGINEERING_FAULT',
  ANY_DANGER = 'ANY_DANGER',
  THEFT_TRUST = 'THEFT_TRUST',
  SHIP_CREW = 'SHIP_CREW',
}

export enum WebpayPaymentMethod {
  MASTERCARD = 'MASTERCARD',
  MASTERCARD_3DS = 'MASTERCARD_3DS',
  IRIS = 'IRIS',
}

export enum GoogleAnalytics {
  SEARCH_CRITERIA = 'SEARCH_CRITERIA',
  PAYMENT_OPTIONS = 'PAYMENT_OPTIONS',
  PAYMENT = 'PAYMENT',
  PAYMENT_IN_PROGRESS = 'PAYMENT_IN_PROGRESS',
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  PAYMENT_SUCCESS = 'PAYMENT_SUCCESS',
  COMPLETE = 'COMPLETE',
  SEND_EMAIL = 'SEND_EMAIL',
  SAVE_PDF = 'SAVE_PDF',
}

export enum ContractInfoEventState {
  INITIAL = 'INITIAL',
  FETCHED = 'FETCHED',
}

export enum StepperEventState {
  INITIAL = 'INITIAL',
  COMPLETE = 'COMPLETE',
}

export enum SpinnerEventState {
  INITIAL = 'INITIAL',
  LOADED = 'LOAD',
}

export enum Languages {
  GREEK = 'el',
  ENGLISH = 'en',
}

export enum CreditCardImage {
  FRONT_NAME = 'name',
  FRONT_DATE = 'date',
  FRONT_NUMBER = 'number',
  BACK = 'code',
}

export enum HostedFieldsSelectors {
  NUMBER = 'card.number',
  EXPIRY_YEAR = 'card.expiryYear',
  EXPIRY_MONTH = 'card.expiryMonth',
  SECURITY_CODE = 'card.securityCode',
  NAME_ON_CARD = 'card.nameOnCard',
}

export enum HostedFieldsIds {
  NUMBER = '#card-number',
  SECURITY_CODE = '#security-code',
  EXPIRY_MONTH = '#expiry-month',
  EXPIRY_YEAR = '#expiry-year',
  NAME_ON_CARD = '#cardholder-name',
}

export enum HostedSessionStatus {
  OK = 'ok',
  FIELDS_IN_ERROR = 'fields_in_error',
  REQUEST_TIMEOUT = 'request_timeout',
  SYSTEM_ERROR = 'system_error',
  INVALID = 'invalid',
  MISSING = 'missing',
}

export enum MatProgressSpinner {
  DETERMINATE = 'determinate',
  INDETERMINATE = 'indeterminate',
}

export enum MatSpinnerStatus {
  SUCCESS = 'success',
  WARNING = 'warning',
  IN_PROGRESS = 'inProgress',
  TOKEN_EXPIRED = 'sessionExpired',
  IN_REDIRECT = 'inRedirect',
}

export enum MatSpinnerAction {
  PAYMENT = 'Payment',
  SEND_EMAIL = 'SendEmail',
  SAVE_PDF = 'SavePdf',
}

export enum MatSpinnerStatusContent {
  SUCCESS_CONTENT = 'successContent',
  WARNING_CONTENT = 'warningContent',
  IN_PROGRESS_CONTENT = 'inProgressContent',
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

export enum SendEmailStatus {
  OK = 'OK',
  FAILURE = 'FAILURE',
}

export enum LocalStorageKeys {
  LANGUAGE = 'webpay-language',
  KIP = 'webpay-kip',
  INSTALLMENTS = 'webpay-installments',
}
