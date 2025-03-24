import "../styles/layout.scss";
import { Outlet } from "react-router";
import { Header } from "../components/Header";

export const Layout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
