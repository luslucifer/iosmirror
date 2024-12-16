import { HttpStatus } from '@nestjs/common';

export class BaseError extends Error {
  public code: string;
  /**
   * @class BaseError
   * @constructor
   * @private
   * @param  {String} code Error code
   * @param  {String} message Error message
   */
  constructor(code: string, message: string) {
    super(`${code}: ${message}`);
    this.code = code;
  }
  toJSON() {
    return {
      code: this.code,
      message: this.message,
    };
  }
}

export class FatalError extends BaseError {
  /**
   * Fatal Error. Error code is `"EFATAL"`.
   * @class FatalError
   * @constructor
   * @param  {String|Error} data Error object or message
   */
  constructor(data: string | Error) {
    const error = typeof data === 'string' ? null : data;
    const message = error ? error.message : (data as string);
    super('EFATAL', message);
    if (error) this.stack = error.stack;
  }
}

// export class ParseError extends BaseError {
//   /**
//    * Error during parsing. Error code is `"EPARSE"`.
//    * @class ParseError
//    * @constructor
//    * @param  {String} message Error message
//    * @param  {http.IncomingMessage} response Server response
//    */
//   constructor(message: string, response) {
//     super('EPARSE', message);
//     this.response = response;
//   }
// };

export class ServiceError extends Error {
  public code: HttpStatus;

  constructor(code: HttpStatus, message: string) {
    super(message);
    this.code = code;
  }
}

export class NotFoundError extends Error {
  public code: HttpStatus;

  constructor(message: string) {
    super(message);
    this.code = HttpStatus.NOT_FOUND;
  }
}

