import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import SelectedPatient from "./Pages/SelectedPatient";
import LoginPage from "./Pages/LoginPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/patient/:id" element={<SelectedPatient />} />
      </Routes>
    </Router>
  );
}
