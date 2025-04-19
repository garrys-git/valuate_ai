import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import DCF from "./pages/Dcf";
import Screener from "./pages/Screener";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dcf" element={<DCF />} />
        <Route path="/screener" element={<Screener />} />
      </Routes>
    </Router>
  );
}

export default App;
