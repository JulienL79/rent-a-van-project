import React, { useEffect, useState } from "react";
import "./DataTable.scss"; // Tu peux intégrer ce CSS dans ton fichier global si tu préfères
import type { IDataTableAdmin } from "./DataTable.props";
import { Button } from "../../atoms/Button";
import { formatShortDateFr } from "../../../utils/DateConverter";
import { Modal } from "../../organisms/Modal";

export const DataTable: React.FC<IDataTableAdmin> = ({
  pageData,
  onSelect,
  onDelete,
}) => {
  const { datas, columns } = pageData;
  const [idGoingToBeDelete, setIdGoingToBeDelete] = useState<string | null>(
    null,
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    // Nettoyage
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="table-container">
        <table className="styled-table">
          <thead>
            <tr>
              {columns.length > 0 &&
                columns.map((value) => <th key={value}>{value}</th>)}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {datas.length === 0 ? (
              <tr className="no-data-table">
                <td
                  colSpan={columns.length + 1}
                  style={{ textAlign: "center" }}
                >
                  Aucune donnée disponible.
                </td>
              </tr>
            ) : (
              datas.map((item, index) => (
                <tr key={index} onClick={() => onSelect(item.id)}>
                  {Object.entries(item).map(([key, value], i) => (
                    <td key={i} title={String(value)}>
                      {key.toLowerCase().includes("id")
                        ? String(value).slice(0, 8)
                        : value instanceof Date
                          ? formatShortDateFr(value)
                          : value}
                    </td>
                  ))}
                  <td className="actions">
                    {/* <Button className="secondary-button" content="M" onClick={(e) => {
                                    if (e) e.stopPropagation();
                                    onUpdate(item.id);
                                }}
                                /> */}
                    <Button
                      className="danger-button"
                      content={isMobile ? "Supp" : "Supprimer"}
                      onClick={(e) => {
                        if (e) e.stopPropagation();
                        setIdGoingToBeDelete(item.id);
                      }}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {idGoingToBeDelete && (
        <Modal
          onClose={() => setIdGoingToBeDelete(null)}
          onConfirm={() => {
            const id = idGoingToBeDelete;
            setIdGoingToBeDelete(null);
            onDelete(id);
          }}
          modalType="confirm"
        />
      )}
    </>
  );
};
