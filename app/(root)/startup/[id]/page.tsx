import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import markdownit from "markdown-it";
import {
  ArrowBigDown,
  CalendarArrowUp,
  RefreshCwOff,
  UserRound,
} from "lucide-react";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";

const md = markdownit();
export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });
  if (!post) return notFound();
  const parsedContent = md.render(post?.pitch || "");

  return (
    <>
      <section className="pink_container !min-h-[230px] ">
        <p className="flex gap-1 tag">
          <CalendarArrowUp />
          {formatDate(post?._createdAt)}
        </p>
        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>
      <section className="section_container">
        <img
          src={post.image}
          alt="startup_thumbnail"
          className="image_startup"
        />
        <div className="space-y-5 mt-10 max-w-5xl mx-auto">
          <div className="flex-between gap-5 bg-gray-500 p-2 rounded-lg border-2 border-teal-500 shadow-md shadow-teal-400">
            <Link
              href={`user/${post.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={post.author.image}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-md"
              />
              <div>
                <p className="flex text-24-black">
                  <UserRound className="size-5 mt-[5px]" />
                  {post.author.name}
                </p>
                <p className="text-16-medium !text-black-200">
                  @{post.author.username}
                </p>
              </div>
            </Link>
            <p className="category-tag">{post.category}</p>
          </div>
          <h3 className="flex text-30-bold !text-white">
            <ArrowBigDown className="text-white size-8 mt-2" />
            Pitch Details <ArrowBigDown className="text-white size-8 mt-2" />
          </h3>
          {parsedContent ? (
            <article
              className="prose prose-invert max-w-4xl font-work-sans break-all text-white"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="flex text-white font-semibold text-[30px]">
              <RefreshCwOff className="m-3" />
              No details provided
            </p>
          )}
        </div>
        <hr className="divider" />
        {/* TODO: recommeded or editor selected startups */}
        <Suspense fallback={<Skeleton className="view-skeleton" />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default page;
