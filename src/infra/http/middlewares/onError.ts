import { ZodError } from "zod";
import { HTTP } from "~/shared/helpers";

function onError(error: Error) {
  if (error instanceof ZodError) {
    const issues = error.issues.map((issue: any) => ({
      expected: issue?.expected || "",
      received: issue?.received || "",
      path: issue.path,
    }));

    return HTTP(400, { message: error.issues[0].message, error: issues });
  }

  if (error instanceof Error) {
    return HTTP(500, error);
  }

  return HTTP(500, { message: "Internal Server Error" });
}

export { onError };
