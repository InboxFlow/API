import { ZodError } from "zod";

import { HTTP } from "~/shared/helpers";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  PaymentError,
  UnauthorizedError,
} from "~/shared/exceptions";

function onError(error: Error) {
  if (error instanceof ZodError) {
    const issues = error.issues.map((issue: any) => ({
      expected: issue?.expected || "",
      received: issue?.received || "",
      path: issue.path,
    }));

    return HTTP(400, { message: error.issues[0].message, error: issues });
  }

  if (error instanceof BadRequestError) {
    return HTTP(error.statusCode, { message: error.message });
  }

  if (error instanceof UnauthorizedError) {
    return HTTP(error.statusCode, { message: error.message });
  }

  if (error instanceof PaymentError) {
    return HTTP(error.statusCode, { message: error.message });
  }

  if (error instanceof ForbiddenError) {
    return HTTP(error.statusCode, { message: error.message });
  }

  if (error instanceof NotFoundError) {
    return HTTP(error.statusCode, { message: error.message });
  }

  return HTTP(500, { message: "Internal Server Error" });
}

export { onError };
