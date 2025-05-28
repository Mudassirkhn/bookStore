import "./App.css";
import { Routes, Route } from "react-router-dom";
import Contact from "./Pages/ContactList";
import SignUp from "./components/SignUp";
import Courses from "./Pages/CoursesList";
import Home from "./Pages/Home";
import About from "./Pages/About";

function App() {
  return (
    <div className="dark:bg-slate-900 dark:text-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/course" element={<Courses />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
