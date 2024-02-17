import { useContext, useEffect, useState } from "react";
import { CountdownContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../..";

export function Countdown() {

  const {activeCycle, activeCycleId, markCurrentCycleAsFinished} = useContext(CyclesContext)

  const [amountSecondPassed, setAmountSecondsPassed] = useState(0);


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



  useEffect(() => {
    let interval: number;
    if (activeCycle) {
      interval = setInterval(() => {
        const secondDifference = differenceInSeconds(new Date(), activeCycle.startDate)

        if(secondDifference >= totalSeconds){

          markCurrentCycleAsFinished();
         
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
  }, [activeCycle, totalSeconds, activeCycleId, markCurrentCycleAsFinished]);


  return (
    <CountdownContainer>
      <span>{minutos[0]}</span>
      <span>{minutos[1]}</span>

      <Separator>:</Separator>

      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  );
}
