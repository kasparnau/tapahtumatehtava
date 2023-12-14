import { Pool } from "pg";

const client = new Pool({
  host: "localhost",
  port: 5432,
  database: "eventmanager",
  user: "postgres",
  password: "pass",
});

// events

export const getEvents = async () => {
  const res = await client.query("SELECT * FROM events");

  return res.rows;
};

// settings

export const getTitles = async () => {
  const res = await client.query("SELECT * FROM titles");

  return res.rows;
};

export const getDepartments = async () => {
  const res = await client.query("SELECT * FROM departments");

  return res.rows;
};

export const getWorkplaces = async () => {
  const res = await client.query("SELECT * FROM workplaces");

  return res.rows;
};

export const addTitle = async (name: string) => {
  const res = await client.query("INSERT INTO titles(name) VALUES($1)", [name]);
  return res;
};

export const removeTitle = async (id: number) => {
  const res = await client.query("DELETE FROM titles WHERE id = $1", [id]);
  return res;
};

// Add Workplace
export const addWorkplace = async (name: string) => {
  const res = await client.query("INSERT INTO workplaces(name) VALUES($1)", [
    name,
  ]);
  return res;
};

// Remove Workplace
export const removeWorkplace = async (id: number) => {
  const res = await client.query("DELETE FROM workplaces WHERE id = $1", [id]);
  return res;
};

// Add Department
export const addDepartment = async (name: string) => {
  const res = await client.query("INSERT INTO departments(name) VALUES($1)", [
    name,
  ]);
  return res;
};

// Remove Department
export const removeDepartment = async (id: number) => {
  const res = await client.query("DELETE FROM departments WHERE id = $1", [id]);
  return res;
};
