import { HistoryContainer, HistoryList, Status } from "./styled";

export function History(){
    return (
        <HistoryContainer>
            <h1>History page</h1>
            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duração</th>
                            <th>Inicio</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Tarefa</td>
                            <td>20 minutos</td>
                            <td>há dois meses</td>
                            <td>
                                <Status statusColor="red">Concluído</Status>
                            </td>
                        </tr>
                        <tr>
                            <td>Tarefa</td>
                            <td>20 minutos</td>
                            <td>há dois meses</td>
                            <td>
                                <Status statusColor="yellow">Concluído</Status>
                            </td>
                        </tr>    <tr>
                            <td>Tarefa</td>
                            <td>20 minutos</td>
                            <td>há dois meses</td>
                            <td>
                                <Status statusColor="yellow">Concluído</Status>
                            </td>
                        </tr>    <tr>
                            <td>Tarefa</td>
                            <td>20 minutos</td>
                            <td>há dois meses</td>
                            <td>
                                <Status statusColor="yellow">Concluído</Status>
                            </td>
                        </tr>    <tr>
                            <td>Tarefa</td>
                            <td>20 minutos</td>
                            <td>há dois meses</td>
                            <td>
                                <Status statusColor="yellow">Concluído</Status>
                            </td>
                        </tr>    <tr>
                            <td>Tarefa</td>
                            <td>20 minutos</td>
                            <td>há dois meses</td>
                            <td>
                                <Status statusColor="yellow">Concluído</Status>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    )
}