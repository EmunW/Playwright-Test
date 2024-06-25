import { createRoot } from "react-dom/client";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import Sort from "./components/Sort";
import Header from "./components/Header";
import Discussion from "./components/Discussion";

const App = () => {
  return (
    <BrowserRouter>
      {/* Link to the main page of the application */}
      <Link to="/">
        <Header></Header>
      </Link>
      <Routes>
        <Route path="/discussion/:id" element={<Discussion />} />
        <Route path="/" element={<Sort />} />
      </Routes>
    </BrowserRouter>
  );
};
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
