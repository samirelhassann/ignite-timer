import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from "react";

import { differenceInSeconds } from "date-fns/esm";
import { v4 as uuidv4 } from "uuid";

const LOCAL_STORAGE_CYCLES_NAME = "@ignite-timer:cycles-state-1.0.0";

import {
  ActionTypes,
  addNewCycleAction,
  interrupCurrentCycleAction,
  markCurrentCycleAsFineshedAction,
} from "../reducers/cycles/actions";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";

interface CyclesStateType {
  cycles: Cycle[];
  activeCycleId: string | null;
}

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

interface CyclesContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrenctCycleAsFineshed: () => void;
  setSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: CreateCycleData) => void;
  interrupCurrentCycle: () => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

interface CyclesContextProviderProps {
  children: ReactNode;
}

const CyclesContextProvider = ({ children }: CyclesContextProviderProps) => {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    () => {
      const storedStateAsJSON = localStorage.getItem(LOCAL_STORAGE_CYCLES_NAME);

      if (storedStateAsJSON) {
        const recoveredCycles: CyclesStateType = JSON.parse(storedStateAsJSON);

        return {
          ...recoveredCycles,
          // FORMATING TO CORRECT VALUES WHEN READ FROM LOCAL STORAGE
          cycles: recoveredCycles.cycles.map((cycle) => {
            return {
              ...cycle,
              startDate: new Date(cycle.startDate),
              interruptedDate:
                cycle.interruptedDate && new Date(cycle.interruptedDate),
            };
          }),
        };
      } else
        return {
          cycles: [],
          activeCycleId: null,
        };
    }
  );

  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(() => {
    if (activeCycle)
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate));

    return 0;
  });

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState);

    localStorage.setItem(LOCAL_STORAGE_CYCLES_NAME, stateJSON);
  }, [cyclesState]);

  const setSecondsPassed = (seconds: number) => {
    setAmountSecondsPassed(seconds);
  };

  const markCurrenctCycleAsFineshed = () => {
    dispatch(markCurrentCycleAsFineshedAction());
  };

  const createNewCycle = (data: CreateCycleData) => {
    const id = uuidv4();

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    dispatch(addNewCycleAction(newCycle));

    setAmountSecondsPassed(0);
  };

  const interrupCurrentCycle = () => {
    dispatch(interrupCurrentCycleAction());
  };

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        markCurrenctCycleAsFineshed,
        setSecondsPassed,
        createNewCycle,
        interrupCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
};

export default CyclesContextProvider;
