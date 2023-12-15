import { Check, PenSquare, Trash2, XCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(1),
  password: z.string().min(1),
  email: z.string().email().min(5),
});

type formSchemaType = z.infer<typeof formSchema>;

export default ({
  dialogOpen,
  setDialogOpen,
  refreshPage,
}: {
  dialogOpen: boolean;
  setDialogOpen: (x: boolean) => void;
  refreshPage: any;
}) => {
  const { register, handleSubmit, setValue } = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (formData: formSchemaType) => {
    await fetch("/api/users/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    setDialogOpen(false);
    refreshPage();
  };

  useEffect(() => {
    // Clear form values when the dialog opens
    setValue("name", "");
    setValue("password", "");
    setValue("email", "");
  }, [dialogOpen, setValue]);

  return (
    <Dialog open={dialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Lisää käyttäjä</DialogTitle>
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

            <div className="flex gap-2 pt-4 w-full justify-end">
              <Button type="submit" className="w-min flex gap-2">
                <Check />
                <p>LISÄÄ KÄYTTÄJÄ</p>
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
