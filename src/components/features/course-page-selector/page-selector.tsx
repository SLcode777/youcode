// components/pagination/PageSelector.tsx
"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

type PageSelectorProps = {
  currentPage: number;
  totalPages: number;
  courseName: string;
};

export default function PageSelector({
  currentPage,
  totalPages,
  courseName,
}: PageSelectorProps) {
  const router = useRouter();

  const handleValueChange = (value: string) => {
    router.push(`${courseName}?page=${value}`);
  };

  return (
    <Select value={currentPage.toString()} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[150px] bg-neutral-950">
        <SelectValue placeholder="Select a page" />
      </SelectTrigger>
      <SelectContent>
        {Array.from({ length: totalPages }).map((_, index) => (
          <SelectItem key={index} value={index.toString()}>
            Page {index + 1}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
