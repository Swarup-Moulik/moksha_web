import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Documentation from "./pages/Documentation.jsx";
import Playground from "./pages/Playground.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/playground" element={<Playground />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
