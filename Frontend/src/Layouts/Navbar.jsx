import PropTypes from "prop-types";
import { FaBarsStaggered } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Navbar = ({ toggleSidebar, isOpen }) => {
  const navigate = useNavigate()
  const logout = () =>{
    localStorage.removeItem("token");
    toast.success("logout successfully")
    navigate("/login")
  }
  return (
    <nav className="bg-[#f0eee4] p-4 flex justify-between items-center">
      <div className="text-black text-2xl font-bold xl:pl-72">Patients Dashboard</div>
      <div className="hidden xl:flex space-x-4">
        <LuLogOut onClick={logout} className="text-4xl cursor-pointer text-gray-600 hover:text-black transition-colors duration-500  " />
      </div>
      {/* Hamburger menu for smaller screens */}
      {!isOpen && (
        <div
          className="xl:hidden text-gray-600 hover:text-black transition-colors duration-500 cursor-pointer"
          onClick={toggleSidebar}
        >
          <FaBarsStaggered className="w-6 h-6" />
        </div>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default Navbar;
