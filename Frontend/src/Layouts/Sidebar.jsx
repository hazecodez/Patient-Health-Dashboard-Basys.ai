import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { MdLowPriority } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar, isActive }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`fixed inset-0 bg-[#f0eee4] text-gray-600 shadow-lg w-64 p-6 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } xl:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
    >
      {/* Close button for sidebar */}
      <button
        className="absolute top-4 right-4 xl:hidden"
        onClick={toggleSidebar}
      >
        <FaTimes className="w-6 h-6 text-gray-600  shadow-lg rounded-full hover:text-black transition-colors duration-500" />
      </button>
      <ul className="space-y-6 mt-10">
        <hr />
        <li
          onClick={() => navigate("/")}
          className={`flex gap-6 cursor-pointer ${
            isActive("/") ? "bg-gray-200 text-black" : ""
          } hover:bg-gray-200 p-2 rounded-md hover:text-black transition-colors duration-500`}
        >
          <FaPerson  className="text-2xl " />
          <a className="block ">Patients</a>
        </li>
        <hr />

        <li
          onClick={() => navigate("/request_lists")}
          className={`flex gap-6 cursor-pointer ${
            isActive("/request_lists") ? "bg-gray-200 text-black" : ""
          } hover:bg-gray-200 p-2 rounded-md hover:text-black transition-colors duration-500`}
        >
          <MdLowPriority   className="text-2xl " />
          <a className="block ">Prior Requests</a>
        </li>
        <hr />
        
        
      </ul>
    </div>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  isActive: PropTypes.func.isRequired,
};

export default Sidebar;
