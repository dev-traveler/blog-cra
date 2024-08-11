import React from 'react';
import './App.css';
import { Route, Routes, Navigate, Link } from 'react-router-dom';

function App() {
  return (
    <>
      <ul>
        <li>
          <Link to="/"> Home </Link>
        </li>
        <li>
          <Link to="/posts">Post List</Link>
        </li>
        <li>
          <Link to="/posts/:id">Pose Detail</Link>
        </li>
        <li>
          <Link to="/posts/new">New Post</Link>
        </li>
        <li>
          <Link to="/posts/edit/:id">Edit Post</Link>
        </li>
        <li>
          <Link to="profile">Profile</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/posts" element={<h1>Post List Page</h1>} />
        <Route path="/posts/:id" element={<h1>Post Detail Page</h1>} />
        <Route path="/posts/new" element={<h1>Post New Page</h1>} />
        <Route path="/posts/edit/:id" element={<h1>Post Edit Page</h1>} />
        <Route path="/profile" element={<h1>Profile</h1>} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  );
}

export default App;
