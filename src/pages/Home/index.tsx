import { HandPalm, Play } from "@phosphor-icons/react";

import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from "./styles";
import { useEffect, useState } from "react";

import { differenceInSeconds } from "date-fns";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/CountDown";


interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptData?: Date;
  finishedDate?: Date;
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<String | null>(null);
  

  useEffect(() => {
    let interval: number;
    if (activeCycle) {
      interval = setInterval(() => {
        const secondDifference = differenceInSeconds(new Date(), activeCycle.startDate)

        if(secondDifference >= totalSeconds){
          setCycles(state => state.map(item => {
            if(item.id === activeCycleId){
              return {...item, finishedDate: new Date()}
            } else {
              return item
            }
          }))
          setAmountSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setAmountSecondsPassed(secondDifference);
        }

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

  function handleInterruptCycle(){
    setCycles(state => state.map(item => {
      if(item.id === activeCycleId){
        return {...item, interruptData: new Date()}
      } else {
        return item
      }
    }))
    
    setActiveCycleId(null);
  }

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  // total de segundos econtrado pelo find ali no cycle menos quando segundos se passaram
  const currentSeconds = activeCycle ? totalSeconds - amountSecondPassed : 0;

  const minutosAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutos = String(minutosAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutos}:${seconds}`;
    }
  }, [minutos, seconds, activeCycle]);

  const task = watch("task");
  const isSubmitDisabled = !task;


  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
   
        <NewCycleForm/>
        <Countdown/>
    

        {activeCycle ? (
          <StopCountDownButton onClick={handleInterruptCycle} type="submit" >
            <HandPalm size={24}/>
              Interromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  );
}
