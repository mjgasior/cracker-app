import React from "react";
import auth from "../+utils/Auth";

export const ProfileView = () => {
  const isAdmin = auth.isUserAdmin();
  const email = auth.getEmail();
  const isEmailVerified = auth.getIsEmailVerified();
  return (
    <div>
      <h2>Profile</h2>
      <p>
        Current build type: <i>{process.env.NODE_ENV}</i>
      </p>
      <p>Current API URL: {process.env.REACT_APP_API_URL}</p>
      <p>Current Auth0 origin: {process.env.REACT_APP_AUTH0_ORIGIN}</p>
      <p>
        {isAdmin
          ? "You have admin rights. You can add markers."
          : "You don't have admin rights. Please ask for admin rights to add markers."}
      </p>
      <p>
        Your email is {email} and it is {!isEmailVerified && "not "}verified.
      </p>
    </div>
  );
};
