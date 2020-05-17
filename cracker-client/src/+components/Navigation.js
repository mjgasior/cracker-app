import React from "react";
import { Link } from "./Link";
import { withRouter } from "react-router-dom";
import auth from "../+utils/Auth";

const Navigation = () => {
  const logout = () => {
    auth.logout();
    this.props.history.replace("/");
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/books">Books</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
        {auth.isAuthenticated() && (
          <li>
            <Link to="/addbook">Add a book</Link>
          </li>
        )}
        <li>
          {auth.isAuthenticated() ? (
            <button onClick={() => logout()}>Log out</button>
          ) : (
            <button onClick={() => auth.login()}>Log In</button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default withRouter(Navigation);
