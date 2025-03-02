import { Progress } from "@prisma/client";
import { CheckCircle, Circle } from "lucide-react";

type LessonProgressIconProps = {
  progress: Progress;
};

export const LessonProgressIcon = ({ progress }: LessonProgressIconProps) => {
  switch (progress) {
    case Progress.NOT_STARTED:
      return (
        <Circle className="text-muted-foreground" size={16} />
      );
    case Progress.IN_PROGRESS:
      return <Circle className=" text-orange-500" size={16}/>;
    case Progress.COMPLETED:
      return <CheckCircle className="text-green-500" size={16}/>;
    default:
      return null;
  }
};
