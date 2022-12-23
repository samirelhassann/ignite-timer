import React from "react";
import { NavLink } from "react-router-dom";

import { Scroll, Timer } from "phosphor-react";

import { HeaderContainer } from "./Header.styles";

import logoIgnite from "../../assets/logo-ignite.svg";

const Header = () => {
  return (
    <HeaderContainer>
      <img src={logoIgnite} alt="" />
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
};

export default Header;
