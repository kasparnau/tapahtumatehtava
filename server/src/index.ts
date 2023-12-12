import express from "express";
import session from "express-session";
import { v4 as uuid } from "uuid";

const PORT = 8080;
const app = express();

app.use(express.json());

app.use(
  session({
    secret: "/2345UM24U3IO5623^@",
    cookie: {},
  })
);

declare module "express-session" {
  export interface SessionData {
    user: { [key: string]: any };
  }
}

const users = {
  admin: { password: "admin" },
};

app.get("/api/user", (req, res) => {
  res.send({ user: req.session.user });
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const user = users[username];

  if (!user) return res.sendStatus(403);
  if (user.password !== password) return res.sendStatus(403);

  req.session.user = { userId: 1, username };

  res.json({ user: req.session.user });
});

app.listen(PORT, () => {
  console.log("Started listening on port");
});
