interface IData {
  _id: string;
  date: string;
  numbers: number[];
  bonus: number[];
  __v: number;
}

export interface IPaginationProps {
  datas: [];
  paginatedNb: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  setCurrentData: (data: IData[]) => void;
}
