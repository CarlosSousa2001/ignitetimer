import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";

import {z} from 'zod'
import {useForm} from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";

const newCycleFormValidationSchema = z.object({
    task: z.string().min(1, "Informe a tarefa"),
    minutosAmount: z.number().min(5).max(60, "Máxino 60 minutos"),
  });
  
type newCycleFormValidationData = z.infer<typeof newCycleFormValidationSchema>;

export function NewCycleForm(){

    const { register, handleSubmit, watch, reset } =
    useForm<newCycleFormValidationData>({
      resolver: zodResolver(newCycleFormValidationSchema),
      defaultValues: {
        task: "",
        minutosAmount: 0,
      },
    });

    return (
        <FormContainer>
        <label htmlFor="task">Vou trabalhar em</label>
        <TaskInput
          id="task"
          type="text"
          placeholder="Dê um nome para o seu projeto"
          list="task-suggestions"
          {...register("task")}
          disabled={!!activeCycle}
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
          disabled={!!activeCycle}
          {...register("minutosAmount", { valueAsNumber: true })}
        />

        <span>minutos</span>
      </FormContainer>
    )
}