import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { GameOverPage } from "./pages/GameOverPage";
import { GamePage } from "./pages/GamePage";
import { HiScoresPage } from "./pages/HiScoresPage";
import { StartPage } from "./pages/StartPage";
import "./styles/index.scss";

function App() {
  useEffect(() => {
    const initK3 = () => {
      window.K?.ThemeManager?.init({ savePreference: true });
      window.K?.ThemeManager?.setTheme("dark");
    };
    if (window.K) initK3();
    else document.addEventListener("k3ui-ready", initK3);
    return () => document.removeEventListener("k3ui-ready", initK3);
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/game/:level" element={<GamePage />} />
          <Route path="/gameover" element={<GameOverPage />} />
          <Route path="/hiscores" element={<HiScoresPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
