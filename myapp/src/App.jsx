import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import DCF from "./pages/Dcf";
import Screener from "./pages/Screener";
import TradingIndicators from "./pages/Indicators";
import ProtectedRoute from "./components/protected_route";
import Login from "./components/login";
import Signup from "./components/signup";
import BuyPremium from "./pages/BuyPremium";
import Profile from "./pages/Profile";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/buypremium" element={<BuyPremium />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/dcf" 
          element={
            <ProtectedRoute>
              <DCF />
            </ProtectedRoute>
          } 
        />
        <Route path="/screener" 
          element={
            <ProtectedRoute>
              <Screener />
            </ProtectedRoute>
        } 
        />
        <Route path="/indicators" 
          element={
            <ProtectedRoute>
              <TradingIndicators />
            </ProtectedRoute>
        } 
        />
      </Routes>
    </Router>
  );
}

export default App;
