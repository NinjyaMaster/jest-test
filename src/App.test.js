//import { render, screen } from '@testing-library/react';
import { render, screen } from "./test-utils/testing-library-utils";
import App from "./App";
import userEvent from "@testing-library/user-event";

test("renders learn react link", async () => {
  render(<App />);
  const user = userEvent.setup();
  const welcomeLink = screen.getByLabelText(/welcome/i);
  expect(welcomeLink).toBeInTheDocument();

  const LoginLink = screen.getByLabelText(/login/i);
  expect(LoginLink).toBeInTheDocument();

  await user.click(welcomeLink);
  expect(screen.getByText(/Hello/i)).toBeInTheDocument();
});
