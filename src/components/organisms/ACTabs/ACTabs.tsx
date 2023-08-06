import React, { useState, useCallback, useLayoutEffect } from "react";

import ACButton from "../../atoms/ACButton/ACButton";

import { ACTabsPropT } from "./Types";

import "./ACTabs.scss";

const ACTabs = ({
  tabs,
  style,
  defaultTab = false,
  headerButtonClassName,
  tabParams = false,
  onChange,
}: ACTabsPropT) => {
  const [activeTab, setActiveTab] = useState<number | string>(0);

  useLayoutEffect(() => {
    if (defaultTab) setActiveTab(defaultTab);
  }, [defaultTab]);

  const handleTabChange = useCallback((tabId: number | string) => {
    setActiveTab(tabId);

    if (tabParams)
      window.history.pushState(
        {},
        "",
        `${window.location.pathname}?${tabParams}=${tabId}`
      );
    onChange && onChange(tabId);
  }, []);

  return (
    <div role="ACTabs" style={style?.wrapper} className="ACTabs__wrapper">
      <div style={style?.header} className="ACTabs__header">
        {tabs.map((tab) => (
          <ACButton
            className={`${headerButtonClassName} ACTabs__header-button ${
              tab.id === activeTab ? "ACTabs__header-button--active" : ""
            }`}
            variant="text"
            key={tab.id}
            style={style?.headerLabel}
            onClick={() => handleTabChange(tab.id)}
          >
            {tab.label}
          </ACButton>
        ))}
      </div>
      <div style={style?.content} className="ACTabs__content">
        {tabs.map((tab) => {
          if (tab.id === activeTab)
            return <div key={tab.id}>{tab.content}</div>;
        })}
      </div>
    </div>
  );
};

export default ACTabs;
