import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import CreateTask from './pages/CreateTask'
import EditTask from './pages/EditTask'

export default function App(){
  return (
    <div className="container">
      <header>
        <h1>Task Manager</h1>
        <nav className="controls">
          <Link to="/">Home</Link>
          <Link to="/create">Create Task</Link>
        </nav>
      </header>

      <main className="card">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/create" element={<CreateTask/>} />
          <Route path="/edit/:id" element={<EditTask/>} />
        </Routes>
      </main>
    </div>
  )
}

