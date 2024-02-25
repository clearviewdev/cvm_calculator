import { Link, useLocation } from "react-router-dom";
import routes from "../constants/routes";
import useAuthStore from "../store/authStore";

export default function NavBar() {
  const { isLoggedIn, logout } = useAuthStore((state) => state);
  const location = useLocation();
  const isPathLogin = location.pathname === routes.login;
  const isHome = location.pathname === routes.home;

  return (
    <nav className="flex flex-col lg:flex-row justify-between items-center mx-auto w-full px-4 lg:px-0 pt-5">
      <div className="flex items-center lg:mr-10">
        <img src="/logo-6.png" alt="Company Logo" style={{ height: "5rem" }} />
      </div>
      <div className="flex items-center lg:mx-10 mt-5 lg:mt-0">
        {!isPathLogin && (
          <Link
            to={
              isLoggedIn
                ? isHome
                  ? routes.setting
                  : routes.home
                : routes.login
            }
            onClick={isLoggedIn && !isHome ? logout : () => {}}
            className="btn btn-primary"
          >
            {isLoggedIn && !isHome ? "Logout" : "Admin Panel"}
          </Link>
        )}
      </div>
    </nav>
  );
}
