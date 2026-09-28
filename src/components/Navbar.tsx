import { Link, useNavigate } from "react-router-dom";
// (Stage E): read the auth state to know who's logged in
import { useAuth } from "../context/useAuth";

const linkStyle = { color: "#ffffff", textDecoration: "none" };

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  // (Stage E): clear the auth state ---> go back to the login page
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", backgroundColor: "#24292f", color: "#ffffff" }}>
      <Link to="/" style={{ color: "#ffffff", textDecoration: "none", fontWeight: "bold", fontSize: "18px" }}>
        CareerNet
      </Link>
      {/* (Stage E): logged in ---> Dashboard + Logout, logged out ---> Register + Login */}
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        {isAuthenticated ? (
          <>
            {user && <span style={{ color: "#8b949e" }}>{user.email}</span>}
            <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
            <button
              type="button"
              onClick={handleLogout}
              style={{ ...linkStyle, background: "none", border: "none", padding: 0, font: "inherit", cursor: "pointer" }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/register" style={linkStyle}>Register</Link>
            <Link to="/login" style={linkStyle}>Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;