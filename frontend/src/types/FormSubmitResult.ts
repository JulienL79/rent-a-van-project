export type FormSubmitResult = {
  ok: boolean;
  errors?: { [key: string]: string[] };
  datas?: [];
};
