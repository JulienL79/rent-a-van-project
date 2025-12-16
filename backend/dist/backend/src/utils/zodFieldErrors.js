export const zodFieldErrors = (error) => {
  return error.issues.reduce((acc, issue) => {
    const key = issue.path.join(".");
    acc[key] ??= [];
    acc[key].push(issue.message);
    return acc;
  }, {});
};
