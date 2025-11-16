import React from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import useForm from '../hooks/useForm'
import TaskForm from '../components/TaskForm'
import { loadTasks, saveTasks } from '../utils/storage'

const initial = { title:'', description:'', priority:'medium', dueDate:'' }

function validate(values){
  const errs = {}
  if(!values.title || values.title.trim().length < 3) errs.title = 'Title must be at least 3 characters'
  return errs
}

export default function CreateTask(){
  const navigate = useNavigate()
  const { values, handleChange, errors, handleSubmit } = useForm(initial, validate)

  function onCreate(data){
    const tasks = loadTasks()
    const newTask = { ...data, id: uuidv4(), completed:false }
    const next = [newTask, ...tasks]
    saveTasks(next)
    navigate('/')
  }

  return (
    <div>
      <h2>Create Task</h2>
      <TaskForm values={values} errors={errors} onChange={handleChange} onSubmit={handleSubmit(onCreate)} />
    </div>
  )
}
