import userEvent from "@testing-library/user-event";
import Login from "./Login";
import { render, screen } from "../test-utils/testing-library-utils";

test("first test", async () => {
  const user = userEvent.setup();

  render(<Login />);
  const emailInput = screen.getByLabelText("email");
  expect(emailInput).toBeInTheDocument();
  expect(emailInput).not.toHaveValue();

  const passwordInput = screen.getByLabelText("password");
  expect(passwordInput).toBeInTheDocument();
  expect(passwordInput).not.toHaveValue();

  const loginButton = screen.getByRole("button", { name: "Sign In" });
  expect(loginButton).toBeInTheDocument();

  await userEvent.type(emailInput, "test");
  expect(emailInput).toHaveValue("test");

  await userEvent.type(passwordInput, "testPassword");
  expect(passwordInput).toHaveValue("testPassword");

  await user.click(loginButton);
  // Test jump to authorized page
});
