import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PatientsDashboard from "./Pages/Patients";
import SelectedPatient from "./Pages/SelectedPatient";
import LoginPage from "./Pages/LoginPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PatientsDashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/patient/:id" element={<SelectedPatient />} />
      </Routes>
    </Router>
  );
}
