import { FunctionComponent } from "react";
import { LucideProps } from "lucide-react";
import Card from "../Card";

interface InfoBarProps {
  text: string;
  icon: React.ComponentType<LucideProps>;
}

const InfoBar: FunctionComponent<InfoBarProps> = ({ text, icon: Icon }) => {
  return (
    <Card className="p-2 align-center flex items-center min-h-[36px] box-content">
      <div className="flex gap-2 text-[18px] w-full justify-center items-center relative font-bold h-full">
        {text && <Icon className="absolute left-0 top-[3px] w-[30px] h-auto" />}
        {text.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </div>
    </Card>
  );
};

export default InfoBar;
