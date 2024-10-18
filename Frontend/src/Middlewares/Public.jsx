import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";


const AdminPublic= ({ children }) => {
  const logged = localStorage.getItem("token");
  if (!logged) {
    return <>{children}</>;
  } else {
    return <Navigate to="/" />;
  }
};

export default AdminPublic;

AdminPublic.propTypes = {
    children: PropTypes.node.isRequired
}