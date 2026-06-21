import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FilmsProvider } from "./context/FilmsContext";
import HomePage from "./pages/HomePage";
import MovieDetailPage from "./pages/MovieDetailPage";
import "./App.css";

function App() {
  return (
    <FilmsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/film/:id" element={<MovieDetailPage />} />
        </Routes>
      </BrowserRouter>
    </FilmsProvider>
  );
}

export default App;
