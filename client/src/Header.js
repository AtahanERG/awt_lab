import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  useEffect(() => {
    //TODO: fetch
  }, [])
    return(
        <header>
        <Link to="/" className = "logo">AEGBlog</Link>
        <nav>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
      </header>
    )
}