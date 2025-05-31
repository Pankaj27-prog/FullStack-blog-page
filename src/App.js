// import React from "react";
// import BlogEditor from "./components/BlogEditor";

// function App() {
//   return (
//     <div>
//       <BlogEditor />
//     </div>
//   );
// }

// export default App;


// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import BlogEditor from './components/BlogEditor';
import BlogList from './components/BlogList';
import BlogView from './components/BlogView';
import './components/HomePage.css';
import './components/BlogEditor.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/editor" element={<BlogEditor />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blogs/:id" element={<BlogView />} />
      </Routes>
    </Router>
  );
}

export default App;
