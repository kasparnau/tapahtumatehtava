import { addUser, deleteUser, getAllUsers, updateUser } from "./sql";

export default (app) => {
  app.get("/api/users", async (req, res) => {
    const users = await getAllUsers();
    res.json({ users });
  });

  app.post("/api/users/update", async (req, res) => {
    const { id, name, email, password } = req.body;
    const result = await updateUser(id, name, email, password);
    res.json({ result });
  });

  app.post("/api/users/delete", async (req, res) => {
    const { id } = req.body;
    const result = await deleteUser(id);
    res.json({ result });
  });

  app.post("/api/users/add", async (req, res) => {
    const { name, email, password } = req.body;
    const result = await addUser(name, email, password);
    res.json({ result });
  });
};
