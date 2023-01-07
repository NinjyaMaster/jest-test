import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AuthContext from "../contexts/AuthProvider";
import { Route, Routes, MemoryRouter } from "react-router-dom";
import TestUseParam from "./TestUseParam";

test("Should render the user Name when user is signed in", () => {
  const storeId = 7;

  let providerProps = {
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
  };

  render(
    <AuthContext.Provider value={providerProps}>
      <MemoryRouter initialEntries={[`/useparam/${storeId}`]}>
        <Routes>
          <Route path="/useparam/:storeId" element={<TestUseParam />} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  );

  // assertion
  expect(screen.getByText("7")).toBeInTheDocument();
});
