import { auth } from "@/auth";
import StartupForm from "@/components/StartupForm";
import { FolderPlus, ImagePlus } from "lucide-react";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();
  if (!session) redirect("/");
  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <h1 className="flex heading">
          <FolderPlus className="size-10 mt-3 mr-2"/>
          Submit Your Startup
          <ImagePlus className="size-10 mt-3 ml-2" />
        </h1>
      </section>
      <StartupForm />
    </>
  );
};

export default page;
