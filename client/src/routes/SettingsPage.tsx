import { Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface IContent {
  id: number;
  name: string;
}

const formSchema = z.object({
  name: z.string().min(1),
});

type formSchemaType = z.infer<typeof formSchema>;

const TagList = ({
  title,
  content,
  addFn,
  removeFn,
}: {
  title: string;
  content: IContent[];
  addFn: (name: string) => void;
  removeFn: (id: number) => void;
}) => {
  const { register, handleSubmit, resetField } = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmitTag = (formData: formSchemaType) => {
    resetField("name");
    addFn(formData.name);
  };

  return (
    <div className="bg-secondary drop-shadow-lg p-8 gap-4 rounded-xl flex flex-col items-center w-80">
      <h1 className="font-semibold text-xl">{title}</h1>
      <div className="w-full flex flex-col gap-2">
        {content.map((x) => {
          return (
            <div className="flex gap-2 w-full" key={x.id}>
              <Input value={x.name} readOnly />
              <button onClick={() => removeFn(x.id)}>
                <Trash2 />
              </button>
            </div>
          );
        })}
      </div>
      <form
        spellCheck="false"
        onSubmit={handleSubmit(onSubmitTag)}
        className="flex gap-2 mt-2"
      >
        <Input
          {...register("name")}
          placeholder="Lisää uusi *"
          autoComplete="off"
        />
        <button type="submit">
          <Plus />
        </button>
      </form>
    </div>
  );
};

export default () => {
  const [titles, setTitles] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [workplaces, setWorkplaces] = useState([]);

  const refreshPage = async () => {
    const response = await fetch("/api/settings").then((res) => res.json());

    setTitles(response.titles);
    setDepartments(response.departments);
    setWorkplaces(response.workplaces);
  };

  useEffect(() => {
    refreshPage();
  }, []);

  const addTag = async (endpoint: string, name: string) => {
    await fetch(`/api/settings/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    refreshPage();
  };

  const removeTag = async (endpoint: string, id: number) => {
    await fetch(`/api/settings/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    refreshPage();
  };

  return (
    <div className="w-full my-8 flex gap-16 justify-center">
      <TagList
        title="Tittelit"
        content={titles}
        addFn={(name: string) => addTag("addTitle", name)}
        removeFn={(id: number) => removeTag("removeTitle", id)}
      />
      <TagList
        title="Osastot"
        content={departments}
        addFn={(name: string) => addTag("addDepartment", name)}
        removeFn={(id: number) => removeTag("removeDepartment", id)}
      />
      <TagList
        title="Työpaikat"
        content={workplaces}
        addFn={(name: string) => addTag("addWorkplace", name)}
        removeFn={(id: number) => removeTag("removeWorkplace", id)}
      />
    </div>
  );
};
