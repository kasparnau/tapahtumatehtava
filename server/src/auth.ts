declare module "express-session" {
  export interface SessionData {
    user: { [key: string]: any };
  }
}

const users = {
  admin: { password: "admin" },
};

export default (app) => {
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
};
