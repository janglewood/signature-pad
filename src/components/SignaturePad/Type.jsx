import classnames from "classnames";
import React, { useState } from "react";

export const Type = ({
  types,
  typesContainerClass,
  typeWrapperClass,
  typeClass,
}) => {
  const [activeTypeId, setActiveTypeId] = useState(types[0].id);

  return (
    <div
      className={classnames([
        "flex flex-wrap bg-slate-200 border border-solid border-slate-300",
        typesContainerClass,
      ])}
    >
      {types.map(({ id, title }) => (
        <div
          className={classnames([
            "flex items-center gap-2 cursor-pointer w-1/2 border border-solid border-slate-300 py-6 px-8",
            typeWrapperClass,
          ])}
          key={id}
          onClick={() => setActiveTypeId(id)}
        >
          <span className="flex items-center justify-center w-5 h-5 border border-solid border-slate-400 rounded-full ">
            <span
              className={classnames([
                "h-3.5 w-3.5 rounded-full opacity-0 bg-indigo-500 transition-all duration-100 ease-in",
                activeTypeId === id && "active opacity-100",
                typeClass,
              ])}
            />
          </span>
          <div className="font-bold font-xl">{title}</div>
        </div>
      ))}
    </div>
  );
};
