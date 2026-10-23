import { Outlet, ScrollRestoration } from "react-router-dom";
import { Footer } from "../components/layout/Footer";
import { NavBar } from "../components/nav/NavBar";

export function AppLayout() {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </>
  );
}
