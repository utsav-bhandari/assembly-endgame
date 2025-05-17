import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./src/styles/index.css";
import AssemblyEndgame from "./src/components/App";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AssemblyEndgame />
    </StrictMode>
);
