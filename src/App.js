import React from "react";
import logo from "./logo.jpg";
import "./App.css";
import Profile from "./components/Profile";
import { ThemeProvider } from "./contexts/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <ThemeToggle />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Profile />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
