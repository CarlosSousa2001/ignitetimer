import { Play } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountDownButton,
  TaskInput,
} from "./styles";
import { useEffect, useState } from "react";

import { differenceInSeconds } from "date-fns";

const newCycleFormValidationSchema = z.object({
  task: z.string().min(1, "Informe a tarefa"),
  minutosAmount: z.number().min(5).max(60, "Máxino 60 minutos"),
});

type newCycleFormValidationData = z.infer<typeof newCycleFormValidationSchema>;

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<String | null>(null);
  const [amountSecondPassed, setAmountSecondsPassed] = useState(0);

  const { register, handleSubmit, watch, reset } =
    useForm<newCycleFormValidationData>({
      resolver: zodResolver(newCycleFormValidationSchema),
      defaultValues: {
        task: "",
        minutosAmount: 0,
      },
    });

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  useEffect(() => {
    let interval: number;
    if (activeCycle) {
      interval = setInterval(() => {
        setAmountSecondsPassed(
          differenceInSeconds(new Date(), activeCycle.startDate)
        );
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeCycle]);

  function handleCreateNewCycle(data: newCycleFormValidationData) {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutosAmount,
      startDate: new Date(),
    };

    setCycles((state) => [...state, newCycle]);

    setActiveCycleId(id);

    setAmountSecondsPassed(0);

    reset();
  }

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  // total de segundos econtrado pelo find ali no cycle menos quando segundos se passaram
  const currentSeconds = activeCycle ? totalSeconds - amountSecondPassed : 0;

  const minutosAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutos = String(minutosAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  useEffect(()=>{
    if(activeCycle){
      document.title = `${minutos}:${seconds}`
    }
  },[minutos, seconds, activeCycle])

  const task = watch("task");
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            type="text"
            placeholder="Dê um nome para o seu projeto"
            list="task-suggestions"
            {...register("task")}
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1"></option>
          </datalist>

          <label htmlFor="minutesAmount">Durante</label>
          <MinutesAmountInput
            id="minutesAmount"
            type="number"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register("minutosAmount", { valueAsNumber: true })}
          />

          <span>minutos</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutos[0]}</span>
          <span>{minutos[1]}</span>

          <Separator>:</Separator>

          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        <StartCountDownButton type="submit" disabled={isSubmitDisabled}>
          <Play size={23} />
          Começar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  );
}
