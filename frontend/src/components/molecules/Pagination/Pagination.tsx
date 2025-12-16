import React, { useEffect } from "react";
import type { IPaginationProps } from "./PaginationProps";
import "./Pagination.scss";
import { Button } from "../../atoms/Button";

export const Pagination: React.FC<IPaginationProps> = ({
  datas,
  paginatedNb,
  currentPage,
  setCurrentPage,
  setCurrentData,
}) => {
  // Calculer les index pour la pagination
  const totalPages = Math.ceil(datas.length / paginatedNb);
  const startIndex = (currentPage - 1) * paginatedNb;
  const endIndex = startIndex + paginatedNb;

  // Gérer les changements de page
  const goToFirstPage = () => {
    if (currentPage > 1) setCurrentPage(1);
  };
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const goToLastPage = () => {
    if (currentPage < totalPages) setCurrentPage(totalPages);
  };

  useEffect(() => {
    const currentData = datas.slice(startIndex, endIndex);
    setCurrentData(currentData);
  }, [currentPage, datas]);

  return (
    <div className="pagination-controls">
      <Button
        className="paginate-btn"
        content="1"
        onClick={goToFirstPage}
        isDisabled={currentPage === 1}
      />
      <Button
        className="paginate-btn"
        content={<i className="fa-solid fa-backward"></i>}
        onClick={goToPreviousPage}
        isDisabled={currentPage === 1}
      />
      <Button className="paginate-btn" content={currentPage} />
      <Button
        className="paginate-btn"
        content={<i className="fas fa-forward"></i>}
        onClick={goToNextPage}
        isDisabled={currentPage === totalPages}
      />
      <Button
        className="paginate-btn"
        content={totalPages}
        onClick={goToLastPage}
        isDisabled={currentPage === totalPages}
      />
    </div>
  );
};
