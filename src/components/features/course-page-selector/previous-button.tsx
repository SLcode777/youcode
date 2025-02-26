// components/pagination/PreviousButton.tsx
import { Button, buttonVariants } from "@/components/ui/button";
import clsx from "clsx";
import Link from "next/link";

type PreviousButtonProps = {
  currentPage: number;
  courseName: string;
};

export default function PreviousButton({
  currentPage,
  courseName,
}: PreviousButtonProps) {
  if (currentPage <= 0) {
    return (
      <Button
        variant={"outline"}
        disabled
        className="cursor-not-allowed "
        size={"default"}
      >
        Préc.
      </Button>
    );
  }

  return (
    <Link
      href={`/admin/courses/${courseName}?page=${currentPage - 1}`}
      className={clsx(
        buttonVariants({
          variant: "outline",
          size: "default",
        })
      )}
    >
      Previous
    </Link>
  );
}
