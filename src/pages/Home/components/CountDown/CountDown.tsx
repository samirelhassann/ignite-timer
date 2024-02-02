import React, { useContext, useEffect } from "react";

import { differenceInSeconds } from "date-fns";

import { CountDownContainer, Separator } from "./CountDown.styles";

import { CyclesContext } from "../../../../contexts/CyclesContexts";

const CountDown = () => {
  const {
    activeCycle,
    amountSecondsPassed,
    markCurrenctCycleAsFineshed,
    setSecondsPassed,
  } = useContext(CyclesContext);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  useEffect(() => {
    let interval: NodeJS.Timer;


    if (activeCycle)
      interval = setInterval(() => {
        const passedSeconds = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        );

        if (passedSeconds > totalSeconds) {
          markCurrenctCycleAsFineshed();

          clearInterval(Number(interval));
        } else {
          setSecondsPassed(passedSeconds);
        }
      }, 1000);

    return () => {
      clearInterval(Number(interval));
    };
  }, [activeCycle, markCurrenctCycleAsFineshed]);

  useEffect(() => {
    if (activeCycle) document.title = `${minutes}:${seconds}`;
  }, [minutes, seconds]);

  return (
    <CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDownContainer>
  );
};

export default CountDown;
