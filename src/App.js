import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreditCardComponent from "./CreditCardComponent";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<CreditCardComponent />} />{" "}
      </Routes>
    </Router>
  );
}

export default App;
