import Slider from "rc-slider";

import "./RangeSlide.css";

type RangeSliderProps = {
  onChange: (value: number | number[]) => void;
  min: number;
  max: number;
  initialValues?: number[];
  allowCross?: boolean;
  leftLabel?: string;
  rightLabel?: string;
};

export default function RangeSlider({
  onChange,
  min,
  max,
  initialValues,
  leftLabel,
  rightLabel,
  allowCross = false,
}: RangeSliderProps) {
  return (
    <div>
      <div className=" flex justify-between items-center text-sm font-semibold w-full">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
      <div className="w-full">
        <Slider
          range
          min={min || 0}
          max={max || 100}
          defaultValue={initialValues || [min, max] || [0, 100]}
          onChange={onChange}
          className="my-1"
          allowCross={allowCross}
          styles={{
            track: { backgroundColor: "#3498DB" },
            rail: { backgroundColor: "#B7B9C3" },
            handle: {
              backgroundColor: "#3498DB",
              opacity: 1,
              width: 20,
              height: 20,
              border: 0,
              transform: "translate(-50%, -20%)",
            },
          }}
        />
      </div>
    </div>
  );
}
