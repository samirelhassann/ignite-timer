import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { HandPalm, Play } from "phosphor-react";
import * as zod from "zod";

import { CountDownButton, HomeContainer, StopButton } from "./Home.styles";

import CountDown from "./components/CountDown/CountDown";
import NewCycleForm from "./components/NewCycleForm/NewCycleForm";

import { CyclesContext } from "../../contexts/CyclesContexts";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Inform the task"),
  minutesAmount: zod.number().min(1).max(60),
});

export type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

const Home = () => {
  const { activeCycle, createNewCycle, interrupCurrentCycle } =
    useContext(CyclesContext);

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const { handleSubmit, reset } = newCycleForm;

  const handleCreateNewCycle = (data: NewCycleFormData) => {
    createNewCycle(data);
    reset();
  };

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <CountDown />
        {activeCycle ? (
          <StopButton type="button" onClick={interrupCurrentCycle}>
            <HandPalm size={24} />
            Stop
          </StopButton>
        ) : (
          <CountDownButton type="submit">
            <Play size={24} />
            Start
          </CountDownButton>
        )}
      </form>
    </HomeContainer>
  );
};

export default Home;
