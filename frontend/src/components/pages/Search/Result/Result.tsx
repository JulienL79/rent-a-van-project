import { Card } from "../../../molecules/Card";
import type { IResultProps, IVehicleResult } from "./Result.props";
import { Link } from "react-router-dom";
import { Button } from "../../../atoms/Button";

export const Result: React.FC<IResultProps> = ({ data }) => {
  if (data) {
    return (
      <>
        <Link to={`/`} className="btn-link">
          <Button
            className="secondary-button inline-button back-button"
            content="Retour"
          />
        </Link>
        <div className="card-list">
          {data.length === 0 ? (
            <h2>Aucun véhicule trouvé</h2>
          ) : (
            (data as IVehicleResult[]).map((vehicle) => (
              <Card
                key={vehicle.id}
                type="result"
                data={vehicle}
                onSelect={() => {}}
              />
            ))
          )}
        </div>
      </>
    );
  }
};
