import React, { useContext } from "react";
import { useFormContext } from "react-hook-form";

import {
  FormContainer,
  MinutesAmountInput,
  TaskInput,
} from "./NewCycleForm.styles";

import { CyclesContext } from "../../Home";

const NewCycleForm = () => {
  const { activeCycleId } = useContext(CyclesContext);

  const { register } = useFormContext();

  return (
    <FormContainer>
      <label htmlFor="task">I will work with</label>
      <TaskInput
        disabled={!!activeCycleId}
        id="task"
        placeholder="Give a name for your task"
        {...register("task")}
      />

      <label htmlFor="during">during</label>
      <MinutesAmountInput
        disabled={!!activeCycleId}
        type="number"
        id="during"
        {...register("minutesAmount", { valueAsNumber: true })}
        placeholder="00"
        // step={5}
      />

      <span>minutes</span>
    </FormContainer>
  );
};

export default NewCycleForm;
