import React from "react";
import { Link } from "react-router-dom";

class HomeButton extends React.Component {
  render() {
    return (
      <div className="buttonHome">
        <Link className="linkButtonHome" to="/"></Link>
      </div>
    );
  }
}

export default HomeButton;
