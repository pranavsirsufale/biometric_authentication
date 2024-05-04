import React from "react";
import { NavLink } from "react-router-dom";

function Error() {
  return (
    <>
      <section id="error-page">
        <div className="content">
          <h2 className="header">404</h2>
          <h4> Sorry! Page not found</h4>
          <p>
            Oops! It seems like the page you're trying to access doesn't exist.
            If you believe theres' an issue, feel free to report it, and we'll
            look into it.
          </p>
          <div className="btns">
            <NavLink to="/"> REturn Home </NavLink>
            <NavLink to="contact"> Report Problem </NavLink>
          </div>
        </div>
      </section>
    </>
  );
}

export default Error;
