import React, { useEffect, useState } from 'react'
import TaskTable from '../components/TaskTable'
import { loadTasks, saveTasks } from '../utils/storage'

export default function Home(){
  const [tasks, setTasks] = useState([])

  useEffect(()=>{
    setTasks(loadTasks())
  },[])

  useEffect(()=>{
    saveTasks(tasks)
  },[tasks])

  function handleDelete(id){
    if(!confirm('Delete task?')) return
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  function handleToggle(id){
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  return (
    <div>
      <h2>All Tasks</h2>
      <TaskTable tasks={tasks} onDelete={handleDelete} onToggleComplete={handleToggle} />
    </div>
  )
}
