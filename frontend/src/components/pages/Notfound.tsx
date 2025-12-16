import { PageMeta } from "../atoms/PageMeta";

export const NotFound = () => {
  return (
    <div className="page">
      <PageMeta
        title="RentAVan - Page non trouvée"
        description="Oups ! La page que vous cherchez n'existe pas ou a été déplacée."
      />

      <h1>Page non trouvée</h1>
    </div>
  );
};
