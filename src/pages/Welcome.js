//copied from https://stackoverflow.com/questions/56828017/testing-usecontext-with-react-testing-library

import React, { useContext } from "react";
import AuthContext from "../contexts/AuthProvider";

const Welcome = () => {
  const { logout, login, isLoggedin, auth } = useContext(AuthContext);

  return (
    <div>
      {auth && <div>Hello {auth?.username}</div>}
      {!auth && <div>Hello Anonymous Goose</div>}
      {!isLoggedin && (
        <button
          aria-label="login"
          onClick={() =>
            login({
              email: "email@email.com",
              username: "username",
              accessToken: "accessToken",
              refreshToken: "refreshToken",
            })
          }
        >
          Log In
        </button>
      )}
      {isLoggedin && (
        <button aria-label="logout" onClick={() => logout()}>
          Log out
        </button>
      )}
    </div>
  );
};

export default Welcome;
