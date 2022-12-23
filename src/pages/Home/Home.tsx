import React from "react";

import { Play } from "phosphor-react";

import {
  CountDownButton,
  CountDownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInout,
  Separator,
  TaskInput,
} from "./Home.styles";

const Home = () => {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">I will work with</label>
          <TaskInput id="task" placeholder="Give a name for your task" />

          <label htmlFor="during">during</label>
          <MinutesAmountInout type="number" id="during" placeholder="00" />

          <span>minutes</span>
        </FormContainer>

        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <CountDownButton type="submit">
          <Play size={24} />
          Start
        </CountDownButton>
      </form>
    </HomeContainer>
  );
};

export default Home;
