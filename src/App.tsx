import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/reports" element={<h1>Reports Page</h1>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
