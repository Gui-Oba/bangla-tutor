import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Courses from './pages/Courses.jsx';
import Exercises from './pages/Exercises.jsx';
import Quizzes from './pages/Quizzes.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/exercises" element={<Exercises />} />
      <Route path="/quizzes" element={<Quizzes />} />
    </Routes>
  );
}
