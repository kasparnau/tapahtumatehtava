import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { IUser } from "./UsersPage";
import { Trash2 } from "lucide-react";

export interface IEvent {
  id: number;
  title: string;
  description: string;
  date: number;
}

const AddParticipantDropdown = ({
  users,
  addNewParticipant,
  events,
}: {
  users: IUser[];
  addNewParticipant: (a: number, b: number) => void;
  events: any;
}) => {
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");

  const onSubmit = () => {
    if (!selectedUser || !selectedEvent) return;

    addNewParticipant(Number(selectedUser), Number(selectedEvent));
  };

  return (
    <div className="flex gap-2">
      <Select onValueChange={setSelectedUser}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Valitse käyttäjä" />
        </SelectTrigger>
        <SelectContent>
          {users.map((user: IUser) => (
            <SelectItem key={user.id} value={user.id.toString()}>
              {user.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select onValueChange={setSelectedEvent}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Valitse tapahtuma" />
        </SelectTrigger>
        <SelectContent>
          {events.map((event: IEvent) => (
            <SelectItem key={event.id} value={event.id.toString()}>
              {event.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button onClick={onSubmit} className="mb-4 w-fit">
        LISÄÄ OSALLISTUJA
      </Button>
    </div>
  );
};

export interface IParticipant {
  id: number;
  event_id: number;
  user_id: number;
  user_name: string;
  event_title: string;
}

export default () => {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [participants, setParticipants] = useState([]);

  const refreshPage = async () => {
    const eventsResult = await fetch("/api/events").then((res) => res.json());
    const usersResult = await fetch("/api/users").then((res) => res.json());
    const participantsResult = await fetch("/api/participants").then((res) =>
      res.json()
    );

    setParticipants(participantsResult.participants);
    setUsers(usersResult.users);
    setEvents(eventsResult.events);
  };

  useEffect(() => {
    refreshPage();
  }, []);

  const addNewParticipant = async (userId: number, eventId: number) => {
    await fetch("/api/participants/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, eventId }),
    });

    refreshPage();
  };

  const deleteParticipant = async (participantId: number) => {
    await fetch("/api/participants/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ participantId }),
    });

    refreshPage();
  };

  return (
    <div className="w-full p-8 flex flex-col gap-8">
      <AddParticipantDropdown
        users={users}
        events={events}
        addNewParticipant={addNewParticipant}
      />
      <table className="table-auto w-full border-separate border border-spacing-3">
        <thead className="border-b">
          <tr className="text-left">
            <th>Käyttäjä</th>
            <th>Tapahtuma</th>
            <th>Poista</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((participant: IParticipant) => {
            return (
              <tr key={participant.id} className="[&>*]:border-t [&>*]:pt-2">
                <td>{participant.user_name}</td>
                <td>{participant.event_title}</td>
                <td className="flex gap-2 text-slate-600">
                  <button onClick={() => deleteParticipant(participant.id)}>
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
