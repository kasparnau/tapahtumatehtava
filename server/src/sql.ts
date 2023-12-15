import { Pool } from "pg";

const client = new Pool({
  host: "localhost",
  port: 5432,
  database: "eventmanager",
  user: "postgres",
  password: "pass",
});

// events

export const getAllEvents = async () => {
  const result = await client.query(`
    SELECT events.*, COUNT(participants.event_id) AS participant_count
    FROM events
    LEFT JOIN participants ON events.id = participants.event_id
    GROUP BY events.id
  `);

  return result.rows;
};

export const deleteEvent = async (eventId: number) => {
  const res = await client.query("DELETE FROM events WHERE id = $1", [eventId]);
  return res;
};

export const addEvent = async (
  title: string,
  description: string,
  date: string,
  time: string
) => {
  const res = await client.query(
    "INSERT INTO events(title, description, date, time) VALUES($1, $2, $3, $4)",
    [title, description, date, time]
  );
  return res;
};

export const addParticipant = async (event_id: string, user_id: string) => {
  const res = await client.query(
    "INSERT INTO participants(event_id, user_id) VALUES($1, $2)",
    [event_id, user_id]
  );
  return res;
};

export const getAllParticipants = async () => {
  const result = await client.query(`
    SELECT
    participants.*,
    users.name AS user_name,
    events.title AS event_title
    FROM participants
    INNER JOIN users ON participants.user_id = users.id
    INNER JOIN events ON participants.event_id = events.id
  `);

  return result.rows;
};

export const deleteParticipant = async (participantId: string) => {
  const res = await client.query("DELETE FROM participants WHERE id = $1", [
    participantId,
  ]);
  return res;
};

// user

export const getUser = async (email: string) => {
  const res = await client.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  return res.rows[0];
};

export const getAllUsers = async () => {
  const res = await client.query("SELECT * FROM users");

  return res.rows;
};

export const updateUser = async (
  userId: string,
  name: string,
  email: string,
  password: string
) => {
  const res = await client.query(
    "UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4",
    [name, email, password, userId]
  );
  return res;
};

export const deleteUser = async (id: number) => {
  const res = await client.query("DELETE FROM users WHERE id = $1", [id]);
  return res;
};

export const addUser = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await client.query(
    "INSERT INTO users(name, email, password) VALUES($1, $2, $3)",
    [name, email, password]
  );
  return res;
};

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

export const addWorkplace = async (name: string) => {
  const res = await client.query("INSERT INTO workplaces(name) VALUES($1)", [
    name,
  ]);
  return res;
};

export const removeWorkplace = async (id: number) => {
  const res = await client.query("DELETE FROM workplaces WHERE id = $1", [id]);
  return res;
};

export const addDepartment = async (name: string) => {
  const res = await client.query("INSERT INTO departments(name) VALUES($1)", [
    name,
  ]);
  return res;
};

export const removeDepartment = async (id: number) => {
  const res = await client.query("DELETE FROM departments WHERE id = $1", [id]);
  return res;
};
