import { ArrowDown, ArrowUp } from "lucide-react";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Card from "../Card";
import { GlobalStateContext } from "../../app/page";
import { MAX_MULTIPLIER, STEP_MULTIPLIER } from "@/lib/constants";

interface MultiplierInputProps {
  onValueUpdate: (value: number) => void;
}

const MultiplierInput: FunctionComponent<MultiplierInputProps> = ({
  onValueUpdate,
}) => {
  const { playerOne } = useContext(GlobalStateContext);

  const [value, setValue] = useState(playerOne?.multiplier);

  const handleInputChange = (e: any) => {
    const newValue = Number(e.target.value);
    if (!isNaN(newValue) && newValue >= 0 && newValue <= MAX_MULTIPLIER) {
      setValue(newValue);
    }
  };

  const handleUpClick = () => {
    setValue(
      (prevValue) =>
        prevValue && Math.min(prevValue + STEP_MULTIPLIER, MAX_MULTIPLIER)
    );
  };

  const handleDownClick = () => {
    setValue(
      (prevValue) => prevValue && Math.max(prevValue - STEP_MULTIPLIER, 0)
    );
  };

  useEffect(() => {
    if (value) {
      onValueUpdate(value);
    }
  }, [value]);

  if (!playerOne) {
    return;
  }

  return (
    <Card className="py-1 px-2">
      <label className="small_input">Multiplier</label>
      <div className="flex gap-2 items-center">
        <Button
          variant="secondary"
          size="sm"
          className="control_button"
          onClick={() => handleDownClick()}
        >
          <ArrowDown size={18} />
        </Button>
        <Input
          value={value}
          defaultValue={value}
          className="control_input"
          type="number"
          min={1}
          max={MAX_MULTIPLIER}
          step={0.25}
          onChangeCapture={handleInputChange}
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

export default MultiplierInput;
