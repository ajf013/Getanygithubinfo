import React from "react";
import logo from "./logo.jpg";
import "./App.css";
import Profile from "./components/Profile";
import { ThemeProvider } from "./contexts/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <ThemeToggle />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Profile />
      </div>
    </ThemeProvider>
  );
}

export default App;
