import { Route, Routes } from "react-router-dom";
import { PrivateAuthRoute } from "./PrivateAuthRoute";
import { PrivateNonAuthRoute } from "./PrivateNonAuthRoute";
import { Home } from "../components/pages/Home";
import { NotFound } from "../components/pages/Notfound";
import { Register } from "../components/pages/Register";
import { Login } from "../components/pages/Login";
import { Privacy } from "../components/pages/Privacy";
import { Terms } from "../components/pages/Terms";
import { Legal } from "../components/pages/Legal";
import { Contact } from "../components/pages/Contact";
import { Logout } from "../components/pages/Logout";
import { Profile } from "../components/pages/Profile";
import { PrivateAdminRoute } from "./PrivateAdminRoute";
import { Admin } from "../components/pages/Admin";
import { Search } from "../components/pages/Search";

export const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Home />
          </>
        }
      />

      {/* ======================= ELEMENTS LIES A LA RECHERCHE ======================= */}

      <Route path="/search/:page/:id" element={<Search />} />

      <Route path="/search/:page" element={<Search />} />

      {/* ======================= ELEMENTS LIES AUX ROUTES AUTH ======================= */}

      <Route element={<PrivateNonAuthRoute />}>
        <Route
          path="/login"
          element={
            <>
              <Login />
            </>
          }
        />
      </Route>

      <Route element={<PrivateAuthRoute />}>
        <Route
          path="/logout"
          element={
            <>
              <Logout />
            </>
          }
        />
      </Route>

      <Route element={<PrivateNonAuthRoute />}>
        <Route
          path="/register"
          element={
            <>
              <Register />
            </>
          }
        />
      </Route>

      {/* ======================= ELEMENTS LIES A L'ESPACE PROFIL ======================= */}

      <Route element={<PrivateAuthRoute />}>
        <Route
          path="/profile/:page/:id"
          element={
            <>
              <Profile />
            </>
          }
        />
      </Route>

      <Route element={<PrivateAuthRoute />}>
        <Route
          path="/profile/:page"
          element={
            <>
              <Profile />
            </>
          }
        />
      </Route>

      {/* ======================= ELEMENTS LIES A L'ESPACE ADMIN ======================= */}

      <Route element={<PrivateAdminRoute />}>
        <Route
          path="/admin/:page/:id"
          element={
            <>
              <Admin />
            </>
          }
        />
      </Route>

      <Route element={<PrivateAdminRoute />}>
        <Route
          path="/admin/:page"
          element={
            <>
              <Admin />
            </>
          }
        />
      </Route>

      {/* ======================= ELEMENTS ANNEXES ======================= */}

      <Route
        path="/privacy"
        element={
          <>
            <Privacy />
          </>
        }
      />

      <Route
        path="/terms"
        element={
          <>
            <Terms />
          </>
        }
      />

      <Route
        path="/legal"
        element={
          <>
            <Legal />
          </>
        }
      />

      <Route
        path="/contact"
        element={
          <>
            <Contact />
          </>
        }
      />

      <Route
        path="*"
        element={
          <>
            <NotFound />
          </>
        }
      />
    </Routes>
  );
};
