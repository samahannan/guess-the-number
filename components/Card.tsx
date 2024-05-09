import { cn } from "@/lib/utils";
import { FunctionComponent } from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
}

const Card: FunctionComponent<CardProps> = ({
  children,
  className,
  gradient = true,
}) => {
  return (
    <div
      className={cn(
        `rounded-lg shadow-sm border border-[#333] ${
          gradient
            ? "bg-gradient-to-l from-[#252b38] hover:bg-gradient-to-r"
            : ""
        }`,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
