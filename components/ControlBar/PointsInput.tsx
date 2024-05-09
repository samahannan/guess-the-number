import { ArrowDown, ArrowUp } from "lucide-react";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Card from "../Card";
import { GlobalStateContext } from "../../app/page";
import { STEP_POINTS } from "@/lib/constants";

interface PointsPickerProps {
  onValueUpdate: (value: number) => void;
}

const PointsInput: FunctionComponent<PointsPickerProps> = ({
  onValueUpdate,
}) => {
  const { playerOne } = useContext(GlobalStateContext);

  if (!playerOne) {
    return;
  }

  const [value, setValue] = useState(playerOne.pointsPlaced);

  const handleInputChange = (e: any) => {
    const newValue = Number(e.target.value);
    if (!isNaN(newValue) && newValue >= 0 && newValue <= playerOne.points) {
      setValue(newValue);
    }
  };

  const handleUpClick = () => {
    setValue((prevValue) => {
      const currentValue = prevValue != null ? prevValue : 0;
      return Math.min(currentValue + STEP_POINTS, playerOne.points);
    });
  };

  const handleDownClick = () => {
    setValue((prevValue) => {
      const currentValue = prevValue != null ? prevValue : 0;
      return Math.max(currentValue - STEP_POINTS, 0);
    });
  };

  useEffect(() => {
    if (value) {
      onValueUpdate(value);
    }
  }, [value]);

  return (
    <Card className="py-1 px-2">
      <label className="small_input">Points</label>
      <div className="flex gap-2 items-center">
        <Button
          variant="secondary"
          size="sm"
          className="control_button"
          onChange={(e) => handleInputChange(e)}
          onClick={() => handleDownClick()}
        >
          <ArrowDown size={18} />
        </Button>
        <Input
          value={value}
          defaultValue={value}
          className="control_input"
          type="number"
          min="1"
          max={playerOne.points}
          step={25}
          onChange={handleInputChange}
        />
        <Button
          variant="secondary"
          size="sm"
          className="control_button"
          onClick={() => handleUpClick()}
        >
          <ArrowUp size={18} />
        </Button>
      </div>
    </Card>
  );
};

export default PointsInput;
