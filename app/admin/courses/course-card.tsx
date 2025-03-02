import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/Typography";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Image from "next/image";
import Link from "next/link";

export default function CourseCard({
  courseTitle,
  courseLogo,
  courseAuthorAvatar,
  courseAuthorName,
  courseUrl,
}: {
  courseTitle: string;
  courseLogo: string;
  courseAuthorAvatar: string;
  courseAuthorName: string;
  courseUrl: string;
}) {
  return (
    <Card className="p-4 bg-secondary hover:shadow-xs hover:shadow-muted-foreground">
      <Link href={courseUrl}>
        <div className="flex flex-row gap-4 items-center ">
          <Avatar>
            <AvatarFallback>
              <div className="flex w-28 h-28 rounded-full bg-muted-foreground items-center justify-center text-xl font-bold">
                {courseTitle.charAt(0)}
              </div>
            </AvatarFallback>
            {courseLogo ? (
              <AvatarImage src={courseLogo} className="w-28 h-28"></AvatarImage>
            ) : null}
          </Avatar>
          {/* <Image
            src={courseLogo ? courseLogo : "/file.png"}
            alt="course-logo"
            width={64}
            height={64}
          /> */}
          <div className="flex flex-col gap-2">
            <Typography variant={"h3"}>{courseTitle}</Typography>
            <div className="flex flex-row gap-2 items-center">
              <Image
                src={courseAuthorAvatar}
                alt="author-avatar"
                width={32}
                height={32}
                className="rounded-full"
              />
              <div>{courseAuthorName}</div>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
}
