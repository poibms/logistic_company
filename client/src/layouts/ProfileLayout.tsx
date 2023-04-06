import * as React from "react";
import Header from "../components/common/Header/Header";
import ProfilePage from "../components/pages/ProfilePage";

const ProfileLayout: React.FC = () => {
  return (
    <>
      <Header />
      <ProfilePage />
    </>
  );
};

export default ProfileLayout;
