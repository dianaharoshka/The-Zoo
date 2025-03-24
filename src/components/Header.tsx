import { NavLink } from "react-router";
import "../styles/layout.scss";

export const Header = () => {
  return (
    <header>
      <h2>
        <NavLink to={"/"}>The Zoo</NavLink>
      </h2>
      <nav>
        <ul>
          <li>
            <NavLink to={"/"}>Hem</NavLink>
          </li>
          <li>
            <NavLink to={"/animals"}>Djuren</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
