import React, { useCallback, useMemo, useState } from "react";
import classnames from "classnames";
import { Draw } from "./Draw";
import { Type } from "./Type";

const tabsConfig = [
  { id: "draw", title: "Draw" },
  { id: "type", title: "Type", component: Type },
];

const types = [
  { id: "1", title: "Signature-1" },
  { id: "2", title: "Signature-2" },
  { id: "3", title: "Signature-3" },
  { id: "4", title: "Signature-4" },
];

const colors = ["#000", "#3b82f6", "#4338ca"];

export const SignaturePad = ({
  containerClass,
  tabsContainerClass,
  tabClass,
  activeTabClass,
}) => {
  const [activeTabId, setActiveTabId] = useState(tabsConfig[0].id);

  const onTabClick = useCallback((id) => {
    setActiveTabId(id);
  }, []);

  const TabComponent = useMemo(
    () => tabsConfig.find(({ id }) => id === activeTabId).component,
    [activeTabId]
  );

  return (
    <div className={classnames(["flex flex-col w-full", containerClass])}>
      <div
        className={classnames(["flex w-full h-10 gap-3", tabsContainerClass])}
      >
        {tabsConfig.map(({ id, title }) => (
          <span
            className={classnames([
              "flex items-center justify-center py-2 px-4 rounded text-slate-500 font-bold cursor-pointer transition-all duration-75 ease-in",
              tabClass,
              activeTabId === id &&
                (activeTabClass ||
                  "!text-indigo-500 border-2 border-solid border-indigo-500"),
            ])}
            key={id}
            onClick={() => onTabClick(id)}
          >
            {title}
          </span>
        ))}
      </div>
      <Draw colors={colors} allowClear={activeTabId !== "draw"} />
      {TabComponent && <TabComponent types={types} />}
    </div>
  );
};
