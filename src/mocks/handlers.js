// src/mocks/handlers.js
import { rest } from "msw";
import { LOGIN_URL } from "../constants/network";

export const handlers = [
  // Handles a POST /login request
  //rest.post("http://localhost:8000/api/1.0/users", null),
  rest.post(LOGIN_URL, (req, res, ctx) => {
    let requestBody = req.body;
    return res(
      ctx.status(200),
      ctx.json({
        requestBody,
      })
    );
  }),

  // Handles a GET /user request
  rest.get(LOGIN_URL, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        username: "sample_username",
      })
    );
  }),
];
