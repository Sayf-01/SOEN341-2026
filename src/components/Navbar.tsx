import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", backgroundColor: "#24292f", color: "#ffffff" }}>
      <Link to="/" style={{ color: "#ffffff", textDecoration: "none", fontWeight: "bold", fontSize: "18px" }}>
        CareerNet
      </Link>
      <div style={{ display: "flex", gap: "16px" }}>
        <Link to="/register" style={{ color: "#ffffff", textDecoration: "none" }}>Register</Link>
        <Link to="/login" style={{ color: "#ffffff", textDecoration: "none" }}>Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;