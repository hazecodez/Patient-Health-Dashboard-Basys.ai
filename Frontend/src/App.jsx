import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PatientsDashboard from "./Pages/Patients";
import SelectedPatient from "./Pages/SelectedPatient";
import LoginPage from "./Pages/LoginPage";
import AdminProtect from "./Middlewares/Protect";
import AdminPublic from "./Middlewares/Public";
import RequestList from "./Pages/RequestList";
import AuthorizationForm from "./Pages/AuthorizationForm";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <AdminProtect>
              {" "}
              <PatientsDashboard />
            </AdminProtect>
          }
        />
        <Route
          path="/login"
          element={
            <AdminPublic>
              <LoginPage />
            </AdminPublic>
          }
        />
        <Route
          path="/patient/:id"
          element={
            <AdminProtect>
              <SelectedPatient />
            </AdminProtect>
          }
        />
        <Route
          path="/request_lists"
          element={
            <AdminProtect>
              <RequestList />
            </AdminProtect>
          }
        />
        <Route
          path="/request/:id"
          element={
            <AdminProtect>
              <AuthorizationForm />
            </AdminProtect>
          }
        />
      </Routes>
    </Router>
  );
}
