import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import ReportCharts from "./components/ReportCharts";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/reports" element={<ReportCharts />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
