import classnames from "classnames";
import React, { useCallback, useRef, useState } from "react";
import SignaturePad from "react-signature-pad-wrapper";

export const Draw = ({
  colors,
  padStyle,
  allowClear,
  placeholderText = "Sign here",
  onCanvasClear,
  onChangeColor,
  drawContainerClass,
  padWrapperClass,
  padOptions,
}) => {
  const [activeColor, setActiveColor] = useState(colors[0]);
  const ref = useRef();

  const onColorChange = useCallback(
    (color) => {
      setActiveColor(color);
      ref.current.penColor = color;
      onChangeColor?.();
    },
    [onChangeColor]
  );

  const clearCanvas = useCallback(() => {
    ref.current.clear();
    onCanvasClear?.();
  }, [onCanvasClear]);

  return (
    <div
      className={classnames([
        "flex flex-col gap-6 w-3/4 self-center my-16",
        drawContainerClass,
      ])}
    >
      <div className="flex w-full justify-end items-center gap-2">
        {colors.map((color) => (
          <div
            key={color}
            title={color}
            className={classnames([
              "relative w-6 h-6 rounded-full cursor-pointer transition-all duration-75 ease-in p-1 after:content-[''] after:absolute after:border-2 after:border-solid after:border-white after:rounded-full after:w-[26px] after:h-[26px] after:top-[-1px] after:left-[-1px]",
              activeColor === color &&
                "after:!w-5 after:!h-5 after:top-[2px] after:left-[2px]",
            ])}
            onClick={() => {
              onColorChange(color);
            }}
            style={{
              backgroundColor: color,
              borderColor: activeColor === color ? color : "none",
            }}
          />
        ))}
      </div>

      <div
        className={classnames([
          "flex border border-dashed border-slate-500 rounded-sm overflow-hidden",
          padWrapperClass,
        ])}
      >
        <SignaturePad
          ref={ref}
          options={{
            minWidth: 5,
            maxWidth: 10,
            penColor: activeColor,
            ...(padOptions || {}),
          }}
          redrawOnResize
          canvasProps={{
            style: { backgroundColor: "#e9e7e7", ...(padStyle || {}) },
          }}
        />
      </div>
      <span className={classnames(["text-slate-500 font-bold text-center"])}>
        {allowClear ? (
          <span
            className="cursor-pointer text-bold text-indigo-500"
            onClick={clearCanvas}
          >
            Clear Signature
          </span>
        ) : (
          placeholderText
        )}
      </span>
    </div>
  );
};
