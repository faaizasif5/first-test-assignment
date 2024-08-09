import React, { useState } from "react";
import { Select, Dropdown, Menu, Checkbox, Button } from "antd";
import "./select.css";

const CustomSelect = () => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const options = ["Page 1", "Page 2", "Page 3", "Page 4"];

  const handleCheckAllChange = (e) => {
    setCheckAll(e.target.checked);
    setCheckedItems(e.target.checked ? options : []);
  };

  const handleOptionChange = (option) => {
    const newCheckedItems = checkedItems.includes(option)
      ? checkedItems.filter((item) => item !== option)
      : [...checkedItems, option];
    setCheckedItems(newCheckedItems);
    setCheckAll(newCheckedItems.length === options.length);
  };

  const handleDoneClick = () => {
    setDropdownOpen(false);
  };

  const menu = (
    <Menu>
      <Menu.Item key="selectAll">
        <div className="all-pages">
          <span>All Pages</span>
          <Checkbox checked={checkAll} onChange={handleCheckAllChange} />
        </div>
      </Menu.Item>
      <Menu.Divider className="menu-divider-1" />
      {options.map((option) => (
        <Menu.Item key={option} className="menu-item">
          <div className="menu-item-content-1">
            <span>{option}</span>
            <Checkbox
              checked={checkedItems.includes(option)}
              onChange={() => handleOptionChange(option)}
            />
          </div>
        </Menu.Item>
      ))}
      <Menu.Divider className="menu-divider-2" />
      <Menu.Item key="button">
        <Button
          className="menu-item-content-2"
          onClick={handleDoneClick}
        >
          Done
        </Button>
      </Menu.Item>
    </Menu>
  );

  const displaySelectedItems = () => {
    if (checkAll) {
      return "All Pages";
    }
    return checkedItems.length > 0 ? checkedItems.join(", ") : "Select items";
  };

  return (
    <div className="container">
      <div className="select">
        <Dropdown
          overlay={menu}
          trigger={["click"]}
          onVisibleChange={(visible) => setDropdownOpen(visible)}
          visible={dropdownOpen}
        >
          <Select
            open={false}
            suffixIcon={null}
            placeholder="Select items"
            value={displaySelectedItems()}
            style={{ width: 370, height: 40, padding: "10 0 10 0" }}
            readOnly
          />
        </Dropdown>
      </div>
    </div>
  );
};

export default CustomSelect;
