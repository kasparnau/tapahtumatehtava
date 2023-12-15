import { useEffect, useState } from "react";

import AddEventDialog from "./AddEventDialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export interface IEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  participant_count: number;
}

export default () => {
  const [events, setEvents] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const refreshPage = async () => {
    const result = await fetch("/api/events").then((res) => res.json());
    setEvents(result.events);
  };

  useEffect(() => {
    refreshPage();
  }, []);

  const deleteEvent = async (id: number) => {
    console.log("here");
    await fetch("/api/events/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    refreshPage();
  };

  return (
    <div className="w-full p-8 flex flex-col gap-8">
      <AddEventDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        refreshPage={refreshPage}
      />
      <Button onClick={() => setDialogOpen(true)} className="mb-4 w-fit">
        LISÄÄ TAPAHTUMA
      </Button>
      <div className="flex flex-col gap-2">
        {events.map((event: IEvent) => {
          return (
            <div
              key={event.id}
              className="flex flex-col p-4 gap-6 border border-slate-400 rounded max-w-3xl"
            >
              <h1 className="font-semibold text-xl">{event.title}</h1>
              <h1 className="">{event.description}</h1>
              <h1 className="">Osallistujia: {event.participant_count}</h1>
              <h1 className="">
                {event.date} {event.time}
              </h1>
              <div className="w-full flex justify-end">
                <Button
                  variant="destructive"
                  className="w-fit gap-2 flex"
                  onClick={() => deleteEvent(event.id)}
                >
                  <Trash2 />
                  <h1>POISTA TAPAHTUMA</h1>
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
