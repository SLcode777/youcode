import Image from "next/image";
import { getStudent } from "./student.query";

export default async function StudentPage(props: { params: { id: string } }) {
  const params = await props.params;

  console.log("🔍 ID récupéré depuis l'URL:", params.id);
  const student = await getStudent(params.id);
  console.log("🎯 Étudiant récupéré:", student?.name);

  if (!student) {
    return <p>no student page found</p>;
  }

  return (
    <div>
      <Image
        src={student.image ?? "/file.svg"}
        alt="user-avatar"
        width={64}
        height={64}
        className="rounded-full"
      />
      <div>{student.id}</div>
      <div>{student.name}</div>
      <div>{student.email}</div>
      <div>student accounts : {JSON.stringify(student.accounts)}</div>
      <div>student accounts : {JSON.stringify(student.CourseOnUser)}</div>
      <div>student accounts : {JSON.stringify(student.LessonOnUser)}</div>
    </div>
  );
}
