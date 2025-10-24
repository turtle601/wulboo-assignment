export abstract class APIError extends Error {
  abstract readonly errorType: string;
  abstract readonly statusCode: number;

  constructor(message: string) {
    super(message);
  }
}

export class HTTP401Error extends APIError {
  readonly errorType = 'HTTP_401_ERROR';
  readonly statusCode = 401;

  constructor(message?: string) {
    super(message || 'HTTP_401_ERROR');
  }
}

export class HTTP403Error extends APIError {
  readonly errorType = 'HTTP_403_ERROR';
  readonly statusCode = 403;

  constructor(message?: string) {
    super(message || 'HTTP_403_ERROR');
  }
}

export class HTTP409Error extends APIError {
  readonly errorType = 'HTTP_409_ERROR';
  readonly statusCode = 403;

  constructor(message?: string) {
    super(message || 'HTTP_409_ERROR');
  }
}

export class HTTP500Error extends APIError {
  readonly errorType = 'HTTP_500_ERROR';
  readonly statusCode = 500;

  constructor(message?: string) {
    super(message || 'HTTP_500_ERROR');
  }
}

export class HTTPEtcError extends APIError {
  readonly errorType = 'HTTP_ETC_ERROR';
  readonly statusCode: number;

  constructor(statusCode: number, message?: string) {
    super(message || 'HTTP_ETC_ERROR');
    this.statusCode = statusCode;
  }
}

export class UnExpectedAPIError extends APIError {
  readonly errorType = 'UNEXPECTED_API_ERROR';
  readonly statusCode = 0;

  public error: unknown;

  constructor({ error }: { error: unknown }) {
    super('UNEXPECTED_API_ERROR');
    this.error = error;
  }
}
