import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div role="tabpanel" className='tabpanel' hidden={value !== index}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

interface TabsProps {
  tabNames: string[];
  tabComponents: React.ReactNode[];
}

const DynamicTabs: React.FC<TabsProps> = ({ tabNames, tabComponents }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <div>
      <Tabs value={activeTab} onChange={handleChangeTab}>
        {tabNames.map((name, index) => (
          <Tab key={index} label={name} />
        ))}
      </Tabs>
      {tabComponents.map((component, index) => (
        <TabPanel key={index} value={activeTab} index={index}>
          {component}
        </TabPanel>
      ))}
    </div>
  );
};

export default DynamicTabs;