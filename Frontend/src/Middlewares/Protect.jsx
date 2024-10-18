import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const AdminProtect = ({ children }) => {
  const logged = localStorage.getItem("token");
  if (logged) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" />;
  }
};

export default AdminProtect;

AdminProtect.propTypes = {
  children: PropTypes.node.isRequired,
};
