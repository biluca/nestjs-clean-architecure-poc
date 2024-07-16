import { Response } from 'express';
import { GenericError } from './error.generic';
import { GenericLogger } from './logger.generic';

export class GenericController {
  logger = new GenericLogger();

  resolveResponse(res: Response, result: Promise<any>, statusCode = 200): any {
    result
      .then((response) => {
        if (statusCode > 299 && statusCode < 400) {
          return res.redirect(statusCode, response);
        }
        return res.status(statusCode).json(response);
      })
      .catch((error: GenericError) => {
        return res.status(500).json(error);
      });
  }
}
