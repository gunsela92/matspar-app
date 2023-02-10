import React, {useState} from 'react';

const Tabs = (props) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const tabList = [ "Trendy foods", "Bread", "Milk", "Egg" ];

  const handleClick = (index) => {
    setActiveTabIndex(index); // set active tab index but just for this component
  }

  return (
    <div className={"tabsWrapper"}>
      {tabList.map((tab, index) => (
        <div onClick={() => handleClick(index)} key={index} className={`tab ${activeTabIndex === index ? "active" : ""}`}>
          {tab}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
