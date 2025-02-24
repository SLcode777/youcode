import prisma from "@/lib/prisma";
import Image from "next/image";

interface CoursePageProps {
  params: {
    name: string;
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const courseName = params.name;
  const course = await prisma.course.findFirst({
    where: {
      name: courseName,
    },
  });

  console.log(course);
  return (
    <>
      <div className="flex flex-row gap-4 mb-2">
        <Image
          src={course?.logo ?? "/file.svg"}
          alt="course logo"
          width={24}
          height={24}
        ></Image>
        <div className="text-xl font-extrabold ">{course?.name}</div>
      </div>
      <hr className="mb-4" />
    </>
  );
}
