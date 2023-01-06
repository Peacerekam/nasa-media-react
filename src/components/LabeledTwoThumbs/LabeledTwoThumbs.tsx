import * as React from "react";
import { Range, getTrackBackground } from "react-range";

const STEP = 1;
const MIN = 1920;
const MAX = 2030;

export const DEFAULT_YEAR_RANGE = [2010, 2020];

// shamelessly stolen from react-range example :)
// https://github.com/tajo/react-range/blob/master/examples/LabeledTwoThumbs.tsx

type LabeledTwoThumbsProps = {
  rtl?: boolean;
  handleChange: (values: number[]) => void;
};

export const LabeledTwoThumbs: React.FC<LabeledTwoThumbsProps> = ({
  rtl = false,
  handleChange,
}) => {
  const [values, setValues] = React.useState(DEFAULT_YEAR_RANGE);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <Range
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        rtl={rtl}
        onChange={(values) => {
          setValues(values);
          handleChange(values);
        }}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "36px",
              display: "flex",
              width: "100%",
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "5px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values,
                  colors: ["#ccc", "#548BF4", "#ccc"],
                  min: MIN,
                  max: MAX,
                  rtl,
                }),
                alignSelf: "center",
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ index, props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "42px",
              width: "42px",
              borderRadius: "4px",
              backgroundColor: "#FFF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 2px 6px #AAA",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: index === 0 ? "-28px" : "48px",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "14px",
                fontFamily: "Arial,Helvetica Neue,Helvetica,sans-serif",
                padding: "4px",
                borderRadius: "4px",
                backgroundColor: "#548BF4",
                width: "120px",
                textAlign: "center",
              }}
            >
              {
                {
                  0: `Start year: ${values[index]}`,
                  1: `End year: ${values[index]}`,
                }[index]
              }
              {}
            </div>
            <div
              style={{
                height: "16px",
                width: "5px",
                backgroundColor: isDragged ? "#548BF4" : "#CCC",
              }}
            />
          </div>
        )}
      />
    </div>
  );
};
