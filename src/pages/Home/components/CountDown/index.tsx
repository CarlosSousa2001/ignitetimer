import { CountdownContainer, Separator } from "./styles";

export function Countdown() {
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
