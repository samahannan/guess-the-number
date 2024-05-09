import { FunctionComponent } from "react";
import { LucideProps } from "lucide-react";

interface CardTitleProps {
  text: string;
  icon: React.ComponentType<LucideProps>;
}

const CardTitle: FunctionComponent<CardTitleProps> = ({ text, icon: Icon }) => {
  return (
    <h3 className="flex gap-2 text-[18px] w-full items-center relative font-bold h-full mb-2">
      <Icon size={24} className="w-[34px] h-auto" />
      {text}
    </h3>
  );
};

export default CardTitle;
