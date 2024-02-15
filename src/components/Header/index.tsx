import { HeaderContainer } from "./styles";
import ignite from '../../assets/ignite.svg'
import timer from '../../assets/timer.svg'
import list from '../../assets/list.svg'
import { NavLink } from "react-router-dom";

export function Header(){
    return (
        <HeaderContainer>
            <img src={ignite} alt="" />
            <nav>
                <NavLink to="/" title="Timer">
                    <img src={timer} alt="" />
                </NavLink>
                <NavLink to="/history" title="Histórico">
                    <img src={list} alt="" />
                </NavLink>
            </nav>
        </HeaderContainer>
    )
}