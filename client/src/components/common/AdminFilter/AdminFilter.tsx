import { Tab, Tabs } from "@mui/material";
import * as React from "react";

type FilterPropsType = {
  value: any;
  dataType: string;
  handleChange: any;
  handleOpenModal: any
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
      { label: "test1", key: "test1" },
      { label: "test 2", key: "test2" },
    ],
  };

  const genAddButton = () => {
    if (dataType === 'drivers') {

      return (<button className="button-68" onClick={handleOpenModal}>Add New Driver</button>)
    } else {
      return (<button className="button-68" onClick={handleOpenModal}>Add New Truck</button>)
    }
  }

  const genTabs = () => {
    switch (dataType) {
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
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="disabled tabs example"
          >
            {tabs}
          </Tabs>
        </div>
        {dataType !== "orders" ? (
          <div className="adminfilter-inner">
            {addButton}
          </div>
        ) : null}
      </div>

    </div>
  );
};

export default AdminFilter;
