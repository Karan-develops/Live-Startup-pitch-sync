"use client";

import { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { createPitch } from "@/lib/actions";

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      };
      await formSchema.parseAsync(formValues);
      // console.log(formValues);

      const result = await createPitch(prevState, formData, pitch);
      // console.log(result);
      if (result.status == "SUCCESS") {
        toast({
          title: "SUCCESS",
          description: "Startup pitch created Successfully!",
          style: {
            backgroundColor: "green",
            color: "white",
          },
        });
        router.push(`/startup/${result._id}`);
      }
      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fErrors = error.flatten().fieldErrors;
        setErrors(fErrors as unknown as Record<string, string>);
        toast({
          title: "Error",
          description: "Please check your inputs",
          variant: "destructive",
          style: {
            backgroundColor: "red",
            color: "white",
          },
        });
        return { ...prevState, error: "Validation Failed", status: "ERROR" };
      }
      toast({
        title: "Error",
        description: "An Unexpected Error Occured",
        variant: "destructive",
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
      return {
        ...prevState,
        error: "An Unexpected Error Occured",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction} className="startup-form">
      <div>
        <label htmlFor="title" className="startup-form_label ml-2">
          Title
        </label>
        <Input
          autoComplete="off"
          id="title"
          name="title"
          className="startup-form_input"
          required
          placeholder="Enter Startup Title"
        />
        {errors.title && <p className="startup-form_error">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="startup-form_label ml-2">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="startup-form_textarea"
          required
          placeholder="Startup Description"
        />
        {errors.description && (
          <p className="startup-form_error">{errors.description}</p>
        )}
      </div>
      <div>
        <label htmlFor="category" className="startup-form_label ml-2">
          Category
        </label>
        <Input
          autoComplete="off"
          id="category"
          name="category"
          className="startup-form_input"
          required
          placeholder="Startup Category (Education,sports,Tech...)"
        />
        {errors.category && (
          <p className="startup-form_error">{errors.category}</p>
        )}
      </div>
      <div>
        <label htmlFor="link" className="startup-form_label ml-2">
          Upload Image
        </label>
        <Input
          autoComplete="off"
          id="link"
          name="link"
          className="startup-form_input"
          required
          placeholder="Startup Image URL"
        />
        {errors.link && <p className="startup-form_error">{errors.link}</p>}
      </div>
      <div data-color-mode="light">
        <label htmlFor="pitch" className="startup-form_label ml-2">
          Pitch
        </label>
        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder: "Briefly decribe your idea and what problem it solves",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
          className="mt-2"
        />
        {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
      </div>
      <Button type="submit" className="startup-form_btn" disabled={isPending}>
        {isPending ? "Submitting Plz Wait" : `Submit your Pitch`}
        <Send className="!size-5" />
      </Button>
      <p className="text-20-medium text-center">
        *Note: New Startups you create may take 60 seconds to reflect on main
        page.
      </p>
    </form>
  );
};

export default StartupForm;
