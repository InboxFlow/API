import { ZodError } from "zod";
import { HTTP } from "~/shared/helpers";

function onError(error: Error) {
  if (error instanceof ZodError) {
    return HTTP(400, { message: "Invalid Data", error: error.issues });
  }
  if (error instanceof Error) {
    return HTTP(500, error);
  }
  return HTTP(500, { message: "Internal Server Error" });
}

export { onError };
