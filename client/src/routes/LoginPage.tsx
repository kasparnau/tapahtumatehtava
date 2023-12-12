import * as z from "zod";

import { Navigate, redirect } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useMainStore } from "@/zustand";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

type formSchemaType = z.infer<typeof formSchema>;

export default () => {
  const { user, setUser } = useMainStore();

  const { register, handleSubmit } = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (formData: formSchemaType) => {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      setUser(data.user);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      {user && <Navigate to="/" />}
      <form
        spellCheck="false"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-96 gap-4 p-8 bg-secondary rounded-md"
      >
        <h1 className="w-full font-bold text-xl text-center mb-8">
          EventManager
        </h1>
        <Input
          {...register("username")}
          placeholder="Nimi *"
          autoComplete="off"
        />
        <Input
          {...register("password")}
          placeholder="Salasana *"
          autoComplete="off"
          type="password"
        />
        <Button type="submit">Kirjaudu sisään</Button>
      </form>
    </div>
  );
};
