import type { ReactNode } from "react";
import { Link } from "react-router-dom";

export const TermsAndPrivacy: ReactNode = (
  <>
    J'accepte les{" "}
    <Link to="/terms" className="text-link">
      conditions d'utilisation
    </Link>{" "}
    et la{" "}
    <Link to="/privacy" className="text-link">
      politique de confidentialité
    </Link>
    .
  </>
);
