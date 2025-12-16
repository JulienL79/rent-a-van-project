import { PageMeta } from "../../atoms/PageMeta";
import { Aside } from "../../molecules/Aside";
import { useLocation, useParams } from "react-router-dom";
import type { ISearchMetaData } from "./Search.props";
import { searchMetaDatas } from "./SearchMetaData";
import { useEffect, useState } from "react";
import { type IVehicleResult, Result } from "./Result";
import "./Search.scss";
import { Vehicle } from "../../organisms/Vehicle";

export function Search() {
  const { state } = useLocation();
  const { page, id } = useParams();
  const [pageMetaData, setPageMetaData] = useState<ISearchMetaData>(
    searchMetaDatas.find((meta) => meta.page === (page || "results"))!,
  );
  const [filteredResults, setFilteredResults] = useState<IVehicleResult[]>(
    state?.results ?? [],
  );

  // Charger les métadonnées de la page en fonction du paramètre d'URL
  useEffect(() => {
    const metaData = searchMetaDatas.find((meta) => meta.page === page);

    if (metaData) {
      setPageMetaData(metaData);
    }
  }, [page]);

  // Filtrage des résultats à gérer ici
  useEffect(() => {
    if (state) {
      setFilteredResults(state.results ?? []);
    }
  }, [state]);

  return (
    <div className="page search-page">
      <PageMeta
        title={pageMetaData.title}
        description={pageMetaData.description}
      />

      <Aside page="results" />

      <section className="content">
        {page !== "vehicle" && <h1>{pageMetaData.titlePage}</h1>}
        {page === "results" && <Result data={filteredResults} />}
        {page === "vehicle" && id && (
          <Vehicle page="search" id={id} onInteract={() => {}} />
        )}
      </section>
    </div>
  );
}
