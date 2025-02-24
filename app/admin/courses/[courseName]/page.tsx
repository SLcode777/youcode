export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  return <div>My Post: {slug}</div>;
}
