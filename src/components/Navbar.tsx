
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const linkStyle = {
  color: "#ffffff",
  textDecoration: "none",
};

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 24px",
        backgroundColor: "#24292f",
        color: "#ffffff",
      }}
    >
      <Link
        to="/"
        style={{
          color: "#ffffff",
          textDecoration: "none",
          fontWeight: "bold",
          fontSize: "18px",
        }}
      >
        CareerNet
      </Link>

      <div
        style={{
          display: "flex",
          gap: "16px",
          alignItems: "center",
        }}
      >
        {isAuthenticated ? (
          <>
            {user && (
              <span style={{ color: "#8b949e" }}>
                {user.email}
              </span>
            )}

            <Link to="/dashboard" style={linkStyle}>
              Dashboard
            </Link>

            <Link to="/profile" style={linkStyle}>
              My Profile
            </Link>

            {/* DA-1: Job Listing */}
            <Link to="/jobs" style={linkStyle}>
              Find Jobs
            </Link>

            {/* DA-4: My Applications */}
            <Link to="/applications" style={linkStyle}>
              My Applications
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              style={{
                ...linkStyle,
                background: "none",
                border: "none",
                padding: 0,
                font: "inherit",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/register" style={linkStyle}>
              Register
            </Link>

            <Link to="/login" style={linkStyle}>
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
