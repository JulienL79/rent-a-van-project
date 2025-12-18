export type HeaderVisibility = "ALL" | "AUTH" | "GUEST" | "ADMIN";

export interface IHeaderItemData {
  id: string;
  label: string;
  to?: string;
  visibility?: HeaderVisibility;
  dropdown?: IHeaderItemData[];
  action?: "SET_CAMPING_CAR" | "SET_VAN";
}
