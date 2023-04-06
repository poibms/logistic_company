import * as React from "react";
import PersonIcon from "@mui/icons-material/Person";
import { Container } from "@mui/system";
import { Box, Tabs, Tab } from "@mui/material";
import { useSearchParams } from "react-router-dom";

const ProfilePage = () => {
  const [value, setValue] = React.useState(0);
  const [queryParams, setQueryParams] = useSearchParams("");

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Profile" />
            <Tab label="Create order" />
            <Tab label="Order's history" />
          </Tabs>
        </Box>
      </Container>
    </div>
  );
};

export default ProfilePage;
