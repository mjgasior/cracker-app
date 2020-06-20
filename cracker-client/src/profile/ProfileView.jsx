import React from "react";
import auth from "../+utils/Auth";

export const ProfileView = () => {
  const isAdmin = auth.isUserAdmin();
  return (
    <div>
      <h2>Profile</h2>
      <p>
        This is the environment build: <i>{process.env.NODE_ENV}</i>
      </p>
      <p>{process.env.REACT_APP_API_URL}</p>
      <p>{process.env.REACT_APP_AUTH0_ORIGIN}</p>
      <p>
        {isAdmin
          ? "You have admin rights. You can add markers."
          : "You don't have admin rights. Please ask for admin rights to add markers."}
      </p>
    </div>
  );
};
