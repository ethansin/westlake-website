import { Outlet, ScrollRestoration } from "react-router-dom";
import { NavBar } from "../components/nav/NavBar";

export function AppLayout() {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <ScrollRestoration />
    </>
  );
}
