import * as React from "react";
import { Tab, Tabs } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

type FilterPropsType = {
  value: any;
  dataType: URLSearchParams;
  handleChange: any;
  handleOpenModal: any;
};

const AdminFilter: React.FC<FilterPropsType> = ({
  dataType,
  handleChange,
  value,
  handleOpenModal,
}) => {
  const mockStatus = {
    orders: [
      { label: "Not Assigned", key: "not_assigned" },
      { label: "In Progress", key: "in_progress" },
      { label: "Done", key: "done" },
    ],
    drivers: [
      { label: "Without Truck", key: "null" },
      { label: "With Truck", key: "truck" },
    ],
    trucks: [
      { label: "Without driver", key: "no driver" },
      { label: "Assigned Trucks", key: "with driver" },
    ],
  };

  const genAddButton = () => {
    if (dataType.get("filter") === "drivers") {
      return (
        <button className="button-68" onClick={handleOpenModal}>
          <PersonAddIcon className="button_icon" />
          Add New Driver
        </button>
      );
    } else {
      return (
        <button className="button-68" onClick={handleOpenModal}>
          <LocalShippingIcon className="button_icon" />
          Add New Truck
        </button>
      );
    }
  };

  const genTabs = () => {
    switch (dataType.get("filter")) {
      case "orders":
        return mockStatus.orders.map((item) => (
          <Tab key={item.key} label={item.label} />
        ));
      case "drivers":
        return mockStatus.drivers.map((item) => (
          <Tab key={item.key} label={item.label} />
        ));
      case "trucks":
        return mockStatus.trucks.map((item) => (
          <Tab key={item.key} label={item.label} />
        ));
    }
  };

  const tabs = genTabs();
  const addButton = genAddButton();

  return (
    <div className="adminfilter">
      <div className="adminfilter_wrapper flex justify-between align_center">
        <div className="adminfilter-inner flex align_center">
          <h2>Status</h2>
          <div className="adminfilter-inner_tabs">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="disabled tabs example"
              variant="scrollable"
              scrollButtons="auto"
            >
              {tabs}
            </Tabs>
          </div>
        </div>
        {dataType.get("filter") !== "orders" ? (
          <div className="adminfilter-inner">{addButton}</div>
        ) : null}
      </div>
    </div>
  );
};

export default AdminFilter;
