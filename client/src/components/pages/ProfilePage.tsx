import * as React from "react";
import PersonIcon from "@mui/icons-material/Person";
import { Container } from "@mui/system";
import { Box, Tabs, Tab } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CreateOrder from "../ui/CreateOrderForm/CreateOrder";

const ProfilePage = () => {
  const [value, setValue] = React.useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const currPath = location.pathname.split("profile/")[1];

  React.useEffect(() => {
    if (currPath === "create-order") {
      setValue(1);
    } else if (currPath === "orders") {
      setValue(2);
    } else {
      setValue(0);
    }
  }, [currPath]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const genItems = () => {
    if (value === 1) {
      return <CreateOrder/>
    }
  }

  const item = genItems();

  return (
    <div>
      <div className="profile_bg">
        <img
          src="https://resumekraft.com/wp-content/uploads/2021/08/logistics-linkedin-background-photo-2-1024x256.jpg"
          alt="profile img holder"
        />
      </div>
      <Container>
        <div className="profile_user">
          <div className="profile_user-img">
            <PersonIcon />
          </div>
        </div>
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            // centered
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Profile" onClick={() => navigate("/profile")} />
            <Tab
              label="Create order"
              onClick={() => navigate("/profile/create-order")}
            />
            <Tab
              label="Order's history"
              onClick={() => navigate("/profile/orders")}
            />
          </Tabs>
        </Box>
        {item}
      </Container>
    </div>
  );
};

export default ProfilePage;