import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useForm from '../hooks/useForm'
import TaskForm from '../components/TaskForm'
import { loadTasks, saveTasks } from '../utils/storage'

function validate(values){
  const errs = {}
  if(!values.title || values.title.trim().length < 3) errs.title = 'Title must be at least 3 characters'
  return errs
}

export default function EditTask(){
  const { id } = useParams()
  const navigate = useNavigate()
  const { values, setValues, handleChange, errors, handleSubmit } = useForm({}, validate)

  useEffect(()=>{
    const tasks = loadTasks()
    const t = tasks.find(x=>x.id === id)
    if(!t) { alert('Task not found'); navigate('/') ; return }
    setValues(t)
  },[id])

  function onSave(data){
    const tasks = loadTasks()
    const next = tasks.map(t => t.id === id ? { ...t, ...data } : t)
    saveTasks(next)
    navigate('/')
  }

  return (
    <div>
      <h2>Edit Task</h2>
      <TaskForm values={values} errors={errors} onChange={handleChange} onSubmit={handleSubmit(onSave)} />
    </div>
  )
}

