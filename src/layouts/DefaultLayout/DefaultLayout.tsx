import React from "react";
import { Outlet } from "react-router-dom";

import { LayoutContainer } from "./DefaultLayout.styles";

import Header from "../../components/Header/Header";

const DefaultLayout = () => {
  return (
    <LayoutContainer>
      <Header />
      <Outlet />
    </LayoutContainer>
  );
};

export default DefaultLayout;
