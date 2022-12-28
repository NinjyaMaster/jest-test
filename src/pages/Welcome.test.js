//copied from https://stackoverflow.com/questions/56828017/testing-usecontext-with-react-testing-library

import React, { useContext } from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Welcome from "./welcome";
import userEvent from "@testing-library/user-event";
import AuthContext from "../contexts/AuthProvider";

// A custom provider, not the AuthProvider, to test it in isolation.
// This customRender will be a fake AuthProvider, one that I can controll to abstract of AuthProvider issues.

const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <AuthContext.Provider value={providerProps}>{ui}</AuthContext.Provider>,
    renderOptions
  );
};

describe("Testing Context Consumer", () => {
  let providerProps;
  beforeEach(
    () =>
      (providerProps = {
        auth: {
          email: "email@email.com",
          username: "username",
          accessToken: "accessToken",
          refreshToken: "refreshToken",
        },
        login: jest.fn(function (auth) {
          providerProps.auth = auth;
          providerProps.isLoggedin = true;
        }),
        logout: jest.fn(function () {
          providerProps.auth = null;
          providerProps.isLoggedin = false;
        }),
        isLoggedin: true,
      })
  );

  test("Should render the user Name when user is signed in", () => {
    customRender(<Welcome />, { providerProps });
    expect(screen.getByText(/Hello/i)).toHaveTextContent("Hello username");
  });

  test("Should render Hello Anonymous Goose when is NOT signed in", () => {
    providerProps.isLoggedin = false;
    providerProps.auth = null;
    customRender(<Welcome />, { providerProps });
    expect(screen.getByText(/Hello/i)).toHaveTextContent(
      "Hello Anonymous Goose"
    );
  });

  test("Should render Logout button when user is signed in", () => {
    customRender(<Welcome />, { providerProps });
    expect(screen.getByRole("button", { name: "logout" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "login" })).toBeNull();
  });

  test("Should render Login button when user is NOT signed in", () => {
    providerProps.isLoggedin = false;
    providerProps.auth = null;
    customRender(<Welcome />, { providerProps });
    expect(screen.getByRole("button", { name: "login" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "logout" })).toBeNull();
  });

  test("Should Logout when user is signed in", async () => {
    const user = userEvent.setup();
    const { rerender } = customRender(<Welcome />, { providerProps });
    const logout = screen.getByRole("button", { name: "logout" });
    expect(logout).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "login" })).toBeNull();
    await user.click(logout);
    expect(providerProps.logout).toHaveBeenCalledTimes(1);

    //Technically, re renders are responsability of the parent component, but since we are here...
    rerender(
      <AuthContext.Provider value={providerProps}>
        <Welcome />
      </AuthContext.Provider>
    );
    expect(screen.getByText(/Hello/i)).toHaveTextContent(
      "Hello Anonymous Goose"
    );
    expect(screen.getByRole("button", { name: "login" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "logout" })).toBeNull();
  });

  test("Should Login when user is NOT signed in", async () => {
    const user = userEvent.setup();
    providerProps.isLoggedin = false;
    providerProps.auth = null;
    const { rerender } = customRender(<Welcome />, { providerProps });
    const login = screen.getByRole("button", { name: "login" });
    expect(login).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "logout" })).toBeNull();
    await user.click(login);
    expect(providerProps.login).toHaveBeenCalledTimes(1);

    //Technically, re renders are responsability of the parent component, but since we are here...
    rerender(
      <AuthContext.Provider value={providerProps}>
        <Welcome />
      </AuthContext.Provider>
    );
    expect(screen.getByText(/Hello/i)).toHaveTextContent("Hello username");
    expect(screen.getByRole("button", { name: "logout" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "login" })).toBeNull();
  });
});
