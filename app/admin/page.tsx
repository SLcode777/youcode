import { buttonVariants } from "@/components/ui/button";
import clsx from "clsx";
import Link from "next/link";

export default function AdminPage() {
  return (
    <>
      <div className="flex flex-row justify-between mb-2">
        <div className="text-xl font-extrabold place-self-end">Admin</div>
      </div>
      <hr className="mb-4" />
      <Link
        className={clsx(
          buttonVariants({
            variant: "default",
            size: "lg",
          }),
          " w-full"
        )}
        href="/admin/courses/
        "
      >
        VOIR LES COURS
      </Link>
    </>
  );
}
