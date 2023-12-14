import express from "express";
import { getEvents } from "./sql";
import session from "express-session";
import setupAuth from "./auth";
import setupSettings from "./settings";

const PORT = 8080;
const app = express();

app.use(express.json());

app.use(
  session({
    secret: "/2345UM24U3IO5623^@",
    cookie: {},
    resave: false,
    saveUninitialized: false,
  })
);

app.listen(PORT, () => {
  // api endpoints
  setupAuth(app);
  setupSettings(app);

  // sql test
  getEvents();
  console.log("Started listening on ports");
});
