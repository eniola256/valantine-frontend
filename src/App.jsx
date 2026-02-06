import Home from './Home.jsx';
import ViewValentine from "./ViewValentine";
import { Routes, Route } from "react-router-dom";
import ResultPage from "./ResultPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/v/:code" element={<ViewValentine />} />
      <Route path="/result/:code" element={<ResultPage />} />
    </Routes>
  );
}

