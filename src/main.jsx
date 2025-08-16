import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Cards from "./components/Cards.jsx";
import "./styles/container.css";
import "./styles/Cards.css";

const characters = [
  "charizard",
  "blastoise",
  "venusaur",
  "greninja",
  "infernape",
];

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
