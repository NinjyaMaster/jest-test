//copied from
//https://stackoverflow.com/questions/56828017/testing-usecontext-with-react-testing-library

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthProvider } from "./AuthProvider";
import AuthContext from "./AuthProvider";
import { useContext } from "react";

const CustomTest = () => {
  //const { logout, login, isLoggedin, user } = useContext(AuthContext);
  const { logout, login, isLoggedin, setAuth, auth } = useContext(AuthContext);

  return (
    <div>
      <div data-testid="isLoggedin">{JSON.stringify(isLoggedin)}</div>
      <div data-testid="email">{auth?.email}</div>
      <div data-testid="username">{auth?.username}</div>
      <div data-testid="accessToken">{auth?.accessToken}</div>
      <div data-testid="refreshToken">{auth?.refreshToken}</div>
      <button
        onClick={() =>
          login({
            email: "email@email.com",
            username: "username",
            accessToken: "accessToken",
            refreshToken: "refreshToken",
          })
        }
        aria-label="login"
      >
        Login
      </button>
      <button onClick={logout} aria-label="logout">
        LogOut
      </button>
    </div>
  );
};

test("Should render initial values", () => {
  render(
    <AuthProvider>
      <CustomTest />
    </AuthProvider>
  );

  expect(screen.getByTestId("isLoggedin")).toHaveTextContent("false");
  expect(screen.getByTestId("username")).not.toHaveValue();
});

test("Should Login", async () => {
  const user = userEvent.setup();
  render(
    <AuthProvider>
      <CustomTest />
    </AuthProvider>
  );
  const loginButton = screen.getByRole("button", { name: "login" });
  //fireEvent.click(loginButton);
  await user.click(loginButton);
  expect(screen.getByTestId("isLoggedin")).toHaveTextContent("true");
  expect(screen.getByTestId("username")).toHaveTextContent("username");
});

test("Should Logout", async () => {
  const user = userEvent.setup();
  render(
    <AuthProvider>
      <CustomTest />
    </AuthProvider>
  );
  const logoutButton = screen.getByRole("button", { name: "logout" });
  await user.click(logoutButton);
  expect(screen.getByTestId("isLoggedin")).toHaveTextContent("false");
  expect(screen.getByTestId("username")).not.toHaveValue();
});
