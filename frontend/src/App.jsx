import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navebar from "./components/Navebar";
import "./App.css";
// pages && components

function App() {
  return (
    <>
      <BrowserRouter>
        <Navebar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
