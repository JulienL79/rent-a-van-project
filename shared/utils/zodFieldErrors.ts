import z from "zod";

export const zodFieldErrors = (error: z.ZodError): Record<string, string[]> => {
  return error.issues.reduce<Record<string, string[]>>((acc, issue) => {
    const key = issue.path.join(".");
    acc[key] ??= [];
    acc[key].push(issue.message);
    return acc;
  }, {});
};
