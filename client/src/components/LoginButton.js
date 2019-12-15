import React from "react";
import { Link } from "react-router-dom";

class LoginButton extends React.Component {
  render() {
    return (
      <div className="buttonLogin">
        <Link className="linkButtonLogin" to="/login">
          Login
        </Link>
      </div>
    );
  }
}

export default LoginButton;
