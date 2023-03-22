import { Tab, Tabs } from "@mui/material";
import * as React from "react";

type FilterPropsType = {
  value: any;
  dataType: string;
  handleChange: any;
};

const AdminFilter: React.FC<FilterPropsType> = ({ dataType, handleChange, value }) => {
  

  const mockStatus = {orders: [
    { label: "Not Assigned", key: 'not_assigned' },
    { label: "In Progress", key: 'in_progress'  },
    { label: "Done",  key: 'done'},
  ],
  drivers: [
    { label: "Without Truck", key: 'null' },
    { label: "With Truck", key: 'truck' },
  ], 
  trucks: [
    { label: "test1", key: 'test1' },
    { label: "test 2", key: 'test2' },
  ]
};

  const genTabs = () => {
    switch (dataType) {
      case "orders":
        return mockStatus.orders.map((item) => <Tab key={item.key} label={item.label} />);
      case "drivers":
        return mockStatus.drivers.map((item) => <Tab key={item.key} label={item.label} />);
      case "trucks":
        return mockStatus.trucks.map((item) => <Tab key={item.key} label={item.label} />);
    }
  };

  const tabs = genTabs();

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
        <div className="adminfilter-inner">
          <button className="button">+</button>
        </div>
      </div>
    </div>
  );
};

export default AdminFilter;
