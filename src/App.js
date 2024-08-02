import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Graph } from './components/graph';
import { Users } from './components/Users';
import { User } from './components/User';
import { Nav } from './components/Navbar';
import { Waves } from "./components/waves";
import End from "./components/end";


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/graph" element={<Graph />} />
          <Route path="/Users" element={<Users />} />
          <Route path="/user" element={<User />} />
          <Route path="/" element={<Nav />} />
          <Route path="/wave" element={<Waves />} />
          <Route path="/thanks" element={<End />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
