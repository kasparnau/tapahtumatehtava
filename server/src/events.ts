import {
  addEvent,
  addParticipant,
  deleteEvent,
  deleteParticipant,
  getAllEvents,
  getAllParticipants,
} from "./sql";

export default (app) => {
  app.get("/api/events", async (req, res) => {
    const events = await getAllEvents();
    res.json({ events });
  });

  app.post("/api/events/add", async (req, res) => {
    const { title, description, date, time } = req.body;
    const result = await addEvent(title, description, date, time);
    res.json({ result });
  });

  app.post("/api/events/delete", async (req, res) => {
    const { id } = req.body;

    const result = await deleteEvent(id);
    res.json({ result });
  });

  app.post("/api/participants/add", async (req, res) => {
    const { eventId, userId } = req.body;
    try {
      const result = await addParticipant(eventId, userId);
      res.json({ result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.get("/api/participants", async (req, res) => {
    const participants = await getAllParticipants();
    res.json({ participants });
  });

  app.post("/api/participants/delete", async (req, res) => {
    const { participantId } = req.body;
    const result = await deleteParticipant(participantId);
    res.json({ result });
  });
};
