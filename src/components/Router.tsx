import React from "react";
import { Route, Routes } from "react-router-dom";

import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";
import History from "../pages/History/History";
import Home from "../pages/Home/Home";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  );
};

export default Router;
