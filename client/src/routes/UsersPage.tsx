import { Check, PenSquare, Trash2, XCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";

import AddUserDialog from "./AddUserDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export interface IUser {
  id: number;
  name: string;
  password: string;
  email: string;
  titles: string[];
  workplaces: string[];
  departments: string[];
  role: string;
}

const formSchema = z.object({
  name: z.string().min(1),
  password: z.string().min(1),
  email: z.string().min(1),
});

type formSchemaType = z.infer<typeof formSchema>;

const ModifyDialog = ({
  dialogOpen,
  setDialogOpen,
  selectedUser,
  refreshPage,
}: {
  dialogOpen: boolean;
  setDialogOpen: (x: boolean) => void;
  selectedUser: IUser;
  refreshPage: any;
}) => {
  const { register, handleSubmit, setValue } = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (formData: formSchemaType) => {
    await fetch("/api/users/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, id: selectedUser.id }),
    });

    setDialogOpen(false);
    refreshPage();
  };

  useEffect(() => {
    if (selectedUser) {
      const { name, password, email } = selectedUser;

      setValue("name", name);
      setValue("password", password);
      setValue("email", email);
    }
  }, [selectedUser]);

  return (
    <Dialog open={dialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Muokkaa käyttäjää</DialogTitle>
          <form
            spellCheck="false"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col pt-8 space-y-4"
          >
            <div className="flex flex-col space-y-2">
              <Label htmlFor="name">Nimi</Label>
              <Input
                {...register("name")}
                placeholder="Nimi"
                autoComplete="off"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="email">Sähköposti</Label>
              <Input
                {...register("email")}
                placeholder="Sähköposti"
                autoComplete="off"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="password">Salasana</Label>
              <Input
                {...register("password")}
                placeholder="Salasana"
                autoComplete="off"
                type="password"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label>Titteli</Label>
              {selectedUser?.titles.map((title: string) => (
                <div
                  key={title}
                  className="bg-slate-200 py-1 px-2 rounded-full w-fit"
                >
                  {title}
                </div>
              ))}
            </div>
            <div className="flex flex-col space-y-2">
              <Label>Osasto</Label>
              {selectedUser?.departments.map((title: string) => (
                <div
                  key={title}
                  className="bg-slate-200 py-1 px-2 rounded-full w-fit"
                >
                  {title}
                </div>
              ))}
            </div>
            <div className="flex flex-col space-y-2">
              <Label>Työpaikka</Label>
              {selectedUser?.workplaces.map((title: string) => (
                <div
                  key={title}
                  className="bg-slate-200 py-1 px-2 rounded-full w-fit"
                >
                  {title}
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-4 w-full justify-end">
              <Button type="submit" className="w-min flex gap-2">
                <Check />
                <p>TALLENNA</p>
              </Button>
              <Button
                onClick={() => setDialogOpen(false)}
                className="w-min flex gap-2"
                variant="destructive"
              >
                <XCircle />
                <p>PERUUTA</p>
              </Button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default () => {
  const [users, setUsers] = useState([]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser>();

  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);

  const refreshPage = async () => {
    const newUsers = await fetch("/api/users").then((res) => res.json());
    setUsers(newUsers.users);
  };

  useEffect(() => {
    refreshPage();
  }, []);

  const onDeleteUser = async (id: number) => {
    await fetch("/api/users/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    refreshPage();
  };

  return (
    <div className="w-full p-8">
      <ModifyDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        selectedUser={selectedUser}
        refreshPage={refreshPage}
      />
      <AddUserDialog
        dialogOpen={addUserDialogOpen}
        setDialogOpen={setAddUserDialogOpen}
        refreshPage={refreshPage}
      />
      <Button onClick={() => setAddUserDialogOpen(true)} className="mb-4">
        LISÄÄ KÄYTTÄJÄ
      </Button>
      <table className="table-auto w-full border-separate border border-spacing-3">
        <thead className="border-b">
          <tr className="text-left">
            <th>Nimi</th>
            <th>Sähköposti</th>
            <th>Rooli</th>
            <th>Muokkaa</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: IUser) => {
            return (
              <tr key={user.id} className="[&>*]:border-t [&>*]:pt-2">
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className="flex gap-2 text-slate-600">
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setDialogOpen(true);
                    }}
                  >
                    <PenSquare size={20} />
                  </button>
                  <button onClick={() => onDeleteUser(user.id)}>
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
