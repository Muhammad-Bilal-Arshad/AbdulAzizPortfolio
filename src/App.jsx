import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Contact from "./pages/contact";
import Work from "./pages/work";
import About from "./pages/about";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/work" element={<Work />} />
      <Route path="/about" element={<About />} />
      {/* Add more routes as needed */}
    </Routes>
  );
}

export default App;
