import {
  addDepartment,
  addTitle,
  addWorkplace,
  getDepartments,
  getTitles,
  getWorkplaces,
  removeDepartment,
  removeTitle,
  removeWorkplace,
} from "./sql";

export default (app) => {
  app.get("/api/settings", async (req, res) => {
    res.send({
      titles: await getTitles(),
      departments: await getDepartments(),
      workplaces: await getWorkplaces(),
    });
  });

  app.post("/api/settings/addTitle", async (req, res) => {
    const { name } = req.body;
    const result = await addTitle(name);
    res.json({ result });
  });

  app.post("/api/settings/removeTitle", async (req, res) => {
    const { id } = req.body;
    const result = await removeTitle(id);
    res.json({ result });
  });

  // Add Workplace
  app.post("/api/settings/addWorkplace", async (req, res) => {
    const { name } = req.body;
    const result = await addWorkplace(name);
    res.json({ result });
  });

  // Remove Workplace
  app.post("/api/settings/removeWorkplace", async (req, res) => {
    const { id } = req.body;
    const result = await removeWorkplace(id);
    res.json({ result });
  });

  // Add Department
  app.post("/api/settings/addDepartment", async (req, res) => {
    const { name } = req.body;
    const result = await addDepartment(name);
    res.json({ result });
  });

  // Remove Department
  app.post("/api/settings/removeDepartment", async (req, res) => {
    const { id } = req.body;
    const result = await removeDepartment(id);
    res.json({ result });
  });
};
