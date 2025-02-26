// components/pagination/NextButton.tsx
import { Button, buttonVariants } from "@/components/ui/button";
import clsx from "clsx";
import Link from "next/link";

type NextButtonProps = {
  currentPage: number;
  totalPages: number;
  courseName: string;
};

export default function NextButton({
  currentPage,
  totalPages,
  courseName,
}: NextButtonProps) {
  if (currentPage >= totalPages - 1) {
    return (
      <Button
        variant={"outline"}
        disabled
        className="cursor-not-allowed "
        size={"default"}
      >
        Next
      </Button>
    );
  }

  return (
    <Link
      href={`/admin/courses/${courseName}?page=${currentPage + 1}`}
      className={clsx(
        buttonVariants({
          variant: "outline",
          size: "default",
        })
       
      )}
    >
      Next
    </Link>
  );
}
