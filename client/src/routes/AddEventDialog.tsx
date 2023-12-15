import { Check, PenSquare, Trash2, XCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.string(),
  time: z.string(),
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
    await fetch("/api/events/add", {
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
    setValue("title", "");
    setValue("description", "");
    setValue("date", "");
  }, [dialogOpen, setValue]);

  return (
    <Dialog open={dialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Lisää tapahtuma</DialogTitle>
          <form
            spellCheck="false"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col pt-8 space-y-4"
          >
            <div className="flex flex-col space-y-2">
              <Label htmlFor="title">Otsikko</Label>
              <Input
                {...register("title")}
                placeholder="Otsikko"
                autoComplete="off"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                {...register("description")}
                placeholder="Kuvaus"
                autoComplete="off"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="date">Päivämäärä</Label>
              <div className="flex flex-col border border-slate-300 rounded p-2">
                <input {...register("date")} type="date" />
                <input {...register("time")} type="time" />
              </div>
            </div>

            <div className="flex gap-2 pt-4 w-full justify-end">
              <Button type="submit" className="w-min flex gap-2">
                <Check />
                <p>LISÄÄ TAPAHTUMA</p>
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
