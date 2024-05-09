import { FunctionComponent } from "react";
import CardTitle from "./CardTitle";
import Card from "./Card";
import { LucideProps } from "lucide-react";
import { TableRow } from "@/types";

interface RoundTableProps {
  title: string;
  icon: React.ComponentType<LucideProps>;
  data?: any;
}

const RoundTable: FunctionComponent<RoundTableProps> = ({
  title,
  icon,
  data,
}) => {
  return (
    <div>
      <CardTitle text={title} icon={icon} />
      <Card className="bg-slate-600" gradient={false}>
        <div className="flex flex-col">
          <div className="flex justify-between font-bold border-b-2 p-2 items-center px-3">
            <div className="small_input !mb-0">No.</div>
            <div className="small_input !mb-0">Name</div>
            <div className="small_input !mb-0">Score</div>
          </div>

          {data &&
            data.map(({ name, points, isBot }: any, index: number) => (
              <div
                key={index}
                className={`flex px-3 py-2 justify-between text-[14px] even:bg-slate-800 ${
                  isBot ? "" : "is_user"
                }`}
              >
                <div className="font-medium min-w-[80px]">{index + 1}</div>
                <div className=""> {isBot ? name : "You"}</div>
                <div className="min-w-[80px] text-right">
                  {points === "-"
                    ? points
                    : parseFloat(points)
                        .toFixed(2)
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </div>
              </div>
            ))}
        </div>
      </Card>
    </div>
  );
};

export default RoundTable;
