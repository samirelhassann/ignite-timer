import React, { createContext, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { HandPalm, Play } from "phosphor-react";
import { v4 as uuidv4 } from "uuid";
import * as zod from "zod";

import { CountDownButton, HomeContainer, StopButton } from "./Home.styles";

import CountDown from "./components/CountDown/CountDown";
import NewCycleForm from "./components/NewCycleForm/NewCycleForm";

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  completed?: boolean;
}

interface CyclesContextType {
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrenctCycleAsFineshed: () => void;
  setSecondsPassed: (seconds: number) => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Inform the task"),
  minutesAmount: zod.number().min(1).max(60),
});

export type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

const Home = () => {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0);

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const { handleSubmit, reset } = newCycleForm;

  const setSecondsPassed = (seconds: number) => {
    setAmountSecondsPassed(seconds);
  };

  const markCurrenctCycleAsFineshed = () => {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, completed: true };
        } else {
          return cycle;
        }
      })
    );
  };

  const handleCreateNewCycle = (data: NewCycleFormData) => {
    const id = uuidv4();

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(id);

    setAmountSecondsPassed(0);

    reset();
  };

  const handleStopTimer = () => {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );

    setActiveCycleId(null);
  };

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            amountSecondsPassed,
            markCurrenctCycleAsFineshed,
            setSecondsPassed,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>

          <CountDown />
        </CyclesContext.Provider>
        {activeCycle ? (
          <StopButton type="button" onClick={handleStopTimer}>
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
