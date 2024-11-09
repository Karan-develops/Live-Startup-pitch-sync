import { cn, formatDate } from "@/lib/utils";
import {
  BadgeCheck,
  CalendarArrowUp,
  Eye,
  ListCollapse,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { Author, Startup } from "@/sanity/types";
import { Skeleton } from "./ui/skeleton";

export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author };

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  const {
    _createdAt,
    views,
    author,
    title,
    category,
    _id,
    image,
    description,
  } = post;

  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className=" flex gap-1 startup_card_date">
          <CalendarArrowUp /> {formatDate(_createdAt)}
        </p>
        <div className="flex gap-1.5 hover:text-red-700">
          <Eye className="size-6" />
          <span className="">{views}</span>
        </div>
      </div>

      <div className="flex-between mt-5 gap-5 bg-gray-300 p-2 rounded-xl">
        <div className="flex-1">
          <Link href={`/user/${author?._id}`}>
            <p className="flex text-16-medium line-clamp-1">
              <UserRound className="mr-1 size-5" />
              {author?.name}
              {author?.name === "Karan Aggarwal" && (
                <BadgeCheck className="ml-1 text-green-600 size-5 mt-[3px]" />
              )}
            </p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className="text-26-semibold line-clamp-1">{title}</h3>
          </Link>
        </div>
        <Link href={`/user/${author?._id}`}>
          <Image
            src={author?.image!}
            alt={author?.name!}
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>
      <Link href={`/startup/${_id}`}>
        <p className="startup-card_desc">{description}</p>
        <img src={image} alt="placeholder" className="startup-card_img" />
      </Link>

      <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="startup-card_btn">{category}</p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${_id}`}>
            {" "}
            <ListCollapse className="mt-[2px]" /> Details
          </Link>
        </Button>
      </div>
    </li>
  );
};

export const StartupCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={cn("skeleton", index)}>
        <Skeleton className="startup-card_skeleton" />
      </li>
    ))}
  </>
);

export default StartupCard;
